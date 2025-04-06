import os
import json
from utils.generate_response import (
    initialize_openai_client,
    prepare_tools,
    get_chatbot_instructions,
    generate_response,
)


def main():
    API_KEY = os.getenv("API_KEY")
    client = initialize_openai_client(api_key=API_KEY)

    model = "mistral-small-2503"

    with open("utils/liste_routes.json", "r") as file:
        list_of_functions = json.load(file)

    tools = prepare_tools(list_of_functions)
    chatbot_instructions = get_chatbot_instructions()

    messages = [
        {"role": "system", "content": chatbot_instructions},
        {
            "role": "user",
            "content": "il paraît que Nirina a un chat très mignon, peux-tu m'en parler ?",
        },
    ]
    return generate_response(client, model, messages, tools)


if __name__ == "__main__":
    print(main())
