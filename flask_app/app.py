from flask import Flask, render_template

__author__ = 'jayvee'

app = Flask(__name__)


@app.route('/', methods=['GET'])
def test_demo():
    return render_template('test_index.html')


if __name__ == '__main__':
    app.run('0.0.0.0', port=2222, debug=True)
