"""Module for generating system prompts using AI."""

from ai_conversation import client
from config import DEFAULT_TEMPERATURE, PROMPT_CREATOR_SYSTEM_PROMPT


class PromptGenerator:
    """Class responsible for generating system prompts."""

    def __init__(self, model_name="gemma-3-12b-it", temperature=DEFAULT_TEMPERATURE):
        """Initialize prompt generator with model settings."""
        self.model_name = model_name
        self.temperature = temperature

    def generate_prompt(self, base_prompt, history=None):
        """
        Generate a new system prompt based on the provided base prompt and history.

        Args:
            base_prompt: Base system prompt to improve
            history: List of dicts with 'prompt', 'result', 'status' keys

        Returns:
            Generated system prompt as string
        """
        system_prompt = self._create_system_prompt(history)

        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"Improve this system prompt: {base_prompt}"}
        ]

        completion = client.chat.completions.create(
            model=self.model_name,
            messages=messages,
            temperature=self.temperature
        )

        generated_prompt = completion.choices[0].message.content
        return generated_prompt

    def _create_system_prompt(self, history):
        """Create the system prompt including history if available."""
        system_prompt = PROMPT_CREATOR_SYSTEM_PROMPT

        if history and len(history) > 0:
            system_prompt += "\nHere is the history of previous system prompts and their results:\n"
            for attempt in history:
                system_prompt += f"\nPrompt: {attempt['prompt']}\nResult: {attempt['result']}\nStatus: {attempt['status']}\n---\n"
            system_prompt += "\nUse this history to improve the system prompt. Learn from previous failures and successes."

        return system_prompt
