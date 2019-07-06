var timer;
drawbegin();
function drawbegin(){
	var image = new Image();
	image.src = 'zct2.jpg';
	image.onload = function(e){
		context.drawImage(image,0,0,canvas.width,canvas.height);
	}	


}
function drawOver(){

	
	context.save();
	context.shadowColor = "white";
	context.fillStyle = "white";
	context.globalAlpha = 0.3;
	context.fillRect(0,0,canvas.width,canvas.height);
	context.restore();

	context.save();
	context.shadowColor = "black";
	context.shadowBlur = 50;
	context.font="50px KaiTi_GB2312";
	context.fillStyle = "yellow";
	context.textAlign='center';
	var score = length - 3;
	context.fillText("Your Score:" + score,0.5*canvas.width,350);
	context.fillText("Your Highest Score:" + localStorage.highestScore,0.5*canvas.width,450);
	context.restore();

	againButton.style.display = "block";
	clearScoreButton.style.display = "block";

	var over = new Image();
	over.src = 'gameover.png';
	over.onload = function(e){
	context.drawImage(over,0,0,canvas.width,canvas.height);
	}
}
againButton.onclick = function (e) {
	maxTime = 180;
    init();
    calculateTime();
    speed();

    againButton.style.display = "none";
    clearScoreButton.style.display = "none";
}

beginButton1.onmousemove = function (e) {
    beginButton1.style.display = "none";
    beginButton2.style.display = "block";
};

beginButton2.onmouseout = function(e){
	beginButton1.style.display = "block";
    beginButton2.style.display = "none";
}

beginButton2.onclick = function (e) {
    context.clearRect(0,0,canvas.width,canvas.height);
    bling.remove();
    beginButton1.remove();
    beginButton2.remove();
    init();
    calculateTime();
    speed();
}

function playPause(){
	var music = document.getElementById('mymusic');
	var music_btn = document.getElementById('music_btn2');
	if (music.paused){
		music.play(); 
		music_btn.src = 'music2.png'; 
	} 
	else{ 
		music.pause(); 
		music_btn.src = 'music.png';
	}
}

clearScoreButton.onclick = function (e) {
    localStorage.clear();
    document.getElementById('highestScore').innerText = "0"
};
