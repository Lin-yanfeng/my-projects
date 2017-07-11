var nowPage = 0;
$(document).ready(function(e){
//	截取屏幕宽高
	var width = window.innerWidth;
	var height = window.innerHeight;
	
//	计算最外层div的宽高
	$(".content").width(width);
	$(".content").height(4*height);
	
//	每个页面的宽高
	$(".page").width(width);
	$(".page").height(height);

//触控监听
 	$(".content").swipe({
 		swipe:function(event,direction,distance,duration,fingerCount){
 			if(direction == "up"){
 				nowPage += 1;
 			}
 			else if(direction == "down"){
 				nowPage -= 1;
 			}
 			
 			if(nowPage > 3){
 				nowPage = 3;
 			}
 			
 			if(nowPage <0){
 				nowPage = 0;
 			}
 			
// 			动画:移动content盒子的位置	
			$(".content").animate({top:nowPage* (-100)+"%"},{duration:500,complete:animations})
 		}
 	});
// 	第一个页面的动画
//	楼房淡入
	$(".page1-building").fadeIn(2000,function(){
//		飞机变大
		$(".page1-person").animate({width:'70%'},{duration:1000});
	});
});

 function animations(){
 	if(nowPage == 1){
 		$(".page2-bg").fadeIn(2000,function(){
 			$(".page2-IT").fadeIn(2000);
 			$(".page2-farm").fadeIn(3000);
 		});
 	}
 	if(nowPage == 2){
 		$(".page3-early").fadeIn("slow");
 		$(".page3-last").fadeIn("slow");
// 		车跑人追
		$(".page3-bus").animate({left:'-100%'},{duration:2000});
		$(".page3-person").animate({left:'20%'},{duration:3000,complete:function(){
//			场景1淡出
			$(".page3-early").fadeOut("slow")
			$(".page3-last").fadeOut("slow")
			$(".page3-station").fadeOut("slow")
			$(".page3-person").fadeOut("slow",function(){
				$(".page3-wall").fadeIn(2000);								
				$(".page3-teammate").fadeIn(2000,function(){
				$(".page3-space").animate({width:'30%'},{duration:2000,complete:function(){
				$(".page3-where").animate({width:'40%'},{duration:2000});
				}});
				});
			})
		}});
 	}
 }


function clicklight(img){
	img.src = "img/lightOn.png";
	
	$(".page4-bg").fadeOut("slow");
	$(".page4-title").fadeOut("slow");
	$(".page4-click").fadeOut("slow",function(){
		$(".page4-onBg").fadeIn(2000,function(){
				$(".page4-wky").fadeIn(2000);
		});
	});
}


//音乐的播放与暂停
function pause(img){
	var player = document.getElementById("player");
	if(player.paused){
		player.play();
		img.src = "img/musicBtn.png";
	}else{
		player.pause();
		img.src = "img/musicBtnOff.png";
	}
}
