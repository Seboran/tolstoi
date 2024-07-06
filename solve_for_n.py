import numpy as np
import scipy.optimize as opt


def solve_for_n(balances: list):
    n = len(balances)

    def constraint1(vec):
        vec = np.reshape(vec, (n, n))
        vecteur_uns = np.ones((n))

        product = np.dot(vec, vecteur_uns)

        return product - np.array(balances)

    def constraint_anti_symmetric(vec):
        matrix = np.reshape(vec, (n, n))
        diff = matrix + matrix.T
        return np.linalg.norm(diff.flatten(), ord=2)

    def minimize_vector(vector1):
        return np.linalg.norm(vector1, ord=1)

    initial_guess = np.zeros(n**2)

    result = opt.minimize(minimize_vector, x0=initial_guess, method="SLSQP", constraints=[
        {'type': 'eq', 'fun': constraint1},
        {'type': 'eq', 'fun': constraint_anti_symmetric},
    ], options={'maxiter': 1000})

    argument_result = np.reshape(result.x, (n, n))
    argument_result = np.round(argument_result, 2)

    return (argument_result, result.fun, result.message, result.success)