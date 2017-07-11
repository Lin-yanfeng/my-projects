var timer;
window.onload = function(){
//	依次播放图片
	document.getElementById("cymbal").onclick = function(){
		startAnimation("cymbal",13)
		}
	document.getElementById("drink").onclick = function(){
		startAnimation("drink",81)
		}
	document.getElementById("eat").onclick = function(){
		startAnimation("eat",40)
		}
	document.getElementById("fart").onclick = function(){
		startAnimation("fart",28)
		}
	document.getElementById("pie").onclick = function(){
		startAnimation("pie",24)
		}
	document.getElementById("scratch").onclick = function(){
		startAnimation("scratch",56)
		}
}
function startAnimation(name,count){
	clearInterval(timer);
	var index = 0;
//	获取播放动画的元素
	var img = document.getElementById("cat");
	timer = setInterval(function(){
		if(++index < count){
				img.src = getImageName(name,index);
		}else{
			clearInterval(timer);
		}
	},80);
}

function getImageName(name,index){
	return "img/Animations"+"/"+name+"/"+name+"_"+ getIndex(index)+".jpg";
}

function getIndex(index){
	if(index < 10){
		return "0"+index;
	}else{
		return index;
	}
}
