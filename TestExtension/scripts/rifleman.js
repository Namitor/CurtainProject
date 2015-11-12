/**
 * Created by jayvee on 15/11/12.
 */
var SCREEN_HEIGHT = window.innerHeight;
var SCREEN_WIDTH = window.innerWidth;
var current_url = window.location.href;
var user_id = '';
var shooter;
var isActive = false;


get_userid(current_url);//首先获取userid，给全局变量user_id赋值


function start_shooting(page_url, user_id) {
    //console.log('url:' + page_url);
    //console.log('userid:' + user_id);
    isActive = true;
    shooter = setInterval(function () {
        get_bullets(page_url, user_id);
    }, 3000);
}
function stop_shooting() {
    clearInterval(shooter);
    isActive = false;
}

function get_userid(page_url) {
    $.post("http://project-curtain.avosapps.com/init_user", {page_url: page_url}, function (data) {
        var jsonroot = JSON.parse(data);
        user_id = jsonroot['user_id'];
        console.log(user_id);
        //sendResponse({result: user_id});
    });
}


//chrome listener 主要的popup和主页面交互中心
chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
    switch (request.message) {
        case 'get_user_id':
            sendResponse({result: user_id, status: isActive});
            break;
        case 'start_shooting':
            console.log('start shooting');
            start_shooting(current_url, user_id);
            //sendResponse({result: user_id});
            break;
        case 'stop_shooting':
            console.log('stop shooting');
            stop_shooting();
            //sendResponse({result: user_id});
            break;
        case 'alert_msg':
            alert(request.msg);//不能在popup.html中alert，否则会关掉popup.html，所以通过消息机制进行alert
            break;
        default:
            break;
    }
});