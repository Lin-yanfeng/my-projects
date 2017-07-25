window.onload = function(){
	animates();
	
}

function animates(){
//	创建canvas元素
	var canvas = document.createElement("canvas");
//	将canvas插入body里面
	document.body.appendChild(canvas);
//	javascript设置背景颜色
	canvas.style.backgroundColor = "beige";
//	获取屏幕的宽高
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	
	var context = canvas.getContext("2d");
	
	
//	创建一个数组,用于保存粒子
	var arr = [];
	
	loop();
	
//	定义一个随机产生粒子的方法
	function loop(){
//		定时器
		setInterval(function(){
//			清空画布
			context.clearRect(0,0,canvas.width,canvas.height);
//			随机产生一个圆心位置
			var part = new particle(canvas.width*0.5,canvas.height*0.5);
//			把对象存入数组		
			arr.push(part);
			
			for(var i = 0;i<arr.length;i++){
//				更新粒子的位置
				arr[i].upData();
				
			}
		},30);
	}
	
	
//	如何画一个粒子
	function particle(xPos,yPos){
		
//		this.xPos当前粒子圆心的x坐标
//		this.yPos当前粒子的圆心的y坐标
		this.xPos = xPos;
		this.yPos = yPos;
		
//		y方向的变化
		this.yVal = -7;
//		x方向的变化
		this.xVal = Math.random()*8-4;
//		定义一个重力因素
		this.gravity = 0.1;
		
//		把画圆封装方法
		this.draw = function(){
//			开始路径
			context.beginPath();
			context.arc(this.xPos,this.yPos,5,0,Math.PI*2,false);
//			结束路径
			context.closePath();
//			填充颜色
			context.fill();
		
		};
		
//		upData()方法
		
//		每次更新圆的位置
		this.upData =function(){
//			更新圆心y的位置
			this.yPos = this.yPos + this.yVal;
			this.xPos = this.xPos + this.xVal;
//			每次给y轴加点重力
			this.yVal = this.yVal + this.gravity;
			
//			添加颜色
			context.fillStyle = getrandomcolor();
			this.draw();
		};
	}
	
//	封装彩色颜色
	function getrandomcolor(){
//		十进制16777215转换成十六进制是FFFFFF，颜色的最大值
		return "#" + Math.floor(Math.random()*16777215).toString(16);
	}
	
}

