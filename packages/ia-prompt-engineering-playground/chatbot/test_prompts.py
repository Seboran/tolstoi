import json
import os

from utils.generate_response import (
    generate_response,
    get_chatbot_instructions,
    initialize_openai_client,
    prepare_tools,
)

API_KEY = os.getenv("API_KEY")
client = initialize_openai_client(api_key=API_KEY)

model = "mistral-small-latest"

path = os.path.join(os.path.dirname(__file__), "utils", "liste_routes.json")
with open(path, "r") as file:
    list_of_functions = json.load(file)

tools = prepare_tools(list_of_functions)
chatbot_instructions = get_chatbot_instructions()


def utils_generate_response(message: str):
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
    res = utils_generate_response("Peux-tu parler de toi ?")
    assert res == "/a-propos"


def test_contact():
    res = utils_generate_response("Je voudrais prendre contact")
    assert res == "/contact"


def test_balade():
    res = utils_generate_response("Je me balade juste")
    assert res == "/blog"


def test_ia():
    res = utils_generate_response("Quel est ton avis sur l'intelligence artificielle ?")
    assert res == "/ai"


def test_presentations():
    assert "/presentations" == utils_generate_response("De quels sujets parles-tu ?")


def test_chat():
    assert "/chat" == utils_generate_response("Comment s'appelle ton chat ?")
