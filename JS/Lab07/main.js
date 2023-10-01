"use strict"


var ball = document.getElementById('myach');
let oldPosX = ball.getBoundingClientRect().left;
let oldPosY = ball.getBoundingClientRect().top;
console.log(oldPosX);
let newPosX;
let newPosY;

ball.style.width = "50px";

ball.onmousedown = function(e) {


  var coords = getCoords(ball);
  var shiftX = e.pageX - coords.left;
  var shiftY = e.pageY - coords.top;

  moveAt(e);

  ball.style.zIndex = 1000; 

  function moveAt(e) {
    ball.style.left = e.pageX  - shiftX + 'px';
    ball.style.top = e.pageY - shiftY + 'px';
}

document.onmousemove = function(e) {
    moveAt(e);
};

ball.onmouseup = function() {
    document.onmousemove = null;
    ball.onmouseup = null;
    newPosX = ball.getBoundingClientRect().left;
    newPosY = ball.getBoundingClientRect().top;
    console.log(newPosX);
    if(newPosY < 450) {
      ball.style.left = oldPosX + 'px';
      ball.style.top = oldPosY + 'px';
    }
    else {
      invertMove();
    }
};

function invertMove() {
    let diffX = newPosX - oldPosX;
    let diffY = newPosY - oldPosY;
    
    let stepX = diffX / 50;
    let stepY = diffY / 50;

    let curPosX = ball.getBoundingClientRect().left;
    let curPosY = ball.getBoundingClientRect().top;
    ball.style.left = curPosX - diffX - diffX + 'px';
    ball.style.top = curPosY - diffY - diffY + 'px';

    animation();

    var i = 1;
    var delay = 1;
    function animation() {
       setTimeout((function() {
          curPosX -= stepX;
          curPosY -= stepY;
          ball.style.left = curPosX + 'px';
          ball.style.top = curPosY + 'px';
          i++;
          
          if (i > 80) delay ++;
          if(i < 100) {
            animation();
          }
       }), delay)
    
    }
}

}



ball.ondragstart = function() {
  return false;
};

function getCoords(elem) { 
  var box = elem.getBoundingClientRect();
  return {
    top: box.top,
    left: box.left
  };
}