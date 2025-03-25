"""Module for managing AI conversations."""

import re
from ai_conversation import call_local_model, ConversationSuccessError, ConversationFailureError
from config import DEFAULT_MODEL_A, DEFAULT_MODEL_B


class ConversationManager:
    """Class for managing AI conversations."""

    def __init__(self, logger, model_a=DEFAULT_MODEL_A, model_b=DEFAULT_MODEL_B):
        """Initialize conversation manager with models and logger."""
        self.logger = logger
        self.model_a = model_a
        self.model_b = model_b
        self.prompt_history = []  # History for offensive prompts and their results
        self.defense_prompt_history = []  # History for defensive prompts
        self.current_conversation = []  # Track messages in current conversation

    def run_conversation(self, system_prompt_a, system_prompt_b):
        """
        Run a conversation between AI A and AI B.

        Args:
            system_prompt_a: System prompt for AI A
            system_prompt_b: System prompt for AI B

        Returns:
            (success, result) tuple: success is boolean, result is the outcome message
        """
        prompt = "start"  # initial prompt
        self.logger.log_message("AI A", prompt)

        # Reset the current conversation tracking
        self.current_conversation = [("AI A", prompt)]

        try:
            while True:
                # AI A generates a response
                response_a = call_local_model(
                    prompt,
                    model_name=self.model_a,
                    ai_side="A",
                    system_prompt_a=system_prompt_a,
                    system_prompt_b=system_prompt_b
                )
                self.logger.log_message("AI A", response_a)
                self.current_conversation.append(("AI A", response_a))
                print("--------------------")

                # AI B responds
                response_b = call_local_model(
                    response_a,
                    model_name=self.model_b,
                    ai_side="B",
                    system_prompt_a=system_prompt_a,
                    system_prompt_b=system_prompt_b
                )
                self.logger.log_message("AI B", response_b)
                self.current_conversation.append(("AI B", response_b))
                print("--------------------")

                # Update prompt for next iteration
                prompt = response_b

        except ConversationSuccessError as success:
            # Format conversation transcript for history
            conversation_transcript = self._format_conversation_transcript()

            self._add_to_history(system_prompt_a, str(
                success), "success", conversation_transcript)
            self.logger.log_message(
                "System", f"Conversation ended successfully: {success}")
            self.logger.log_prompt_result(
                system_prompt_a, str(success), "success")
            print(f"Conversation ended successfully: {success}")
            return True, str(success)

        except ConversationFailureError as failure:
            # Format conversation transcript for history
            conversation_transcript = self._format_conversation_transcript()

            self._add_to_history(system_prompt_a, str(
                failure), "failure", conversation_transcript)
            self.logger.log_message(
                "System", f"Conversation failed: {failure}")
            self.logger.log_prompt_result(
                system_prompt_a, str(failure), "failure")
            print(f"Conversation failed: {failure}")
            return False, str(failure)

    def _format_conversation_transcript(self):
        """Format the current conversation into a readable transcript."""
        transcript = ""
        for role, message in self.current_conversation:
            # Remove thinking tags from transcript
            thinking_pattern = re.compile(r'<think>(.*?)</think>', re.DOTALL)
            cleaned_message = thinking_pattern.sub('', message)
            transcript += f"{role}: {cleaned_message}\n\n"
        return transcript

    def _add_to_history(self, prompt, result, status, conversation=None):
        """Add a conversation attempt to history."""
        entry = {
            'prompt': prompt,
            'result': result,
            'status': status
        }

        # Add conversation transcript if available
        if conversation:
            entry['conversation'] = conversation

        self.prompt_history.append(entry)

    def get_history(self):
        """Get the conversation history for offensive prompts."""
        return self.prompt_history

    def get_defense_history(self):
        """Get the conversation history for defensive prompts."""
        return self.defense_prompt_history

    def add_to_defense_history(self, prompt, result, status):
        """Add a conversation attempt to defensive history."""
        conversation = None
        if self.current_conversation:
            conversation = self._format_conversation_transcript()

        self.defense_prompt_history.append({
            'prompt': prompt,
            'result': result,
            'status': status,
            'conversation': conversation
        })

    def get_current_conversation(self):
        """Get the transcript of the current/most recent conversation."""
        return self.current_conversation
