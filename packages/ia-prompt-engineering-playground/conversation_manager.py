"""Module for managing AI conversations."""

from ai_conversation import call_local_model, ConversationSuccessError, ConversationFailureError
from config import DEFAULT_MODEL_A, DEFAULT_MODEL_B


class ConversationManager:
    """Class for managing AI conversations."""

    def __init__(self, logger, model_a=DEFAULT_MODEL_A, model_b=DEFAULT_MODEL_B):
        """Initialize conversation manager with models and logger."""
        self.logger = logger
        self.model_a = model_a
        self.model_b = model_b
        self.prompt_history = []

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
                print("--------------------")

                # Update prompt for next iteration
                prompt = response_b

        except ConversationSuccessError as success:
            self._add_to_history(system_prompt_a, str(success), "success")
            self.logger.log_message(
                "System", f"Conversation ended successfully: {success}")
            self.logger.log_prompt_result(
                system_prompt_a, str(success), "success")
            print(f"Conversation ended successfully: {success}")
            return True, str(success)

        except ConversationFailureError as failure:
            self._add_to_history(system_prompt_a, str(failure), "failure")
            self.logger.log_message(
                "System", f"Conversation failed: {failure}")
            self.logger.log_prompt_result(
                system_prompt_a, str(failure), "failure")
            print(f"Conversation failed: {failure}")
            return False, str(failure)

    def _add_to_history(self, prompt, result, status):
        """Add a conversation attempt to history."""
        self.prompt_history.append({
            'prompt': prompt,
            'result': result,
            'status': status
        })

    def get_history(self):
        """Get the conversation history."""
        return self.prompt_history
