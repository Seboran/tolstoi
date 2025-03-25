"""
Prompt Engineering Playground - Main module
This script is responsible for running an AI password retrieval experiment
"""

from config import BASE_SYSTEM_PROMPT_A, BASE_SYSTEM_PROMPT_B
from logger import ConversationLogger
from prompt_generator import PromptGenerator, DefensivePromptGenerator
from conversation_manager import ConversationManager


def main():
    """Main function to run the prompt engineering playground."""

    # Initialize components
    logger = ConversationLogger()
    offensive_prompt_generator = PromptGenerator()
    defensive_prompt_generator = DefensivePromptGenerator()
    conversation_manager = ConversationManager(logger)

    # Initialize with the base system prompts
    current_system_prompt_a = BASE_SYSTEM_PROMPT_A
    current_system_prompt_b = BASE_SYSTEM_PROMPT_B

    # Track if this is the first run
    is_first_run = True

    while True:
        # Always generate new offensive system prompt
        logger.log_message(
            "System", "Generating offensive AI system prompt...")
        print("\n================================")
        print("GENERATING OFFENSIVE AI PROMPT")
        print("================================")
        system_prompt_a = offensive_prompt_generator.generate_prompt(
            current_system_prompt_a,
            conversation_manager.get_history()
        )

        # Log the generated offensive prompt
        logger.log_message(
            "System", f"Generated offensive system prompt: {system_prompt_a}")
        print("\nFINAL OFFENSIVE PROMPT:")
        print("--------------------------------")
        print(f"{system_prompt_a}")
        print("--------------------------------")

        # Only generate a new defensive prompt if:
        # 1. It's the first run, or
        # 2. The last conversation was successful (password was revealed)
        if is_first_run or last_conversation_success:
            logger.log_message(
                "System", "Generating defensive AI system prompt...")
            print("\n================================")
            print("GENERATING DEFENSIVE AI PROMPT")
            print("================================")
            system_prompt_b = defensive_prompt_generator.generate_defensive_prompt(
                current_system_prompt_b,
                conversation_manager.get_defense_history()
            )
            logger.log_message(
                "System", f"Generated defensive system prompt: {system_prompt_b}")
            print("\nFINAL DEFENSIVE PROMPT:")
            print("--------------------------------")
            print(f"{system_prompt_b}")
            print("--------------------------------")
        else:
            # Keep the current defensive prompt since it worked
            logger.log_message(
                "System", "Keeping previous defensive system prompt (it successfully protected the password)")
            print(
                "\nKEEPING PREVIOUS DEFENSIVE SYSTEM PROMPT (it successfully protected the password)")
            system_prompt_b = current_system_prompt_b

        print("\nSTART CONVERSATION--------------------")

        # Update the current system prompts for the next iteration
        current_system_prompt_a = system_prompt_a

        # Run conversation with the system prompts
        last_conversation_success, result = conversation_manager.run_conversation(
            system_prompt_a, system_prompt_b)

        # Update the defensive prompt for next iteration only if we generated a new one
        if is_first_run or last_conversation_success:
            current_system_prompt_b = system_prompt_b

        # After the conversation, add the defensive prompt to its history
        conversation_manager.add_to_defense_history(
            system_prompt_b,
            result,
            "success" if last_conversation_success else "failure"
        )

        # No longer the first run
        is_first_run = False


if __name__ == "__main__":
    main()
