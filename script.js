const boxs = document.querySelectorAll('.box');
const statusTxt = document.querySelector('#status');
const btnRestart = document.querySelector('#restart');
let x = "<img src='images/X img.png'>";
let o = "<img src= 'images/O img.png'>";
const win = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]; 

let options = ["","","","","","","","",""];//calculate values
let currentPlayer = x;
let running = false;
let player = "X";

init();

function init(){
 boxs.forEach( box=>box.addEventListener('click',boxClick)); // box click event
 btnRestart.addEventListener('click',restartGame); // restart event
 statusTxt.textContent = `${player} Your Turn`;
 running = true;
}
function boxClick(){
 const index = this.dataset.index;
 if(options[index]!="" || !running){ //not empty || not running state of game
    return;
 }
 updateBox(this,index); // update the index position of the box
checkWinner();
}
function updateBox(box,index){
  options[index] = player; // assign particular player
  box.innerHTML = currentPlayer; // update picture 
}
function changePlayer(){  // change the next player
  player = (player=='X') ? "O" : "X";
  currentPlayer = (currentPlayer==x) ? o : x;
  statusTxt.textContent = `${player} Your Turn`;
}

function checkWinner(){
  let isWon=false; // default set as false
  for(let i=0;i<win.length;i++){ // one by one [0,1,2].....
    const condition=win[i]; //[0,1,2]
    const box1=options[condition[0]]; //x
    const box2=options[condition[1]]; //''
    const box3=options[condition[2]]; //''
    if(box1=="" || box2=="" || box3==""){
      continue; //terminates the particular execution and goes to next execution
    }
    if(box1==box2 && box2==box3){ // check the winning condition
      isWon=true;
      boxs[condition[0]].classList.add('win');// add the 'win' class
      boxs[condition[1]].classList.add('win');// add the 'win' class
      boxs[condition[2]].classList.add('win');// add the 'win' class
    }
  }

  if(isWon){
    statusTxt.textContent=`${player} Won..`;
    running=false;
  }else if(!options.includes("")){ //if there is no space in box
    statusTxt.textContent=`Game Draw..!`;
    running=false;
  }else{
    changePlayer();
  }

}

function restartGame(){
  options=["","","","","","","","",""];
  currentPlayer=x;
  player="X";
  running=true;
  statusTxt.textContent=`${player} Your Turn`;

  boxs.forEach(box=>{  // remove the images by using forEach
      box.innerHTML="";
      box.classList.remove('win'); // remove the 'win' class
  });
}
