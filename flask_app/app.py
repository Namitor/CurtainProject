import hashlib
import json
import time
from flask import Flask, render_template, request
from flask.ext.cors import CORS
import leancloud_manager

__author__ = 'jayvee'

app = Flask(__name__)
CORS(app)

STR_PAGE_URL = 'page_url'
STR_USER_ID = 'user_id'


@app.route('/', methods=['GET'])
def test_demo():
    return render_template('TestInLocal.html')


def get_content(page, user_id, cur_time):
    data = leancloud_manager.query_data(page, user_id, cur_time)
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
    leancloud_manager.update_page_info(request.form[STR_PAGE_URL], md5_id)
    leancloud_manager.update_user_info(md5_id, cur_time)
    return json.dumps({STR_USER_ID: md5_id})


@app.route("/postBullet", methods=['POST'])
def bullet_post():
    leancloud_manager.add_data(request.form[STR_PAGE_URL], time.time(), request.form['content'],
                               request.form[STR_USER_ID])
    return 'success'


@app.route('/logout', methods=['POST'])
def log_out():
    leancloud_manager.delete_page_user(request.form[STR_PAGE_URL], request.form[STR_USER_ID])
    return 'success'


@app.route('/getUserNum', methods=['POST'])
def get_user_num():
    num = leancloud_manager.get_user_num(request.form[STR_PAGE_URL])
    return json.dumps({'user_num': num})


if __name__ == '__main__':
    leancloud_manager.leancloud_init()
    app.run('0.0.0.0', port=2222, debug=True)
