from openai import OpenAI


def initialize_openai_client(
    api_key: str, base_url: str = "https://api.mistral.ai/v1/"
) -> OpenAI:
    return OpenAI(api_key=api_key, base_url=base_url)


def get_chatbot_instructions() -> str:
    with open("./utils/system_prompt.txt", "r") as file:
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


def generate_response(client: OpenAI, model: str, messages: list, tools: list) -> dict:
    response = client.chat.completions.create(
        model=model, messages=messages, tools=tools, tool_choice="any"
    )
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
