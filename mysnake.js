//------------------------------Defined Variables-------------------------------------
//canvas	variables
var canvas = document.getElementById('mycanvas'),
    context = canvas.getContext('2d'),
    colorchange = new Array("lightred","lightgreen","lightblue","white","orange","yellow","pink","lightyellow","red"),
    nowColor;
//snake    variables
var snakeSize = 20,
	length = 0,
	temp = 8,
	cha = 0.3,
	snakeBody = [],
	dire = 2,
	over = 0;
//food    variables
var isfood = 0,
	food_x,food_y,
	food = {};
//background
var cvsGridX = canvas.width / snakeSize,
    cvsGridY = canvas.height / snakeSize, 
	direFlag = 0,//视图还未更新不改变方向
	timerChange,
	maxTime = 180;



//-------------------------------Function----------------------------------------
function init(){//初始化
	//startTime = new Date();
	snakeBody = [];
	length = 0;
	dire = 2;
	for(var i = 0;i < 3;i++){
		//正中间创节点
		createSnakeNode(parseInt(cvsGridX / 2) + i, parseInt(cvsGridY / 2));
	}
	drawSnake();
	putFood();
	if(localStorage.highestScore){
		document.getElementById('highestScore').innerText = localStorage.highestScore;
	}else{
		localStorage.highestScore = "0";
		document.getElementById('highestScore').innerText = "0";
	}
}

function createSnakeNode(x,y){
	snakeBody.push({x:x, y:y, color:length === 0 ? 'yellow':'white'});//确定每节身体的左上角坐标和颜色
	length++;
	var score = length - 3;
	setHightestScore();
	document.getElementById('nowScore').innerText = score;
}

function drawFirst(snakeNode){
	context.beginPath();
	context.fillStyle = snakeNode.color;
	context.arc(snakeNode.x*snakeSize+10,snakeNode.y*snakeSize+10,10,0,2 * Math.PI);
	context.fill();
	context.closePath();

	context.save();
	context.beginPath();
	context.fillStyle = "black";
	context.arc(snakeNode.x*snakeSize+15,snakeNode.y*snakeSize+15,5,0,2 * Math.PI);
	context.fill();
	context.closePath();
	context.restore();

}
function drawFood(snakeNode){
	context.beginPath();
	context.fillStyle = snakeNode.color;
	context.moveTo(snakeNode.x*snakeSize + 10,snakeNode.y*snakeSize);
	context.lineTo(snakeNode.x*snakeSize,snakeNode.y*snakeSize + 10);
	context.lineTo(snakeNode.x*snakeSize + 10,snakeNode.y*snakeSize + 20);
	context.lineTo(snakeNode.x*snakeSize + 20,snakeNode.y*snakeSize + 10);
	context.stroke();
	context.fill();
	context.closePath();
}
function drawRect(snakeNode,radius){
	context.beginPath();
	context.fillStyle = snakeNode.color;
	context.arc(snakeNode.x*snakeSize+10,snakeNode.y*snakeSize+10,radius,0,2 * Math.PI);
	context.fill();
	context.closePath();


}

function drawSnake(){
	context.clearRect(0,0,canvas.width,canvas.height);
	for(var i = 0;i < snakeBody.length;i++){
		if(i == 0){
			snakeBody[0].color = food.color;
			drawRect(snakeBody[i],12);
		}
		else if(i == snakeBody.length -1)
			drawRect(snakeBody[i],3);
		else{
			drawRect(snakeBody[i],10-7/(snakeBody.length - 1)*i);
		}
	}
	context.save();
	context.shadowBlur = 30;//阴影模糊度
	context.shadowColor = "white";
	drawFood(food);
	context.restore();

}

