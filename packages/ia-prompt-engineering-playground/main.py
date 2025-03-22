"""
Prompt Engineering Playground - Main module
This script is responsible for running an AI password retrieval experiment
"""

from config import BASE_SYSTEM_PROMPT_A, SYSTEM_PROMPT_B
from logger import ConversationLogger
from prompt_generator import PromptGenerator
from conversation_manager import ConversationManager


def main():
    """Main function to run the prompt engineering playground."""

    # Initialize components
    logger = ConversationLogger()
    prompt_generator = PromptGenerator()
    conversation_manager = ConversationManager(logger)

    # Initialize with the base system prompt
    current_system_prompt_a = BASE_SYSTEM_PROMPT_A

    while True:
        # Generate new system prompt
        logger.log_message("System", "Generating AI system prompt...")
        system_prompt_a = prompt_generator.generate_prompt(
            current_system_prompt_a,
            conversation_manager.get_history()
        )

        # Log the generated prompt
        logger.log_message(
            "System", f"Generated system prompt A: {system_prompt_a}")
        print(f"Generated system prompt: {system_prompt_a}")
        print("START--------------------")

        # Update the current system prompt for the next iteration
        current_system_prompt_a = system_prompt_a

        # Run conversation with the new system prompt
        conversation_manager.run_conversation(system_prompt_a, SYSTEM_PROMPT_B)


if __name__ == "__main__":
    main()
