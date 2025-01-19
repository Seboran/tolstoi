import os
import json
from solve_for_n import solve_for_n_pulp_2
import numpy as np
current_dir = os.path.dirname(os.path.abspath(__file__))
# Chemin vers le fichier d'entrée
input_file = os.path.join(
    current_dir, "../bonne-energie-bons-voisins/app/data/countries.json")
output_file = os.path.join(
    current_dir, "../bonne-energie-bons-voisins/app/data/matrix.json")

# Lire le contenu du fichier d'entrée


def read_input_file(input_file):
    try:
        with open(input_file, 'r', encoding='UTF-8') as file:
            data = json.load(file)
        return data
    except FileNotFoundError:
        print(f"Erreur : Le fichier {input_file} est introuvable.")
        return None
    except json.JSONDecodeError:
        print("Erreur : Le fichier d'entrée n'est pas au format JSON valide.")
        return None

# Calculer un résultat à partir des données


def calculate(data):
    balances = [x['production'] - x['consommation'] for x in data]
    balances.append(-np.sum(balances))
    return solve_for_n_pulp_2(balances)

# Écrire le résultat dans un fichier de sortie


def write_output_file(output_file, data):
    with open(output_file, 'w', encoding='UTF-8') as file:
        json.dump(data.tolist(), file, indent=4)
    print(f"Résultat écrit dans le fichier : {output_file}")


def main():
    # Charger les données depuis le fichier d'entrée
    data = read_input_file(input_file)
    if data is None:
        return

    # Effectuer le calcul
    result = calculate(data)

    # Écrire les résultats dans le fichier de sortie
    write_output_file(output_file, result)


if __name__ == "__main__":
    main()
