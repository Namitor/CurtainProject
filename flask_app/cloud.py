# coding: utf-8
import time
from leancloud import Engine
from app import app
import leancloud_manager

engine = Engine(app)


@engine.define
def log_timer():
    print 'log in timer.'


@engine.define
def user_timer():
    print 'clean user.' + str(time.time())
    #leancloud_manager.update_user_status()
    leancloud_manager.update_temp_user()


@engine.define
def data_timer():
    print 'updata data.' + str(time.time())
    leancloud_manager.update_temp_data()
