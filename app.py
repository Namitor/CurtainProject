import hashlib
import json
import time
from flask import Flask, render_template, request, redirect, url_for
from flask.ext.cors import CORS
import leancloud_manager

__author__ = 'jayvee'

app = Flask(__name__)
CORS(app, origins='http://*')

STR_PAGE_URL = 'page_url'
STR_USER_ID = 'user_id'


@app.route('/', methods=['GET'])
def test_demo():
    return render_template('homepage.html')
    # return render_template('TestInLocal.html')


@app.route('/google7b8fcf02d6c8ed46.html', methods=['GET'])
def google_verify():
    return render_template('google7b8fcf02d6c8ed46.html')


@app.route('/testPage', methods=['GET'])
def test_page():
    return render_template('TestInLocal.html', )


@app.route("/getData", methods=['POST'])
def get_data():
    if request.form[STR_USER_ID] == '':
        return json.dumps({'contents': '', 'code': 1})
    # data = leancloud_manager.query_data(request.form[STR_PAGE_URL], request.form[STR_USER_ID], time.time())
    data = leancloud_manager.query_data_from_dict(request.form[STR_PAGE_URL],
                                                  request.form[STR_USER_ID],
                                                  time.time())
    if len(data) > 0:
        return json.dumps({'contents': data, 'code': 0})
    else:
        return json.dumps({'contents': data, 'code': 1})


@app.route('/init_user', methods=['POST'])
def init_user():
    cur_time = time.time()
    page_url = request.form[STR_PAGE_URL]
    m = hashlib.md5()
    print 'init '+str(page_url)+' '+str(cur_time)
    m.update(page_url + str(request.remote_addr) + str(cur_time))
    md5_id = m.hexdigest()
    # leancloud_manager.update_page_info(page_url, md5_id)
    # leancloud_manager.update_user_info(page_url, md5_id, cur_time)
    leancloud_manager.update_temp_user_info(page_url, md5_id, cur_time)
    return json.dumps({STR_USER_ID: md5_id})


@app.route("/postBullet", methods=['POST'])
def bullet_post():
    if request.form[STR_USER_ID] == '':
        return 'failed'
    # leancloud_manager.add_data(request.form[STR_PAGE_URL], time.time(), request.form['content'],
    #                            request.form[STR_USER_ID])
    leancloud_manager.add_data_in_dict(request.form[STR_PAGE_URL], time.time(), request.form['content'],
                                       request.form[STR_USER_ID])
    return 'success'


@app.route('/logout', methods=['POST'])
def log_out():
    # leancloud_manager.delete_page_user(request.form[STR_PAGE_URL], request.form[STR_USER_ID])
    # leancloud_manager.update_user_status()
    leancloud_manager.update_temp_data()
    leancloud_manager.update_temp_user()
    return 'success'


@app.route('/getUserNum', methods=['POST'])
def get_user_num():
    num = leancloud_manager.get_user_num(request.form[STR_PAGE_URL])
    return json.dumps({'user_num': num})


@app.route('/download', methods=['GET'])
def get_extension_file():
    return redirect(url_for('static', filename='downloads/Shooooty.crx'))


@app.route('/getAllPages', methods=['POST'])
def get_all_pages():
    data = leancloud_manager.get_all_pages()
    return json.dumps(data)


@app.route('/install', methods=['GET'])
def install_extension():
    return render_template('install.html')


@app.route('/feedback', methods=['POST'])
def feedback():
    email = request.form['email']
    content = request.form['content']
    is_ok = leancloud_manager.save_feedback(email, content)
    if is_ok:
        return json.dumps({'code': 0, 'msg': is_ok})
    else:
        return json.dumps({'code': 1, 'msg': is_ok})


if __name__ == '__main__':
    leancloud_manager.leancloud_init()
    app.run('0.0.0.0', port=2222, debug=True)
