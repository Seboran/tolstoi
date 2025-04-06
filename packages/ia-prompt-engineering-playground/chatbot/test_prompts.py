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

model = "mistral-small-2503"

path = os.path.join(os.path.dirname(__file__), "utils", "liste_routes.json")
with open(path, "r") as file:
    list_of_functions = json.load(file)

tools = prepare_tools(list_of_functions)
chatbot_instructions = get_chatbot_instructions()


def utils_generate_response(message: str):
    """
    "content": completion_2.choices[0].message.content,
    "function_calls": tool_call.function.name,
    """

    messages = [
        {"role": "system", "content": chatbot_instructions},
        {"role": "user", "content": message},
    ]

    result = generate_response(client, model, messages, tools)
    function_calls = result["function_calls"]
    hrefs_list = [list_of_functions[f]["href"] for f in function_calls]
    return hrefs_list


def test_biographie():
    res = utils_generate_response("Peux-tu parler de toi ?")
    assert "/a-propos" in res


def test_contact():
    res = utils_generate_response("Je voudrais prendre contact")
    assert "/contact" in res


def test_balade():
    res = utils_generate_response("Je me balade juste")
    assert "/blog" in res


def test_ia():
    res = utils_generate_response("Quel est ton avis sur l'intelligence artificielle ?")
    assert "/ai" in res


def test_presentations():
    assert "/presentations" in utils_generate_response("De quels sujets parles-tu ?")


def test_chat():
    assert "/chat" in utils_generate_response("Comment s'appelle ton chat ?")
