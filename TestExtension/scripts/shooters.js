function sleep(numberMillis) {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime)
            return;
    }
}
//

function shoot_bullet(start_right, start_top, content, total_time) {
    //$('body').css({overflow: 'hidden'});
    var temp_time = new Date().getTime();
    $("body").append("<div id='bullet" + temp_time + "'>" + content + "</div>");
    var bullet = $("#bullet" + temp_time);
    bullet.css({
        'font-size': '40px',
        overflow: 'hidden',
        height: '40px',
        top: start_top,
        position: 'fixed',
        left: window.innerWidth - start_right,
        color: '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16)
    });
    console.log("before animate====" + bullet.css('left'));
    console.log(-bullet.width());
    bullet.animate({left: -$(this).width()}, total_time, "linear", function () {
        console.log($(this), 'remove');
        $(this).remove();
    });
    console.log(bullet + "animated");
}

function machine_gun(bullets) {

}

setTimeout("shoot_bullet(-100,100, '测试文本1', 8000)", 0);//延迟500ms执行该语句
setTimeout("shoot_bullet(-100,200, '啊哈哈哈哈打算放大维纳斯达芙妮撒旦法到哪里可忘记了空位了空间啊蝶恋蜂狂就', 8000)", 1000);
