//参考自https://www.cnblogs.com/heyujun-/p/6759464.html
var stars=document.getElementById('stars');
 
var Obj=function(){}   //创建一个对象
 
Obj.prototype.drawStar=function(){ //prototype添加对象属性
    var odiv=document.createElement('div');   //创建div
    odiv.style.width='7px';//引入图片的长和宽
    odiv.style.height='7px';
    odiv.style.position='relative';   //设置div为相对定位
    odiv.style.left=(150 + Math.floor(canvas.width*Math.random()))+'px';   //div的left值不能超出屏幕的宽度,div相对于整个屏幕
    odiv.style.top=(10 + Math.floor(canvas.height*Math.random()))+'px';//div的top值不能超出屏幕的高度
    odiv.style.overflow='hidden';  //设置div的overflow为hidden——溢出隐藏
    stars.appendChild(odiv);   //添加div到stars_box元素上
    var ostar=document.createElement('img');   //再创建img元素
    ostar.style.width='49px';
    ostar.style.height='7px';
    ostar.src='star.png';
    ostar.style.position='absolute';   //设置img为绝对定位
    ostar.style.top='0px';
    odiv.appendChild(ostar);   //把img添加到div中
    Play(ostar);    //实现动画闪烁的方法Play();
}
 
function Play(ele){
    var i=Math.floor(Math.random()*7);  //为了使星星不同时闪烁，设置随机值
    var timer=setInterval(function(){     //每100ms执行一次匿名方法
        if(i<7){
            ele.style.left=-i*7+'px';
            i++;
        }else{
            i=0;
        }  
    },100);
}
 
//使用for循环创建30个不同的对象
for(var i=0;i<40;i++){
    var obj=new Obj();
    obj.drawStar();
}

