import hashlib
import json
import time
from flask import Flask, render_template, request
from flask.ext.cors import CORS
from leancloudManager import leancloud_init, add_data, query_data, update_user_info

__author__ = 'jayvee'

app = Flask(__name__)
CORS(app)

STR_PAGE_URL = 'page_url'
STR_USER_ID = 'user_id'


@app.route('/', methods=['GET'])
def test_demo():
    return render_template('TestInLocal.html')


def get_content(page, user_id, cur_time):
    data = query_data(page, user_id, cur_time)
    if len(data) > 0:
        return json.dumps({'contents': data, 'code': 0})
    else:
        return json.dumps({'contents': data, 'code': 1})


@app.route("/getData", methods=['POST'])
def get_data():
    return get_content(request.form[STR_PAGE_URL], request.form[STR_USER_ID], time.time())


@app.route('/init_user', methods=['POST'])
def init_user():
    cur_time = time.time()
    m = hashlib.md5()
    m.update(request.form[STR_PAGE_URL] + str(request.remote_addr) + str(cur_time))
    md5_id = m.hexdigest()
    update_user_info(md5_id, cur_time)
    return json.dumps({STR_USER_ID: md5_id})


@app.route("/postBullet", methods=['POST'])
def bullet_post():
    add_data(request.form[STR_PAGE_URL], time.time(), request.form['content'], request.form[STR_USER_ID])
    return 'success'


if __name__ == '__main__':
    leancloud_init()
    app.run('0.0.0.0', port=2222, debug=True)
