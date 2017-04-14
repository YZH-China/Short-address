var oBtn = document.getElementById('btn1'), //获取按钮
	oTxt = document.getElementById('longurl'), //获取文本框
	oP = document.getElementById('result'); //获取结果容器

var reqObj = {
	longurl: '',
}

function btnClickHandle(e){
	var event = e || window.event;
	console.log(e)
}
function txtChangeHandle(e){
	var event = e || window.event;
	var target = e.target;
	if(event.type === 'textinput' || event.type === "textInput"){
		reqObj.longurl = event.target.value + event.data;
		console.log(reqObj.longurl);
	} else if(event.type === 'keypress'){
		if(event.keyCode !== 13){
			reqObj.longurl = event.target.value + event.key;
			console.log(reqObj.longurl);
		}	
	}
}

/**
 * 事件绑定
 */
function bindTextEvent() {
	if(oTxt.addEventListener){
		oTxt.addEventListener('textinput', txtChangeHandle, false);
		oTxt.addEventListener('textInput', txtChangeHandle, false);
		oTxt.addEventListener('keypress', txtChangeHandle, false);
	} else {
		oTxt.attachEvent('onkeypress', txtChangeHandle);
	}
}
function bindButtonClick() {
	if(oTxt.addEventListener){
		oBtn.addEventListener('click', btnClickHandle, false);
	} else {
		oBtn.attachEvent('click', btnClickHandle, false);
	}
}
bindTextEvent();
bindButtonClick();