import leancloud
from leancloud import Object
from leancloud import Query
from requests.packages import urllib3


def leancloud_init():
    urllib3.disable_warnings()
    leancloud.init('lXyQBue2G2I80NX9OIFY7TRk', 'NkLOGPRHeVrFdJOQiDIGVGJ7')
    return


def add_data(page, time, content):
    curtain_object = Object.extend('CurtainObject')
    object = curtain_object()
    object.set('page', page)
    object.set('time', time)
    object.set('content', content)
    object.save()
    return


def query_data(page,  pre_time, cur_time):
    data = list()
    curtain_object = Object.extend('CurtainObject')
    query = Query(curtain_object)
    query.equal_to('page', page)
    query.greater_than('time', pre_time)
    query.less_than('time', cur_time)
    query.select('content')
    results = query.find()
    for result in results:
        data.append({'content': result.get('content')})
    return {'contents': data}
