from functools import wraps

from flask import Flask, render_template, request, make_response, jsonify
from flask.ext.cors import CORS

__author__ = 'jayvee'

app = Flask(__name__)
CORS(app)


@app.route('/', methods=['GET'])
def test_demo():
    return render_template('test_index.html')


contents = [
    {
        'id': 1,
        'content': u'string1',
    },
    {
        'id': 2,
        'content': u'sting2',
    }
]


def get_content(page, time):
    return jsonify(contents=contents)


@app.route("/testPost", methods=['GET', 'POST'])
def test_post():
    if request.method == 'POST':
        return get_content(request.form['page'], request.form['time'])


if __name__ == '__main__':
    app.run('0.0.0.0', port=2222, debug=True)
