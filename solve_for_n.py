import numpy as np
import scipy.optimize as opt
from pulp import *


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
        """Minimize sum and number of non-zero elements in vector1."""
        return np.linalg.norm(vector1, ord=1)

    initial_guess = np.ones(n**2)

    result = opt.minimize(minimize_vector, x0=initial_guess, method="SLSQP", constraints=[
        {'type': 'eq', 'fun': constraint1},
        {'type': 'eq', 'fun': constraint_anti_symmetric},
    ], options={'maxiter': 3000, 'disp': True})

    argument_result = np.reshape(result.x, (n, n))
    argument_result = np.round(argument_result, 2)

    return (argument_result, result.fun, result.message, result.success)


def solve_for_n_linalg(balances=list):
    if not np.isclose(np.sum(balances), 0):
        raise ValueError("Entries of b must sum to 0")

    n = len(balances)
    k = n * (n - 1)

    # Solve linear programming problem
    c = np.ones(k)
    A_eq = get_const_matrix(n)

    result = opt.linprog(c, A_eq=A_eq, b_eq=np.asarray(balances),
                         method='simplex',
                         #  bounds=bounds,
                         options={
                             'disp': False,
                             "tol": 1e-2
    })

    return (np.round(vec_2_mat(result.x).T, 2), result.fun, result.message, result.success)


def solve_for_n_pulp(balances):
    if not np.isclose(np.sum(balances), 0):
        raise ValueError("Entries of balances must sum to 0")

    n = len(balances)
    k = n * (n - 1)

    # Create the problem
    prob = LpProblem("LP_Problem", LpMinimize)

    # Decision variables
    x = LpVariable.dicts("x", range(k), lowBound=0)

    # Objective function
    prob += lpSum([x[i] for i in range(k)])

    # Constraints
    A_eq = get_const_matrix(n)
    for i in range(n):
        prob += (lpSum([A_eq[i, j] * x[j]
                 for j in range(k)]) == balances[i])

    # Solve the problem
    prob.solve(HiGHS())

    # Extract the results
    result_x = np.array([value(x[i]) for i in range(k)])
    return (np.round(vec_2_mat(result_x).T, 2), value(prob.objective), LpStatus[prob.status], prob.status == LpStatusOptimal)

# def get_const_matrix(n):
#     if n < 2:
#         raise ValueError("n must be at least 2")

#     block = np.vstack(
#         (np.ones((1, n-1)), -np.eye(n-1)))
#     b_list = [None] * n
#     b_list[0] = block

#     for i in range(1, n):
#         block[[i-1, i], :] = block[[i, i-1], :]
#         b_list[i] = block.copy()

#     return np.hstack(b_list)


def get_const_matrix(n):
    assert n >= 2, "Number of counterparties must be at least 2"

    # Create the initial block matrix
    block = np.vstack((np.ones((1, n-1)), -np.eye(n-1)))

    # Initialize the list to hold the blocks
    b_list = [None] * n
    b_list[0] = block

    # Fill the list with the appropriate blocks
    for i in range(1, n):
        block[[i-1, i], :] = block[[i, i-1], :]
        b_list[i] = block.copy()

    # Concatenate the blocks horizontally to form the final matrix
    return np.hstack(b_list)


def mat_2_vec(X):
    # Get the lower and upper triangular parts of the matrix, excluding the diagonal
    lower_tri = np.tril(X, -1)
    upper_tri = np.triu(X, 1)

    # Combine the lower and upper triangular parts and flatten to a vector
    return np.concatenate((lower_tri[lower_tri != 0], upper_tri[upper_tri != 0]))


