// chrome tab相关
var current_url;
var current_title;
var user_id = '';
var isAcitive = false;
var cur_user_num = 0;
console.log('popup');
chrome.tabs.query({active: true}, function (tabs) {
    current_url = tabs[0].url;
    current_title = tabs[0].title;
    $("#cur_title").text('当前页面：' + current_title);
    $("#cur_url").text('当前网址：' + current_url);
    chrome.tabs.sendMessage(tabs[0].id, {message: "get_status"}, function (response) {
        if (response != null) {
            user_id = response.result;
            isAcitive = response.status;
            cur_user_num = response.audience_user_num;
            $("#btn_switch")[0].checked = isAcitive;
            console.log('get userid:' + user_id);
            $("#cur_status").text('是否激活:' + isAcitive);
            $("#cur_audience_num").text('当前观众数：' + cur_user_num)
        } else {
            console.log('no response')
        }
    });
    //chrome.tabs.onRemoved.addListener(tabs[0].id, function () {
    //    //alert(user_id);
    //
    //    if (isActive) {
    //        //clearInterval(shooter);
    //        //$.post('http://project-curtain.avosapps.com/logout', {
    //        //        page_url: current_url,
    //        //        user_id: user_id
    //        //    },
    //        //    function (data, status) {
    //        //        console.log('logout' + status);
    //        //        isActive = false;
    //        //        user_id = '';
    //        //    });
    //        chrome.extension.sendRequest(
    //            {task: "close_tab", user_id: user_id, page_url: current_url},
    //            function (response) {
    //                //console.log(response.farewell);
    //            });
    //    }
    //});
    //chrome.tabs.onUpdate.addListener(tabs[0].id, function () {
    //    if (isActive) {
    //        //clearInterval(shooter);
    //        //$.post('http://project-curtain.avosapps.com/logout', {
    //        //        page_url: current_url,
    //        //        user_id: user_id
    //        //    },
    //        //    function (data, status) {
    //        //        console.log('logout' + status);
    //        //        isActive = false;
    //        //        user_id = '';
    //        //    });
    //        chrome.extension.sendRequest(
    //            {task: "close_tab", user_id: user_id, page_url: current_url},
    //            function (response) {
    //                //console.log(response.farewell);
    //            });
    //    }
    //});

});


//用户操作相关
$('#btn_switch').click(function () {
    //console.log($('#btn_switch')[0].checked);
    if ($('#btn_switch')[0].checked) {
        chrome.tabs.query({active: true}, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {message: "start_shooting"}, function (response) {
                if (response != null) {
                    console.log('started');
                    user_id = response.result;
                    isAcitive = response.status;
                    console.log(isAcitive);
                    $("#cur_status").text('是否激活:' + isAcitive);
                    cur_user_num += 1;
                    $("#cur_audience_num").text('当前观众数：' + cur_user_num)

                } else {
                    console.log('no response');
                    $('#btn_switch')[0].checked = false
                }
            });
        });
    } else {
        chrome.tabs.query({active: true}, function (tabs) {
            //current_url = tabs[0].url;
            //current_title = tabs[0].title;
            //$("#cur_title").text('当前页面：' + current_title);
            //$("#cur_url").text('当前网址：' + current_url);
            chrome.tabs.sendMessage(tabs[0].id, {message: "stop_shooting"}, function (response) {
                if (response != null) {
                    console.log('stoped');
                    user_id = response.result;
                    isAcitive = response.status;
                    console.log(isAcitive);
                    $("#cur_status").text('是否激活:' + isAcitive);
                    cur_user_num -= 1;
                    $("#cur_audience_num").text('当前观众数：' + cur_user_num)

                } else {
                    console.log('no response');
                }
            });
        });
    }
    //console.log('donw click' + cur_status);
    //$("#cur_status").text('状态:' + cur_status);
});

$("#btn_shoot").click(function () {
    //console.log('userid:' + user_id);
    if ($('#btn_switch')[0].checked && user_id != '') {
        //console.log('send:' + $("#bullet_content").val());
        $.post("http://project-curtain.avosapps.com/postBullet", {
                page_url: current_url,
                content: $("#bullet_content").val(),
                user_id: user_id
            },
            function (data, status) {
                console.log(status);
                if (status == 'success'){
                    window.close();
                }
            });
    } else {
        console.log('waiting for activation');
        chrome.tabs.query({active: true}, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {message: "alert_msg", msg: '请先开启弹幕功能'}, function (response) {
                if (response != null) {
                    //console.log('started');
                    user_id = response.result;
                } else {
                    console.log('no response');
                }
            });
        });
    }
});

$("#bullet_content").keydown(function(e) {
    var curKey = e.which;
    if (curKey == 13) {
        $("#btn_shoot").click();
        return false;
    }
});
//document.getElementById("btn_start").onclick = function () {
//    console.log(123123);
//    alert('123asdfasdf');
//};
//})
