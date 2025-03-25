from openai import OpenAI
import re
from config import (PASSWORD)

client = OpenAI(api_key="unused", base_url="http://localhost:1234/v1")

LM_STUDIO_ENDPOINT_A = "http://127.0.0.1:1234/v1"
LM_STUDIO_ENDPOINT_B = "http://127.0.0.1:1234/v1"

conversation_history_A = []  # History for AI side A
conversation_history_B = []  # History for AI side B

# System prompts have been moved to main.py


class ConversationSuccessError(Exception):
    pass


class ConversationFailureError(Exception):
    pass


def clear_conversation_histories():
    """Clear both conversation histories when a conversation ends"""
    global conversation_history_A, conversation_history_B
    conversation_history_A = []
    conversation_history_B = []
    print("Conversation histories cleared.")


def extract_and_remove_thinking(response_text):
    """
    Extract thinking content from response and remove it from the text.

    Args:
        response_text: The response text that may contain <think>...</think> tags

    Returns:
        tuple: (cleaned_response, thinking_content)
    """
    thinking_pattern = re.compile(r'<think>(.*?)</think>', re.DOTALL)
    thinking_matches = thinking_pattern.findall(response_text)

    # Extract thinking content
    thinking_content = "\n".join(
        thinking_matches) if thinking_matches else None

    # Remove thinking from response
    cleaned_response = thinking_pattern.sub('', response_text)

    return cleaned_response, thinking_content


def call_local_model(prompt: str, model_name: str, ai_side: str, system_prompt_a: str, system_prompt_b: str) -> str:
    """
    Calls the local LM Studio server with a conversation history specific to each AI.
    ai_side: "A" or "B" to select the corresponding conversation history.
    system_prompt_a: System prompt for AI side A
    system_prompt_b: System prompt for AI side B
    """

    if f"<password>{PASSWORD}</password>" in prompt:
        # Clear histories before raising the exception
        clear_conversation_histories()
        raise ConversationSuccessError(
            "Password detected. Ending conversation.")
    elif "<endconversation />" in prompt:
        # Clear histories before raising the exception
        clear_conversation_histories()
        raise ConversationFailureError(
            "Termination command detected. Ending conversation.")

    # Select appropriate history based on ai_side
    history = conversation_history_A if ai_side == "A" else conversation_history_B
    system_prompt = system_prompt_a if ai_side == "A" else system_prompt_b

    # Ensure the conversation alternates correctly
    # If history is empty or the last message was from assistant, we can add user message
    if not history or history[-1]["role"] == "assistant":
        history.append({"role": "user", "content": prompt})
    # If the last message was from user, we need to replace it (this handles consecutive calls)
    elif history[-1]["role"] == "user":
        history[-1] = {"role": "user", "content": prompt}

    # Create messages array with system prompt
    messages = [{"role": "system", "content": system_prompt}] + history

    completion = client.chat.completions.create(
        model=model_name,
        messages=messages,
        temperature=0.1,
        stream=True
    )
    response_text = ""
    thinking_buffer = ""
    in_thinking_tag = False

    for chunk in completion:
        # Safely extract content with error handling
        partial_text = ""
        try:
            if hasattr(chunk.choices[0].delta, 'content'):
                partial_text = chunk.choices[0].delta.content or ""
        except (AttributeError, IndexError, TypeError):
            # Handle case where the expected structure isn't present
            continue

        # Process the partial text to handle thinking tags in real-time
        i = 0
        while i < len(partial_text):
            # Check for opening tag
            if partial_text[i:i+7] == "<think>" and not in_thinking_tag:
                in_thinking_tag = True
                print("\n[Thinking] ", end="", flush=True)
                i += 7
            # Check for closing tag
            elif partial_text[i:i+8] == "</think>" and in_thinking_tag:
                in_thinking_tag = False
                print("\n[Response] ", end="", flush=True)
                i += 8
            # Regular content
            else:
                if in_thinking_tag:
                    thinking_buffer += partial_text[i]
                    print(partial_text[i], end="", flush=True)
                else:
                    print(partial_text[i], end="", flush=True)
                i += 1

        response_text += partial_text

    print()

    # Ensure we properly extracted any thinking content from the full response
    cleaned_response, thinking_content = extract_and_remove_thinking(
        response_text)

    # Ensure the conversation alternates correctly for the assistant's response
    # If the last message was from user, we can add assistant message
    if history and history[-1]["role"] == "user":
        history.append({"role": "assistant", "content": cleaned_response})
    # If the last message was from assistant, we need to replace it
    elif history and history[-1]["role"] == "assistant":
        history[-1] = {"role": "assistant", "content": cleaned_response}

    # Log thinking content if available
    if thinking_content:
        print(f"\n[AI {ai_side} Thinking]\n{thinking_content}\n")

    return cleaned_response
