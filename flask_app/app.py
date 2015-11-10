import json
import md5

import time
from flask import Flask, render_template, request, jsonify
from flask.ext.cors import CORS

from leancloudManager import leancloud_init, add_data, query_data

__author__ = 'jayvee'

app = Flask(__name__)
CORS(app)


@app.route('/', methods=['GET'])
def test_demo():
    return render_template('TestInLocal.html')


def get_content(page, user_id, cur_time):
    data = query_data(page, user_id, cur_time)
    if len(data) > 0:
        return json.dumps({'contents': data, 'code': 0})
    else:
        return json.dumps({'contents': data, 'code': 1})


@app.route("/getData", methods=['GET', 'POST'])
def get_data():
    if request.method == 'POST':
        return get_content(request.form['page'], request.form['userID'], time.time())


@app.route('/init_user', methods=['GET'])
def init_user():
    return request.remote_addr


@app.route("/postBullet", methods=['POST'])
def bullet_post():
    if request.method == 'POST':
        add_data(request.form['page'], time.time(), request.form['content'])
    return 'success'


if __name__ == '__main__':
    leancloud_init()
    app.run('0.0.0.0', port=2222, debug=True)
