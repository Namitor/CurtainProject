//AV.initialize('hG9GaSHPU0TRVt9PLfddF4vG', 'PYS0BJpBOafFEtDPjdtsoXF1');
//
//var TestObject = AV.Object.extend('TestObject');
//var testObject = new TestObject();
//testObject.save({
//    foo: 'bar'
//}, {
//    success: function (object) {
//        alert('LeanCloud works!');
//    }
//});

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
    var temp_time = new Date().getTime();
    $("body").append("<div id = 'bullet" + temp_time
        + "' style='background: red;font-size: 150%;position:fixed;right:" + start_right + "px;top:"
        + start_top + "px'>" + content + "</div>");
    //var bullet = document.createElement("span");
    //bullet.setAttribute("id", "bullet");
    //alert($(body).attr('width'));
    console.log($("#bullet" + temp_time) + 'created');
    //for(var i =0;i<speed;i++){
    //    $("#bullet" + temp_time).attr("style.right",i*20+start_right+"px")
    //}
    $("#bullet" + temp_time).animate({right: 2000 + "px"}, total_time, function () {
        this.remove();
        console.log(this, "remove")
    });
    console.log($("#bullet" + temp_time) + "animated");
}

setTimeout("shoot_bullet(-100, 200, '测试文本1', 8000)", 500);//延迟500ms执行该语句
setTimeout("shoot_bullet(-100, 150, '啊哈哈哈哈打算放大维纳斯达芙妮撒旦法到哪里可忘记了空位了空间啊蝶恋蜂狂就', 8000)",100);
