function ZoomPic (){
	this.initialize.apply(this, arguments)	
}
ZoomPic.prototype = {
	initialize : function (id)
	{
		var _this = this;
//		通过三目运算符判断id是否为字符串
		this.wrap = typeof id === "string" ? document.getElementById(id) : id;
//		通过getElementsByTagName（)返回各个指定元素集合
		this.oUl = this.wrap.getElementsByTagName("ul")[0];
		this.aLi = this.wrap.getElementsByTagName("li");
		this.left = this.wrap.getElementsByTagName("pre")[0];
		this.right = this.wrap.getElementsByTagName("pre")[1];
//		初始时间定义为null
		this.timer = null;
//		对数组进行排序
		this.aSort = [];
//		视觉界面五张图片排列,选取第三张也就是最中间作为展示页面
		this.iCenter = 3;
		this._doPrev = function () {return _this.doPrev.apply(_this)};
		this._doNext = function () {return _this.doNext.apply(_this)};
//		视线所在范围内的图片显示，定义可选择数组
		this.options = [
			{width:124, height:154, top:71, left:134, zIndex:1},
			{width:134, height:174, top:61, left:0, zIndex:2},
			{width:174, height:218, top:37, left:110, zIndex:3},
			{width:224, height:288, top:0, left:262, zIndex:4},
			{width:174, height:218, top:37, left:468, zIndex:3},
			{width:134, height:174 , top:61, left:620, zIndex:2},
			{width:124, height:154, top:71, left:496, zIndex:1}
		];
		for (var i = 0; i < this.aLi.length; i++) this.aSort[i] = this.aLi[i];
		this.aSort.unshift(this.aSort.pop());
		this.setUp();
//		点击事件
		this.addEvent(this.left, "click", this._doPrev);
		this.addEvent(this.right, "click", this._doNext);
		this.doImgClick();		
		this.timer = setInterval(function (){
			_this.doNext()	
		}, 2000);
//		鼠标悬停事件
		this.wrap.onmouseover = function (){
			clearInterval(_this.timer)	
		};
		this.wrap.onmouseout = function (){
			_this.timer = setInterval(function (){
				_this.doNext()	
			}, 2000);	
		}
	},
	doPrev : function (){
//		去掉数组最后一个元素的同时在数组首位添加一个元素即为左移
		this.aSort.unshift(this.aSort.pop());
		this.setUp()
	},
	doNext : function (){
		this.aSort.push(this.aSort.shift());
		this.setUp()
	},
	doImgClick : function (){
		var _this = this;
		for (var i = 0; i < this.aSort.length; i++)
		{
			this.aSort[i].onclick = function (){
				if (this.index > _this.iCenter)
				{
					for (var i = 0; i < this.index - _this.iCenter; i++) _this.aSort.push(_this.aSort.shift());
					_this.setUp()
				}
				else if(this.index < _this.iCenter){
					for (var i = 0; i < _this.iCenter - this.index; i++) _this.aSort.unshift(_this.aSort.pop());
					_this.setUp()
				}
			}
		}
	},
	setUp : function (){
		var _this = this;
		var i = 0;
//		添加元素 播放图片
		for (i = 0; i < this.aSort.length; i++) this.oUl.appendChild(this.aSort[i]);
		for (i = 0; i < this.aSort.length; i++)
		{
			this.aSort[i].index = i;
			if (i < 7)
			{
				this.css(this.aSort[i], "display", "block");
				this.doMove(this.aSort[i], this.options[i], function (){
					_this.doMove(_this.aSort[_this.iCenter].getElementsByTagName("img")[0], {opacity:100}, function (){
						_this.doMove(_this.aSort[_this.iCenter].getElementsByTagName("img")[0], {opacity:100}, function (){
							_this.aSort[_this.iCenter].onmouseover = function (){
								_this.doMove(this.getElementsByTagName("div")[0], {bottom:0})
							};
							_this.aSort[_this.iCenter].onmouseout = function (){
								_this.doMove(this.getElementsByTagName("div")[0], {bottom:-100})
							}
						})
					})
				});
			}
			else{
				this.css(this.aSort[i], "display", "none");
				this.css(this.aSort[i], "width", 0);
				this.css(this.aSort[i], "height", 0);
				this.css(this.aSort[i], "top", 37);
				this.css(this.aSort[i], "left", this.oUl.offsetWidth / 2)
			}
			if (i < this.iCenter || i > this.iCenter)
			{
//				当前元素不居中时透明度为30
				this.css(this.aSort[i].getElementsByTagName("img")[0], "opacity", 30)
				this.aSort[i].onmouseover = function (){
					_this.doMove(this.getElementsByTagName("img")[0], {opacity:100})	
				};
				this.aSort[i].onmouseout = function (){
					_this.doMove(this.getElementsByTagName("img")[0], {opacity:35})
				};
				this.aSort[i].onmouseout();
			}
			else{
				this.aSort[i].onmouseover = this.aSort[i].onmouseout = null
			}
		}		
	},
	addEvent : function (oElement, sEventType, fnHandler){
		return oElement.addEventListener ? oElement.addEventListener(sEventType, fnHandler, false) : oElement.attachEvent("on" + sEventType, fnHandler)
	},
	css : function (oElement, attr, value){
		if (arguments.length == 2){
			return oElement.currentStyle ? oElement.currentStyle[attr] : getComputedStyle(oElement, null)[attr]
		}
		else if (arguments.length == 3){
			switch (attr)
			{
				case "width":
				case "height":
				case "top":
				case "left":
				case "bottom":
					oElement.style[attr] = value + "px";
					break;
				case "opacity" :
					oElement.style.filter = "alpha(opacity=" + value + ")";
					oElement.style.opacity = value / 100;
					break;
				default :
					oElement.style[attr] = value;
					break
			}	
		}
	},
	doMove : function (oElement, oAttr, fnCallBack){
		var _this = this;
		clearInterval(oElement.timer);
		oElement.timer = setInterval(function (){
			var bStop = true;
			for (var property in oAttr){
				var iCur = parseFloat(_this.css(oElement, property));
				property == "opacity" && (iCur = parseInt(iCur.toFixed(2) * 100));
				var iSpeed = (oAttr[property] - iCur) / 5;
				iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
				
				if (iCur != oAttr[property]){
					bStop = false;
					_this.css(oElement, property, iCur + iSpeed)
				}
			}
			if (bStop){
				clearInterval(oElement.timer);
				fnCallBack && fnCallBack.apply(_this, arguments)	
			}
		}, 30)
	}
};
window.onload = function (){
	new ZoomPic("box");
};
