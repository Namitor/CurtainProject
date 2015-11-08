import json

from flask import Flask, render_template, request, jsonify
from flask.ext.cors import CORS

from leancloudManager import leancloud_init, add_data, query_data

__author__ = 'jayvee'

app = Flask(__name__)
CORS(app)


@app.route('/', methods=['GET'])
def test_demo():
    return render_template('test_index.html')


def get_content(page, pre_time, cur_time):
    data = query_data(page, pre_time, cur_time)
    return json.dumps(data)


@app.route("/getData", methods=['GET', 'POST'])
def test_data():
    if request.method == 'POST':
        return get_content(request.form['page'], request.form['preTime'], request.form['curTime'])


@app.route("/postBullet", methods=['POST'])
def bullet_post():
    if request.method == 'POST':
        add_data(request.form['page'], request.form['time'], request.form['content'])
    return "success"


if __name__ == '__main__':
    leancloud_init()
    app.run('0.0.0.0', port=2222, debug=True)