function snakeMove(){
	var newSnakeHeadNode = {x:snakeBody[0].x,y:snakeBody[0].y,color:snakeBody[0].color};
	//头节点未来位置
	if(dire === 1)	newSnakeHeadNode.y -= 1;
	if(dire === -1)	newSnakeHeadNode.y += 1;
	if(dire === 2)	newSnakeHeadNode.x -= 1;
	if(dire === -2)	newSnakeHeadNode.x += 1;
	for(var i = snakeBody.length - 1;i > 0;i--){
		snakeBody[i].x = snakeBody[i - 1].x;
		snakeBody[i].y = snakeBody[i - 1].y;
		if((snakeBody[i].x === newSnakeHeadNode.x) && (snakeBody[i].y === newSnakeHeadNode.y)){
			GameOver(move);
			return;
		}
	}
	snakeBody[0] = newSnakeHeadNode;
	direFlag = 0;
	isGetFood(snakeBody[0]);
	if(snakeBody[0].x < 0 || snakeBody[0].x > cvsGridX - 1 || snakeBody[0].y < 0 ||snakeBody[0].y > cvsGridY - 1){
		clearTimeout(timeChange);
		GameOver(move);
		return;
	}
	context.save();
	context.shadowBlur = 50;//阴影模糊度
	context.shadowColor = "white";
	drawSnake();
	context.restore();
}

function putFood(){
	var flag = 1;
	while(1){
		nowColor = colorchange[Math.floor(Math.random()*9)];
		flag = 1;
		var food_x = parseInt(Math.random()*cvsGridX);
		var food_y = parseInt(Math.random()*cvsGridY);
		for(var i = 0;i < snakeBody.length;i++){
			if(snakeBody[i].x === food_x && snakeBody[i].y === food_y)
				flag = 0;
		}
		if(flag)	break;
	}
	food = {x:food_x,y:food_y,color:nowColor};
}
var music2 = document.getElementById('music2');
function isGetFood(node){
	if(node.x === food.x && node.y === food.y){
		music2.play();
		putFood();//吃了食物之后放新食物
		createSnakeNode(snakeBody[snakeBody.length - 1].x,
						snakeBody[snakeBody.length - 1].y);
	}
}
function speed(){
      move=setInterval('snakeMove()',100);
}
function setDirection(dir){
	direFlag = 1;
	if(Math.abs(dir) === Math.abs(dire))	return;//同方向无反应，不能反方向
	dire = dir;//dire是当前位置
}

function setHightestScore(){
	var score = length - 3;
	if(parseInt(localStorage.highestScore) < length){
		localStorage.highestScore = score.toString();
		document.getElementById('highestScore').innerText = score;
	}
}
var music1 = document.getElementById('music1');
function GameOver(k){
	clearInterval(k);
	music1.play();
	drawOver();
}
document.onkeydown = function(e){
	e.preventDefault();//滑动条不动
	if(direFlag) return;
	//alert(e.keyCode);//用于查看键盘每个键的ascii
	if(e.keyCode === 38)	setDirection(1);
	if(e.keyCode === 40)	setDirection(-1);
	if(e.keyCode === 37)	setDirection(2);
	if(e.keyCode === 39)	setDirection(-2);
}

function calculateTime(){
	if(maxTime >= 0){
		minutes = Math.floor(maxTime / 60) ;
		seconds = Math.floor(maxTime % 60);
		minutes = minutes < 10 ? "0" + minutes: minutes;
		seconds = seconds < 10 ? "0" + seconds: seconds;
		var time = minutes+ ":"+seconds;
		document.getElementById('time').innerText = time;
		maxTime--;
		timeChange = setTimeout("calculateTime()",1000);
	}else{
		clearInterval(move);
		GameOver(timeChange);
	}
}







//注释————————
/*
setInterval() 方法可按照指定的周期（以毫秒计）来调用函数或计算表达式。
1、对于string,number等基础类型，==和===是有区别的
1）不同类型间比较，==之比较“转化成同一类型后的值”看“值”是否相等，===如果类型不同，其结果就是不等
2）同类型比较，直接进行“值”比较，两者结果一样

2、对于Array,Object等高级类型，==和===是没有区别的
进行“指针地址”比较

3、基础类型与高级类型，==和===是有区别的
1）对于==，将高级转化为基础类型，进行“值”比较
2）因为类型不同，===结果为false
*/