import leancloud
from leancloud import Object
from leancloud import Query
from requests.packages import urllib3


def leancloud_init():
    urllib3.disable_warnings()
    leancloud.init('lXyQBue2G2I80NX9OIFY7TRk', 'NkLOGPRHeVrFdJOQiDIGVGJ7')


def add_data(page, time, content):
    curtain_object = Object.extend('CurtainObject')
    object = curtain_object()
    object.set('page', page)
    object.set('time', time)
    object.set('content', content)
    object.save()


def query_data(page, user_id, cur_time):
    last_post_time = update_user_info(user_id, cur_time)
    data = list()
    curtain_object = Object.extend('CurtainObject')
    query = Query(curtain_object)
    query.equal_to('page', page)
    query.greater_than('time', last_post_time)
    query.less_than('time', cur_time)
    query.ascending('time')
    results = query.find()
    for result in results:
        data.append({'content': result.get('content'), 'timestamp': result.get('time')})
    return data


def update_user_info(user_id, cur_time):
    cls_user = Object.extend('UserTimeStamp')
    query = Query(cls_user)
    query.equal_to('userID', user_id)
    try:
        result = query.first()
    except Exception, e:
        result = None
    if result == None:
        user_object = cls_user()
        user_object.set('userID', user_id)
        user_object.set('last_post_time', cur_time)
        user_object.save()
        return cur_time
    else:
        last_t = result.get('last_post_time')
        result.set('last_post_time', cur_time)
        result.save()
        return last_t


if __name__ == '__main__':
    leancloud_init()
    query_data('testPage', 'hehe', 1446999990)
