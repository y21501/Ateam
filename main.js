// 
//  タイトル表示
//
// let home = document.getElementById("home");
// home.addEventListener("click", function(){
//     let p_title = document.createElement("p");
//     screen.appendChild(p_title);
    
// });

var canvas = document.getElementById("screeen");//canvasを読み込む
var ctx = canvas.getContext("2d");
var px = 190    //player x座標
var py = 740    //player y座標
var p_dx = 0    //player xの速さ  //追加
var p_dy = 0    //player yの速さ  //追加

var ps = 30

//レーザーの座標
var lx = [0];
var ly = [800];
var lw = 6
var lh = 15


//playerを描く関数
function player_draw(){
    ctx.beginPath()
    ctx.rect(px,py,30,30)
    ctx.fillStyle = "#00ff00"
    ctx.fill()
    ctx.closePath()
}
//レーザー------------------------------------
function l_draw(){
    for(var i = 0;i < ly.length;i++){
        ctx.beginPath() 
        ctx.rect(lx[i],ly[i],6,15)
        ctx.fillStyle="#ff0000"
        ctx.fill()
        ctx.closePath()
    }
}
//キーが押されたときに実行される
document.onkeydown = function(e){
    if(e.key == "ArrowLeft"){  //↑
        p_dx = -3
        p_dy = 0
    }
    if(e.key == "ArrowRight"){//↓
        p_dx = 3
        p_dy = 0
    }
    if(e.key == " "){
        lx.push(px);
        ly.push(py);
    }
}
//キーが離されたときに実行される
document.onkeyup = function(e){
    p_dx = 0    //止める
    p_dy = 0
}

function draw(){
    ctx.clearRect(0/*開始地点*/,0,canvas.width/*終了地点*/,canvas.height)   //canvasをいったんクリアする //追加
    player_draw()
    l_draw()
    for(var i = 0;i < ly.length/*リストの長さ */;i++){ //リストを読み込む
        ly[i]-=10
    }
    px += p_dx  //追加
    py += p_dy  //追加
}
setInterval(draw,10);    //10ミリ秒単位で実行 //追加
draw();



// var canvas = document.getElementById("screeen");//canvasを読み込む
// var ctx = canvas.getContext("2d");
// var px =  200   //player x座標
// var py = 700    //player y座標

// var p_dx = 0    //player xの速さ
// var p_dy = 0    //player yの速さ

// //レーザーの座標
// var lx =[0];   //レーザーをたくさん描けるようにするためリストにする
// var ly = [0];

// //enemyの座標
// var ex = [0];
// var ey = [0];

// //playerを描く関数
// function player_draw(){
//     ctx.beginPath()
//     ctx.rect(px,py,ps,ps)
//     ctx.fillStyle = "#00ff00"
//     ctx.fill()
//     ctx.closePath()
// }

// function l_draw(){
//     for(var i = 0;i < lx.length;i++){
//         ctx.beginPath()
//         ctx.rect(lx[i],ly[i],15,6)
//         ctx.fillStyle = "#ff0000"
//         ctx.fill()
//         ctx.closePath()
//     }
// }
// function e_draw(){
//     for(var i = 0;i < lx.length;i++){
//         ctx.beginPath()
//         ctx.rect(ex[i],ey[i],36,36)
//         ctx.fillStyle="#ff00ff"
//         ctx.fill()
//         ctx.closePath()
//     }
// }
// //キーが押されたときに実行される
// document.onkeydown = function(e){
//     if(e.key == "ArrowUp"){  //↑
//         p_dx = 0
//         p_dy = -3
//     }
//     if(e.key == "ArrowDown"){//↓
//         p_dx = 0
//         p_dy = 3
//     }
//     if(e.key == " "){
//         lx.push(px)    //レーザー発射開始位置(playerの位置)をリストに追加
//         ly.push(py)
//     }
    
// }
// //キーが離されたときに実行される
// document.onkeyup = function(e){
//     p_dx = 0    //止める
//     p_dy = 0
// }

// function draw(){
//     ctx.clearRect(0/*開始地点*/,0,canvas.width/*終了地点*/,canvas.height)   //canvasをいったんクリアする
//     player_draw()
//     l_draw()
//     e_draw()
//     for(var i = 0;i < lx.length/*リストの長さ*/;i++){   //リストを読み込む
//         lx[i] += 2  //今読み込んでいるレーザーを動かす
//     }
//     e_draw()
//     for(var i = 0;i < ex.length/*リストの長さ*/;i++){   //リストを読み込む
//         ex[i] -= 2  //今読み込んでいるenemyを動かす
//     }
//     //playerを動かす
//     px += p_dx
//     py += p_dy
// }
// setInterval(draw,10)    //10ミリ秒単位で実行

// draw();