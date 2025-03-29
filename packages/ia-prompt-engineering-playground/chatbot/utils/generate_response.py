import os

from openai import OpenAI
from tenacity import retry, stop_after_attempt, wait_exponential


def initialize_openai_client(
    api_key: str, base_url: str = "https://api.mistral.ai/v1/"
) -> OpenAI:
    return OpenAI(api_key=api_key, base_url=base_url)


def get_chatbot_instructions() -> str:
    path = os.path.join(os.path.dirname(__file__), "liste_routes.json")

    with open(path, "r") as file:
        return file.read()


def prepare_tools(list_of_functions: dict) -> list:
    return [
        {
            "type": "function",
            "function": {
                "name": name,
                "description": func["description"],
                "parameters": {
                    "type": "object",
                    "properties": {},
                    "additionalProperties": False,
                },
            },
        }
        for (name, func) in list_of_functions.items()
    ]


@retry(wait=wait_exponential(multiplier=1, min=4, max=10), stop=stop_after_attempt(5))
def call(client: OpenAI, model: str, messages: list, tools: list):
    return client.chat.completions.create(
        model=model, messages=messages, tools=tools, tool_choice="any"
    )


def generate_response(client: OpenAI, model: str, messages: list, tools: list) -> dict:
    response = call(client, model, messages, tools)
    tool_call = response.choices[0].message.tool_calls[0]
    messages.append(response.choices[0].message)
    messages.append({"role": "tool", "content": "", "tool_call_id": tool_call.id})

    completion_2 = client.chat.completions.create(
        model=model,
        messages=messages,
        tools=tools,
    )

    return {
        "content": completion_2.choices[0].message.content,
        "function_call": tool_call.function.name,
    }
