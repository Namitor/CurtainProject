# coding: utf-8
from leancloud import Engine
from app import app
import leancloud_manager

engine = Engine(app)


@engine.define
def log_timer():
    print 'log in timer.'


@engine.define
def user_timer():
    print 'clean user.'
    leancloud_manager.update_user_status()
