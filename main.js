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
var point = document.getElementById("score_value");
var ret = document.getElementById("home");
let back_home = document.getElementById("go_home");
var level = document.getElementById("level");
var px = 190    //player x座標
var py = 740    //player y座標
var pxe = [190]
var pye = [740]
var p_dx = 0    //player xの速さ  //追加
var p_dy = 0    //player yの速さ  //追加

var ps = 30

//レーザーの座標
var lx = [0];
var ly = [0];
var lw = 6
var lh = 15

//エネミーの座標
var ex = [100];
var ey = [100];
var es = 50;

var p = 0; //点数（ポイント）

var life = 2; // 残機

let spead;
let freq;

document.getElementById("start_button")
        .addEventListener("click", function() {
  document.getElementById("home_UI").hidden = true;
  document.getElementById("game_UI").hidden = false;

  switch(level.value){
    case "easy":
        spead = 2;
        freq = 1500;
        break;
    case "nomal":
        spead = 3;
        freq = 1000;
        break;
    case "hard":
        spead = 5;
        freq = 1000;
        break;
    case "very_hard":
        spead = 6;
        freq = 800;
}

//playerを描く関数
function player_draw(){
    // ctx.beginPath()
    // ctx.rect(px,py,30,30)
    // ctx.fillStyle = "#00ff00"
    // ctx.fill()
    // ctx.closePath()
    let player_img = new Image();
    player_img.src = "./picture/kao.png";
    ctx.drawImage(player_img, px, py, ps, ps);
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
// エネミー
 function e_draw(){
    for(var i=0;i < ey.length;i++){
        // ctx.beginPath() 
        // ctx.rect(ex[i],ey[i],es,es)
        // ctx.fillStyle="#ff00ff"
        // ctx.fill()
        // ctx.closePath()
        let enemy_img = new Image();
        enemy_img.src = "./picture/0da54ca2.png";
        ctx.drawImage(enemy_img, ex[i], ey[i], es, es)
    }
}

 // 残機
 function life_draw(){
    ctx.font = "600px UTF-8"
    ctx.fillStyle="#6699ff"
    ctx.fillText(life,20,600)
}

function l_colllision() {
    var colllision = false //衝突したか
    var colllision_n = 0 //衝突したえねみーの個体番号
    for (var i = 0; i < ly.length; i++) {
        for (var j = 0; j < ey.length; j++) {
            if (ey[j]+es>ly[i] && ex[j]+es>lx[i] && ex[j]<lx[i]+lw && ey[j]<ly[i]+lh) {
                console.log("衝突しました")
                colllision = true
                colllision_n = j
                if(life>=0){
                    p+=1; //ポイントを1増やす
                    point.innerHTML = p
                }
            }
        }
    }
    return [colllision,colllision_n]
}

// function e_colllision() {
//     var e_colllision = false //衝突したか
//     var e_colllision_n = 0 //衝突したえねみーの個体番号
//     for (var i = 0; i < pye.length; i++) {
//         for (var j = 0; j < ey.length; j++) {
//             if (ey[j]+es>py && ex[j]+es>px) {
//                 console.log("自機に衝突しました")
//                 e_colllision = true
//                 e_colllision_n = j
//                 life-=1; //ポイントを1増やす
//             }
//         }
//     }
//     return [e_colllision,e_colllision_n]
// }

function p_colllision() {
    var p_colllision = false //衝突したか
    var p_colllision_n = 0 //衝突したえねみーの個体番号
        for (var j = 0; j < ey.length; j++) {
            if (ey[j]+es>800) {
                console.log("突破されました")
                p_colllision = true
                p_colllision_n = j
                life-=1; //ポイントを1増やす
            }
        }
    
    return [p_colllision,p_colllision_n]
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
        lx.push(px+12);
        ly.push(py) ;
    }
}

//キーが離されたときに実行される
document.onkeyup = function(e){
    p_dx = 0    //止める
    p_dy = 0
}

ret.addEventListener('click',function(){window.location.reload()});

function draw(){
    ctx.clearRect(0/*開始地点*/,0,canvas.width/*終了地点*/,canvas.height)   //canvasをいったんクリアする //追加
    if(life >= 0){
        life_draw()
    }
    player_draw()
    l_draw()
    e_draw()
    var l_return = l_colllision()
    var p_return = p_colllision()
    // var e_return = e_colllision()
    if(l_return[0]){
        //ぶつかった個体を削除する（リストから削除する）
        ex.splice(l_return[1],1)
        ey.splice(l_return[1],1)
    }
    if(p_return[0]){
        //ぶつかった個体を削除する（リストから削除する）
        ex.splice(p_return[1],1)
        ey.splice(p_return[1],1)
    }
    // if(e_return[0]){
    //     //ぶつかった個体を削除する（リストから削除する）
    //     ex.splice(e_return[1],1)
    //     ey.splice(e_return[1],1)
    // }
    for(var i = 0;i < ly.length/*リストの長さ */;i++){ //リストを読み込む
        ly[i]-=10
    }
    e_draw()

    //エネミーの移動スピード変更

    for(var i = 0;i < ey.length/*リストの長さ */;i++){ //リストを読み込む
        ey[i]+= spead;
    }
    px += p_dx  //追加
    py += p_dy  //追加

    if(life<0){
        game_over();
        back_home.hidden = false;
        back_home.addEventListener("click", function(){
            window.location.reload();
        });
    }
}
setInterval(draw,10);    //10ミリ秒単位で実行 //追加

function game_over(){
    ctx.font = "50px UTF-8"
    ctx.fillStyle="#e65c7a"
    ctx.fillText("GameOver",75,400)
}

function e_make(){
    ey.push(100);
    ex.push(Math.floor(Math.random()*370)) //0~369
}
setInterval(e_make,freq);

draw();
}, false);