def vec_2_mat(x):
    # Calculate the size of the matrix
    n = int(0.5 * (1 + np.sqrt(1 + 4 * len(x))))

    # Create an n x n matrix filled with zeros
    X = np.zeros((n, n))

    # Fill the lower and upper triangular parts of the matrix with the vector elements
    X[np.tril_indices(n, -1)] = x[:len(x)//2]
    X[np.triu_indices(n, 1)] = x[len(x)//2:]

    return X


def solve_for_n_pulp_2(balances: list):
    # balances = [
    #     98.33333333333333,
    #     198.33333333333331,
    #     -101.66666666666667,
    #     -14.666666666666677,
    #     -101.66666666666667,
    #     -78.66666666666667
    # ]
    # balances: dict[str, int] = {
    #     "alex": 0,
    #     "joana": 0,
    #     "lina": 0,
    #     "mischel": 0,
    #     "gonzalo": 0,
    #     "andre": 0,
    # }
    # if not np.isclose(np.sum(balances), 0):
    #     raise ValueError("Entries of balances must sum to 0")

    # balances["alex"] = 10 - 2 - 2  # = 6
    # balances["joana"] = -2 + 8 - 2  # = 4
    # balances["lina"] = -2 - 2 + 8  # = 4
    # balances["mischel"] = -2 - 2 - 2  # = -6
    # balances["gonzalo"] = -2 - 0 - 2  # = -4
    # balances["andre"] = -2 - 2 - 0  # = -4

    SMALL_O = 0.00001

    people: tuple[str, float] = [[v, x] for (v, x) in enumerate(balances)]

    # assert sum([x[1] for x in people]) == 0
    problem = LpProblem("who pays who", LpMinimize)

    who_pays_who_variables: dict[str, LpVariable] = {}
    how_much_who_pays_who_variables: dict[str, LpVariable] = {}

    for person_name, _ in people:
        for another_person_name, _ in people:
            if person_name == another_person_name:
                continue

            who_pays_who_var = LpVariable(
                f"who_pays_who_{person_name}_{another_person_name}",
                lowBound=0,
                upBound=1,
                cat=LpInteger,
            )

            who_pays_who_variables[(
                person_name, another_person_name)] = who_pays_who_var

            how_much_who_pays_who_var = LpVariable(
                f"how_much_who_pays_who_{person_name}_{another_person_name}",
                lowBound=0,
                upBound=None,
                cat=LpContinuous,
            )

            how_much_who_pays_who_variables[
                (person_name, another_person_name)
            ] = how_much_who_pays_who_var

            problem += who_pays_who_var >= how_much_who_pays_who_var * SMALL_O

    for person, amount in people:
        if amount < 0:
            this_person_how_much_vars = []

            for var_key in how_much_who_pays_who_variables.keys():
                from_person, _ = var_key
                if from_person == person:
                    this_person_how_much_vars.append(
                        how_much_who_pays_who_variables[var_key]
                    )

            problem += sum(this_person_how_much_vars) == abs(amount)
        elif amount > 0:
            this_person_how_much_vars = []

            for var_key in how_much_who_pays_who_variables.keys():
                _, to_person = var_key
                if to_person == person:
                    this_person_how_much_vars.append(
                        how_much_who_pays_who_variables[var_key]
                    )

            problem += sum(this_person_how_much_vars) == abs(amount)

    problem.objective = sum(who_pays_who_variables.values())

    problem.solve()

    resultats_matrices = np.zeros([len(balances), len(balances)])
    for vvar in who_pays_who_variables.values():
        if vvar.varValue == 0:
            continue
        print(f"{vvar}  ---  {vvar.varValue}")

    for ((x, y), vvar) in how_much_who_pays_who_variables.items():
        if vvar.varValue == 0:
            continue
        print(f"{vvar}  ---  {vvar.varValue}")
        resultats_matrices[x, y] = vvar.varValue

    # print("résultats matrices", resultats_matrices)
    return np.round(resultats_matrices, 2)
    # return (np.round(vec_2_mat(who_pays_who_var.x).T, 2), value(problem.objective), LpStatus[prob.status], prob.status == LpStatusOptimal)
