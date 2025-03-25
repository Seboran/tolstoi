"""Logger module for the prompt engineering playground."""

import os
import datetime
import re
from config import LOGS_DIR


class ConversationLogger:
    """Class for handling all logging operations."""

    def __init__(self):
        """Initialize logger with a new log file."""
        self._ensure_logs_dir_exists()
        timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
        self.log_file = os.path.join(
            LOGS_DIR, f"conversation_log_{timestamp}.md")

    def _ensure_logs_dir_exists(self):
        """Make sure the logs directory exists."""
        if not os.path.exists(LOGS_DIR):
            os.makedirs(LOGS_DIR)

    def log_message(self, role, message):
        """Log a message with role and timestamp."""
        # Extract and remove thinking content
        cleaned_message, thinking = self._extract_thinking(message)

        with open(self.log_file, "a") as f:
            timestamp = datetime.datetime.now().isoformat()
            f.write(f"\n[{timestamp}] {role}: {cleaned_message}\n")

            # Log thinking content separately if available
            if thinking:
                f.write(f"\n[{timestamp}] {role} (Thinking): {thinking}\n")

    def _extract_thinking(self, message):
        """Extract thinking content from a message."""
        thinking_pattern = re.compile(r'<think>(.*?)</think>', re.DOTALL)
        thinking_matches = thinking_pattern.findall(message)

        # Extract thinking content
        thinking_content = "\n".join(
            thinking_matches) if thinking_matches else None

        # Remove thinking from message
        cleaned_message = thinking_pattern.sub('', message)

        return cleaned_message, thinking_content

    def log_prompt_result(self, prompt, result, status):
        """Log prompt results and create success/failure files."""
        # Log to conversation.log
        with open("conversation.log", "a") as log_file:
            log_file.write(
                f"Prompt: {prompt}\nResult: {result}\nStatus: {status}\n---\n")

        # Save conversation to dedicated success/failure file
        try:
            with open(self.log_file, "r") as convo_file:
                conversation_content = convo_file.read()

            timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
            file_type = "success" if status == "success" else "failure"
            new_file = os.path.join(
                LOGS_DIR, f"conversation_{file_type}_{timestamp}.md")

            with open(new_file, "w") as output:
                output.write(conversation_content)
        except Exception as e:
            print(f"Error saving conversation: {e}")
