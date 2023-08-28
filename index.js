const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const score = document.querySelector('.score');
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

//Random Number:
function getRandomInt(min,max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random()*(max-min)+min);
}
//
//Bird Creation:
const birdImg = new Image();
birdImg.src = 'Flappy-Bird-PNG-Image.png' ;

let bird = {
    x:50,
    y:150,
    w:50,
    h:35,
    dy:2,
}
//
//Bird Movement:
document.addEventListener("keydown",(e)=>{
    if(e.keyCode===32){
        birdMove();
    }
})
function birdMove(){
    bird.y-=75;
}
function birdGravity(){
    bird.y+=bird.dy;
}
//
//Bird Render:
function renderBird(){
    ctx.drawImage(birdImg,bird.x,bird.y,bird.w,bird.h);
}
//
//Pipes Creation:
const pipe1Img = new Image();
pipe1Img.src='Mario_pipe.png';

const pipe2Img = new Image();
pipe2Img.src='Mario_piped.png';
//
//Pipes Update:
let pipesArr=[];
let timer = 0;

function renderPipes(){
    timer++;
    if(timer%100===0){
        pipesArr.push({
            x:650,
            y:getRandomInt(150,300),
            w:60,
            h:200,
        })
    }
    for(let i in pipesArr){
        ctx.drawImage(pipe1Img,pipesArr[i].x,pipesArr[i].y,pipesArr[i].w,pipesArr[i].h);
        ctx.drawImage(pipe2Img,pipesArr[i].x,pipesArr[i].y-350,pipesArr[i].w,pipesArr[i].h);
    }
    updatePipes();
    deletePipes();
    birdCollision();
}
function updatePipes(){
    for(let i in pipesArr){
        pipesArr[i].x-=5;
    }
}
function deletePipes(){
    for(let i in pipesArr){
        if(pipesArr[i].x<=-50){
            pipesArr.splice(i,1);
        }
    }
}

function birdCollision(){
    for(let i in pipesArr){
        if((pipesArr[i].x<=bird.x+bird.w && pipesArr[i].y<=bird.y+bird.h)){
            location.reload();
        }
    }
}
//
//Score:
let scoreValue = 0;
function updateScore(){
    score.innerHTML = scoreValue;
    for(let i in pipesArr){
        if(pipesArr[i].x===0){
            scoreValue++;
        }
    }
}
//
function game(){
    update();
    render();
    requestAnimationFrame(game);
}
requestAnimationFrame(game);
function update(){
    birdGravity();
    updateScore();
}
function render(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.beginPath();
    renderBird();
    renderPipes();
    ctx.closePath(); 
}