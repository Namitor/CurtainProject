# coding: utf-8


from wsgiref import simple_server
import leancloud

from app import app
from cloud import engine

APPID = 'lXyQBue2G2I80NX9OIFY7TRk'
APPKEY = 'NkLOGPRHeVrFdJOQiDIGVGJ7'
leancloud.init(APPID, APPKEY)
# leancloud.init(APPID_TEST, APPKEY_TEST)

application = engine

if __name__ == '__main__':
    # 只在本地开发环境执行的代码
    app.debug = True
    server = simple_server.make_server('localhost', 3000, application)
    server.serve_forever()
