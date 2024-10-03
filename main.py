import numpy as np
import time

from solve_for_n import solve_for_n, solve_for_n_linalg, solve_for_n_pulp, solve_for_n_pulp_2


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


NOMBRE_GENS = 5


def test_valeurs():
    np.random.seed(0)
    # while True:

    BALANCES = np.zeros(NOMBRE_GENS)
    for count in np.random.randint(1, 200, 10):
        random_spender = np.random.randint(0, len(BALANCES))
        BALANCES = ajouter_depense_avec_trous(
            count, random_spender, BALANCES)

    BALANCES = np.round(BALANCES, 2)
    # print('erreur', np.round(np.sum(BALANCES), 2))
    BALANCES[0] += np.sum(BALANCES)
    # print('entrée', BALANCES, sum(x for x in BALANCES if x > 0))
    start_time = time.time()
    # print("Optimize")
    # calculate_reimbursements(BALANCES)
    print("Linear problem")
    calculate_reimbursements_linalg(BALANCES)
    print('Entrée')
    print(BALANCES)
    print("######################")
    elapsed_time = time.time() - start_time
    # print("Elapsed time:", elapsed_time)


def calculate_reimbursements(BALANCES):
    nouvelles_balances = BALANCES.copy()
    nouvelles_balances[0] -= sum(nouvelles_balances)
    try:
        (matrice_de_remboursements, solution, message,
         success) = solve_for_n(nouvelles_balances)

        print(solution / 2, sum(BALANCES))
        print(np.round(matrice_de_remboursements, 2))
        print(message)
        print()
    except:
        pass


def calculate_reimbursements_linalg(BALANCES):
    nouvelles_balances = BALANCES.copy()
    nouvelles_balances[0] -= sum(nouvelles_balances)
    try:
        print('Solution')
        print(solve_for_n_pulp_2(BALANCES))

        # print(solution, sum(BALANCES))
        # print(np.round(matrice_de_remboursements, 2))
        # print(message)
        # print()
    except:
        pass


def calculate_hfti_example():
    hfti_balances_example = [-1366.71666667,  194.51666667, 182.83333333,  628.55,
                             215.61666667,  46.78333333,   98.41666667]

    calculate_reimbursements(
        hfti_balances_example)


test_valeurs()
# test_valeurs_linalg()

# calculate_hfti_example()
