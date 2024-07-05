import scipy.optimize as opt
import numpy as np


def solve_for_n(balances: list):
    n = len(balances)

    def constraint1(vec):
        # Transform 9x1 vector into 3x3 matrix
        vec = np.reshape(vec, (n, n))
        # Define a second vector
        vecteur_uns = np.ones((n))

        # Compute the dot product of vector1 and vector2
        product = np.dot(vec, vecteur_uns)

        return (product - np.array(balances))

    def constraint_anti_symmetric(vec):
        # Reshape vec into a 3x3 matrix
        matrix = np.reshape(vec, (n, n))
        # Calculate the difference between matrix and its negative transpose
        diff = matrix + matrix.T
        # Flatten the difference matrix to a vector and return its L2 norm
        return np.linalg.norm(diff.flatten(), ord=2)

    def minimize_vector(vector1):
        # Return the result
        return np.sum(np.abs(vector1))

    # Use scipy.optimize.minimize to find the minimum of the function
    result = opt.minimize(minimize_vector, x0=np.array(np.zeros(n**2)), constraints=[
        {'type': 'eq', 'fun': constraint1},  # First constraint
        # Second constraint ensuring diagonal terms are zero
        {'type': 'eq', 'fun': constraint_anti_symmetric},
    ], options={'disp': True, 'maxiter': 1000})

    argument_result = np.reshape(result.x, (n, n))
    argument_result = np.round(argument_result, 2)
    # Print the minimum value and the corresponding argument
    print("Minimum value:", result.fun / 2)
    print("Argument that minimizes the function:\n", argument_result)


def ajouter_depense(depense: int, index_receveur: int, balances: list):
    nombre_rembourseurs = len(balances)
    nouvelles_balances = [balance - depense /
                          nombre_rembourseurs for balance in balances]
    nouvelles_balances[index_receveur] += depense
    return nouvelles_balances


BALANCES = [17, -4, -13, 0]

BALANCES = ajouter_depense(3, 1, BALANCES)
BALANCES = ajouter_depense(15, 2, BALANCES)
BALANCES = ajouter_depense(56, 1, BALANCES)
BALANCES = ajouter_depense(21, 3, BALANCES)
BALANCES = ajouter_depense(2, 1, BALANCES)
BALANCES = ajouter_depense(10, 0, BALANCES)
BALANCES = ajouter_depense(15, 1, BALANCES)

print(BALANCES)

solve_for_n(BALANCES)

BALANCES_5_PERSONNES = [17, -4, -13, -5, 5]

BALANCES_5_PERSONNES = ajouter_depense(3, 1, BALANCES_5_PERSONNES)
BALANCES_5_PERSONNES = ajouter_depense(15, 2, BALANCES_5_PERSONNES)
BALANCES_5_PERSONNES = ajouter_depense(56, 1, BALANCES_5_PERSONNES)
BALANCES_5_PERSONNES = ajouter_depense(21, 3, BALANCES_5_PERSONNES)
BALANCES_5_PERSONNES = ajouter_depense(2, 1, BALANCES_5_PERSONNES)
BALANCES_5_PERSONNES = ajouter_depense(10, 3, BALANCES_5_PERSONNES)
BALANCES_5_PERSONNES = ajouter_depense(18, 4, BALANCES_5_PERSONNES)
BALANCES_5_PERSONNES = ajouter_depense(10, 0, BALANCES_5_PERSONNES)
BALANCES_5_PERSONNES = ajouter_depense(15, 1, BALANCES_5_PERSONNES)
BALANCES_5_PERSONNES = ajouter_depense(7, 3, BALANCES_5_PERSONNES)

print(BALANCES_5_PERSONNES)

solve_for_n(BALANCES_5_PERSONNES)

BALANCES_6_PERSONNES = [17, -4, -13, -5, 5, 0]

BALANCES_6_PERSONNES = ajouter_depense(3, 1, BALANCES_6_PERSONNES)
BALANCES_6_PERSONNES = ajouter_depense(15, 2, BALANCES_6_PERSONNES)
BALANCES_6_PERSONNES = ajouter_depense(56, 1, BALANCES_6_PERSONNES)
BALANCES_6_PERSONNES = ajouter_depense(21, 3, BALANCES_6_PERSONNES)
BALANCES_6_PERSONNES = ajouter_depense(22, 5, BALANCES_6_PERSONNES)
BALANCES_6_PERSONNES = ajouter_depense(30, 3, BALANCES_6_PERSONNES)
BALANCES_6_PERSONNES = ajouter_depense(18, 4, BALANCES_6_PERSONNES)
BALANCES_6_PERSONNES = ajouter_depense(10, 0, BALANCES_6_PERSONNES)
BALANCES_6_PERSONNES = ajouter_depense(15, 1, BALANCES_6_PERSONNES)
BALANCES_6_PERSONNES = ajouter_depense(7, 3, BALANCES_6_PERSONNES)
BALANCES_6_PERSONNES = ajouter_depense(68, 3, BALANCES_6_PERSONNES)
BALANCES_6_PERSONNES = ajouter_depense(71, 4, BALANCES_6_PERSONNES)
BALANCES_6_PERSONNES = ajouter_depense(10, 0, BALANCES_6_PERSONNES)
BALANCES_6_PERSONNES = ajouter_depense(15, 1, BALANCES_6_PERSONNES)
BALANCES_6_PERSONNES = ajouter_depense(7, 3, BALANCES_6_PERSONNES)
BALANCES_6_PERSONNES = ajouter_depense(10, 3, BALANCES_6_PERSONNES)
BALANCES_6_PERSONNES = ajouter_depense(30, 4, BALANCES_6_PERSONNES)
BALANCES_6_PERSONNES = ajouter_depense(18, 5, BALANCES_6_PERSONNES)
BALANCES_6_PERSONNES = ajouter_depense(43, 4, BALANCES_6_PERSONNES)
BALANCES_6_PERSONNES = ajouter_depense(32, 4, BALANCES_6_PERSONNES)
BALANCES_6_PERSONNES = ajouter_depense(10, 0, BALANCES_6_PERSONNES)
BALANCES_6_PERSONNES = ajouter_depense(46, 1, BALANCES_6_PERSONNES)
BALANCES_6_PERSONNES = ajouter_depense(7, 3, BALANCES_6_PERSONNES)

print(BALANCES_6_PERSONNES)

solve_for_n(BALANCES_6_PERSONNES)
