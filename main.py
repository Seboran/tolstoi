import numpy as np
import time

from solve_for_n import solve_for_n


def ajouter_depense(depense: int, index_receveur: int, balances: list):
    nombre_rembourseurs = len(balances)
    nouvelles_balances = [balance - depense /
                          nombre_rembourseurs for balance in balances]
    nouvelles_balances[index_receveur] += depense
    return nouvelles_balances


def ajouter_depense_avec_trous(depense: int, index_receveur: int, balances: list):
    nombre_rembourseurs = len(balances)

    nouvelles_balances = balances.copy()
    choices = np.random.choice(nombre_rembourseurs, np.random.randint(
        2, nombre_rembourseurs), replace=False)

    for choice in choices:
        nouvelles_balances[choice] -= depense / len(choices)

    nouvelles_balances[index_receveur] += depense
    return nouvelles_balances


def test_valeurs():
    while True:

        NOMBRE_GENS = 7
        BALANCES = np.zeros(NOMBRE_GENS)
        for count in np.random.randint(1, 60, 1500):
            random_spender = np.random.randint(0, len(BALANCES))
            BALANCES = ajouter_depense_avec_trous(
                count, random_spender, BALANCES)

        BALANCES = np.round(BALANCES, 2)
        start_time = time.time()
        calculate_reimbursements(BALANCES)

        elapsed_time = time.time() - start_time
        # print("Elapsed time:", elapsed_time)


def calculate_reimbursements(BALANCES):
    nouvelles_balances = BALANCES.copy()
    nouvelles_balances[0] -= sum(nouvelles_balances)
    (matrice_de_remboursements, solution, message,
     success) = solve_for_n(nouvelles_balances)

    if not success:
        print(BALANCES, sum(BALANCES))
        print(np.round(matrice_de_remboursements, 2))
        print("Error from solution", np.abs(
            solution / 2 - sum(filter(lambda x: x > 0, BALANCES))))
        print(message)
        print()


def calculate_hfti_example():
    hfti_balances_example = [-1366.71666667,  194.51666667, 182.83333333,  628.55,
                             215.61666667,  46.78333333,   98.41666667]

    calculate_reimbursements(
        hfti_balances_example)


# test_valeurs()

# calculate_hfti_example()
