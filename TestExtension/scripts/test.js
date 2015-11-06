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

var mask = document.createElement("div");//js新建元素
mask.setAttribute("id", "maskDiv");//给元素加id
mask.setAttribute("style", "position:fixed;right:50px;bottom:50px;");//悬浮
//mask.onclick = hideMask;//给元素添加点击事件
var img = document.createElement("img");


img.src = chrome.extension.getURL("imgs/2333.jpg");
img.style.width = "50px";
mask.appendChild(img);
//alert("append end");
document.body.appendChild(mask);//把元素放进body标签里面
var mask1 = document.createElement("div");//js新建元素
mask1.setAttribute("id", "maskDiv1");//给元素加id
mask1.setAttribute("style", "position:fixed;right:50px;bottom:100px;");//悬浮
//mask.onclick = hideMask;//给元素添加点击事件
var img1 = document.createElement("img");


img1.src = chrome.extension.getURL("imgs/2333.jpg");
img1.style.width = "50px";
mask1.appendChild(img1);
//alert("append end");
document.body.appendChild(mask1);//把元素放进body标签里面
//alert("bode append end");
//for (var i = 0; i < 80; i++) {
//$("#maskDiv").animate({right: 1000 + "px"}, 2000);
//alert("jquery")
//}
var inst = getInst("maskDiv");
var inst1 = getInst("maskDiv1");
inst.shoot("maskDiv");
//inst.gun("maskDiv");
//sleep(2000);
getInst("maskDiv1").shoot("maskDiv1");
inst1.shoot("maskDiv1");
//inst1.gun("maskDiv1");

function getInst() {
    var class_inst = {
        shoot: function (inst_id) {
            //alert(inst_id);
            $("#" + inst_id).animate({right: 1000 + "px"}, 2000, function () {
                $("#" + inst_id).hide();
            })
        }
    };
    return class_inst;
}

