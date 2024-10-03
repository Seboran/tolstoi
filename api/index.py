from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from solve_for_n import solve_for_n, solve_for_n_pulp, solve_for_n_pulp_2

app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/api/solve', methods=['POST'])
@cross_origin()
def solve_route():
    data = request.get_json()
    balances = data.get('balances')
    if balances is None or not isinstance(balances, list):
        return jsonify({'error': 'Invalid input'}), 400
    result_matrix, result_fun, result_message, result_success = solve_for_n(
        balances)
    return jsonify({
        # Convert numpy array to list for JSON serialization
        'result_matrix': result_matrix.tolist(),
        'result_fun': result_fun,
        'message': result_message,
        'success': bool(result_success)
    })


@app.route('/api/v2/solve', methods=['POST'])
@cross_origin()
def solve_route_linalg():
    data = request.get_json()
    balances = data.get('balances')
    if balances is None or not isinstance(balances, list):
        return jsonify({'error': 'Invalid input'}), 400
    result_matrix = solve_for_n_pulp_2(
        balances)
    return jsonify({
        # Convert numpy array to list for JSON serialization
        'result_matrix': result_matrix.tolist(),

    })


if __name__ == '__main__':
    app.run()
