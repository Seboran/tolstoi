import numpy as np
from pulp import *


SMALL_O = 0.00001


def solve_for_n_pulp_2(balances: list):

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

    status = problem.solve(PULP_CBC_CMD(threads=8))

    if not status == LpStatusOptimal:
        print("invalid solution", status)
        raise Exception('problème')

    resultats_matrices = np.zeros([len(balances), len(balances)])

    for ((x, y), vvar) in how_much_who_pays_who_variables.items():
        if vvar.varValue == 0:
            continue
        resultats_matrices[x, y] = vvar.varValue

    return np.round(resultats_matrices, 2)
