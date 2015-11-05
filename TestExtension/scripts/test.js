

AV.initialize('hG9GaSHPU0TRVt9PLfddF4vG', 'PYS0BJpBOafFEtDPjdtsoXF1');

var TestObject = AV.Object.extend('TestObject');
var testObject = new TestObject();
testObject.save({
  foo: 'bar'
}, {
  success: function(object) {
    alert('LeanCloud works!');
  }
});

var mask = document.createElement("div");//js新建元素
mask.setAttribute("id", "maskDiv");//给元素加id
mask.setAttribute("style", "position:fixed;right:50px;bottom:50px;");//悬浮
//mask.onclick = hideMask;//给元素添加点击事件

var img = document.createElement("img");
img.src = chrome.extension.getURL("imgs/2333.jpg");
img.style.width = "50px";
mask.appendChild(img);
document.body.appendChild(mask);//把元素放进body标签里面