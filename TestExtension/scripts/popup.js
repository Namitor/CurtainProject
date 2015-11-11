console.log($("#btn_start"));
var current_url;
var current_title;
chrome.tabs.query({active: true}, function (tabs) {
    current_url = tabs[0].url;
    current_title = tabs[0].title;
    $("#cur_title").text('当前页面：' + current_title);
    $("#cur_url").text('当前网址：' + current_url);

});
$("#btn_start").click(function () {

    //alert('start');
    console.log('start');
    //start_shooting()

});

//document.getElementById("btn_start").onclick = function () {
//    console.log(123123);
//    alert('123asdfasdf');
//};
//})