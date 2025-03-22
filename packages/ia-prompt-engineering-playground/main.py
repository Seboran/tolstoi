import os
import datetime
from ai_conversation import call_local_model


def main():
    # Create a logs directory if it doesn't exist
    logs_dir = "/Users/nirina/workspace/monorepo/logs"
    if not os.path.exists(logs_dir):
        os.makedirs(logs_dir)
    # Create new log file with current timestamp in its name
    log_file = os.path.join(logs_dir, "conversation_log_" +
                            datetime.datetime.now().strftime("%Y%m%d_%H%M%S") + ".md")

    def log_message(role, message):
        with open(log_file, "a") as f:
            f.write(
                f"\n[{datetime.datetime.now().isoformat()}] {role}: {message}\n")

    # Use a single model name for both AI sides
    model_name = "gemma-3-12b-it"

    prompt = "début conversation"  # initial prompt from AI A
    log_message("AI A", prompt)
    while True:
        response_A = call_local_model(
            prompt, model_name=model_name, ai_side="A")
        log_message("AI A", response_A)
        print("--------------------")
        response_B = call_local_model(
            response_A, model_name=model_name, ai_side="B")
        log_message("AI B", response_B)
        print("--------------------")
        prompt = response_B  # feed AI B response back to AI A


if __name__ == "__main__":
    main()
