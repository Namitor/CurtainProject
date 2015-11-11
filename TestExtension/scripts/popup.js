console.log($("#btn_start"));
var current_url;
var current_title;
chrome.tabs.query({active: true}, function (tabs) {
    current_url = tabs[0].url;
    current_title = tabs[0].title;
    $("#cur_title").text('当前页面：' + current_title);
    $("#cur_url").text('当前网址：' + current_url);

});
$("#btn_shoot").click(function () {
    if(user_id!='') {
        $.post("http://project-curtain.avosapps.com/postBullet", {
                page_url: current_url,
                content: $("#bullet_content").val(),
                user_id: user_id
            },
            function (data, status) {
                console.log(status);
            });
    }else{
        console.log('waiting for user_id');
    }
});

//document.getElementById("btn_start").onclick = function () {
//    console.log(123123);
//    alert('123asdfasdf');
//};
//})
