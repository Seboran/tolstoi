from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import os
import gensim
from gensim.models import KeyedVectors
from sklearn.decomposition import PCA

# Load the downloaded file using a path relative to this script
script_dir = os.path.dirname(__file__)
model_path = os.path.join(
    script_dir, "data", "frWac_non_lem_no_postag_no_phrase_200_cbow_cut0.bin")

print("Loading model from", model_path)
model = KeyedVectors.load_word2vec_format(
    model_path, binary=True, unicode_errors="ignore")

app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

print(model.most_similar("intéressant"))


@app.route('/api/v2/word-to-position', methods=['POST'])
@cross_origin()
def convert():
    data = request.get_json()
    words = data.get('words')
    if not words or not isinstance(words, list):
        return jsonify({'error': 'Invalid input; expecting a list of words'}), 400

    word_vectors = [model[w] for w in words]
    pca = PCA(n_components=2)
    transformed = pca.fit_transform(word_vectors)
    return jsonify({
        'positions': transformed.tolist(),
    })


if __name__ == '__main__':
    app.run()
