var canvas =document.getElementById('mycanvas'),
        context = canvas.getContext('2d');
var animateFrame;
var loc_y = 0,
    pps_b = 100,
    lastTime;
function calculateFps() {
    var now = new Date;
    fps = 1000 / (now - lastTime); // f=1/T
    fps = Math.round(fps);
    lastTime = now;
    return fps;
}
function calculatePpf(pps,fps){
	ppf = pps/fps;
	return Math.round(ppf);
}
function clearContext(){
	context.clearRect(0,0,canvas.width,canvas.height);
}
function drawbegin(){
	var title = new Image();
	title.src = 'title.png';
	title.onload = function(e){
	context.drawImage(title,0,0,canvas.width,canvas.height);
	}
}
function drawBackground(loc_y_background) {
	var image = new Image();
	image.src = 'back.jpg';
	image.onload = function(e){
		context.drawImage(image,0,0,canvas.width,canvas.height);
	}
	context.save();
	context.translate(0,loc_y_background);
	context.drawImage(image,0,0,canvas.width,canvas.height);
	context.drawImage(image,0,-canvas.height,canvas.width,canvas.height);
	context.restore();
}
function drawFrame() {
	clearContext();
	fps = calculateFps();
	context.save();
	var ppf_b = calculatePpf(pps_b,fps);
	loc_y += ppf;
	if(loc_y > canvas.height)
		loc_y = 0;
	drawBackground(loc_y);
	context.restore();
}

function animate(){
	if(beginButton2.onmouseout){
	    drawFrame();
	    animateFrame = requestAnimationFrame(animate);
    }
	else{
		cancelAnimationFrame(animateFrame);
	}
}

lastTime = new Date;
drawbegin();
animate();