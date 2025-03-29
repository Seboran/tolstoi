import os
import json
from tenacity import retry, stop_after_attempt, wait_exponential


from utils.generate_response import (
    initialize_openai_client,
    prepare_tools,
    get_chatbot_instructions,
    generate_response,
)

API_KEY = os.getenv("API_KEY")
client = initialize_openai_client(api_key=API_KEY)

model = "mistral-small-latest"

path = os.path.join(os.path.dirname(__file__), "utils", "liste_routes.json")
with open(path, "r") as file:
    list_of_functions = json.load(file)

tools = prepare_tools(list_of_functions)
chatbot_instructions = get_chatbot_instructions()


@retry(wait=wait_exponential(multiplier=1, min=4, max=10), stop=stop_after_attempt(5))
def test_generate_response(message: str):
    """
    "content": completion_2.choices[0].message.content,
    "function_call": tool_call.function.name,
    """

    messages = [
        {"role": "system", "content": chatbot_instructions},
        {"role": "user", "content": message},
    ]

    result = generate_response(client, model, messages, tools)
    return list_of_functions[result["function_call"]]["href"]


def test_biographie():
    res = test_generate_response("Peux-tu parler de toi ?")
    assert res == "/a-propos"


def test_contact():
    res = test_generate_response("Je voudrais prendre contact")
    assert res == "/contact"


def test_balade():
    res = test_generate_response("Je me balade juste")
    assert res == "/blog"


def test_ia():
    res = test_generate_response("Quel est ton avis sur l'intelligence artificielle ?")
    assert res == "/ai"


def test_presentations():
    assert "/presentations" == test_generate_response(
        "De quoi quels sujets parles-tu ?"
    )


def test_chat():
    assert "/chat" == test_generate_response("Comment s'appelle ton chat ?")
