/**
 * Created by wangzi6147 on 2015/11/12.
 */

var user_id = 'wangzi6147';

$(document).ready(function () {
    $("#postBtn").click(function () {
        $.post("/getData", {
                page_url: "testPage",
                user_id: user_id
            },
            function (data, status) {
                var jsonroot = JSON.parse(data);
                for (var i = 0; i < jsonroot.contents.length; i++) {
                    var text = $("<p></p>");
                    $("body").append(text);
                    $(text).text(jsonroot.contents[i].content);
                }
            });
    });
    $("#shootBtn").click(function () {
        $.post("/postBullet", {
                page_url: "testPage",
                content: $("#bullet").val(),
                user_id: user_id
            },
            function (data, status) {
//{#                            alert(status)#}
            });
    });
    $('#initBtn').click(function () {
        $.post('/init_user', {
                page_url: 'testPage'
            },
            function (data, status) {
                var jsonroot = JSON.parse(data);
                user_id = jsonroot.user_id;
            });
    });
    $('#logoutBtn').click(function () {
        $.post('/logout', {
                page_url: 'testPage',
                user_id: user_id
            },
            function (data, status) {
                console.log(status)
            });
    });
    $('#getNumBtn').click(function () {
        $.post('/getUserNum', {
                page_url: 'testPage'
            },
            function (data, status) {
                var jsonroot = JSON.parse(data)
                console.log(jsonroot.user_num)
            });
    });
    $('#getAllPages').click(function(){
        $.post('/getAllPages',{
            options:''
        },function(data, status){
            var jsonroot = JSON.parse(data)
            console.log(jsonroot)
        });
    });
});