const colorBtn = document.getElementById('color');
const resetBtn = document.getElementById('reset');
const blackBtn = document.getElementById('black');
const submitBtn = document.getElementById('submit-button');
const removeGridBtn = document.getElementById('remove-grid');
const pixelInput = document.getElementById('pixel-input');
let gridContainer = document.querySelector('.grid-container');
let gridItem;
let totalNoSquares = 256;
let usersquareValue;
let newflexbasis;
let isDrawing = false;


function generateGrid() {
  gridContainer.innerHTML = "";
  
  for (let i = 1; i <= totalNoSquares; i++) {
    gridItem = document.createElement("div");
    gridItem.classList.add('grid-item')
    gridContainer.appendChild(gridItem);
  }
  addMouseEvent();
}


function getUserValue() {
  usersquareValue = pixelInput.value;
  let warningText = document.getElementById('warning-text');
  if(usersquareValue == null || usersquareValue < 1 || usersquareValue > 64){
    
    warningText.textContent = "Please enter a value from 1 to 64";
    
  }
  else{
    warningText.textContent = `The selected pixel size is ${usersquareValue}`;
  } 
  totalNoSquares = usersquareValue * usersquareValue;
  generateGrid();
  flexbasis();
}


function flexbasis(){
  newflexbasis = 500 / usersquareValue + "px";
  let gridItems = document.querySelectorAll('.grid-item');
  gridItems.forEach(gridItem => {
    gridItem.style.flexBasis = newflexbasis;
  })
}

function gridlines(){
  let gridItems = document.querySelectorAll('.grid-item');
  gridItems.forEach(gridItem => {
    gridItem.classList.toggle('no-border');
  })
  
}

function addMouseEvent () {
  let gridItems = document.querySelectorAll('.grid-item');
  gridItems.forEach(gridItem => {
  gridItem.addEventListener('mousedown',(e) => {
    isDrawing = true;
    setBlackColour(e);
    });
    gridItem.addEventListener('mouseup', (e) => isDrawing=false)
    gridItem.addEventListener('mousemove', (e) => {
      if(isDrawing){
        setBlackColour(e);
      }
    })
  })
  }


 function setColors(){
  let gridItems = document.querySelectorAll('.grid-item');
  gridItems.forEach(gridItem => {
    gridItem.removeEventListener('mousedown',(e) => {
      isDrawing = true;
      setBlackColour(e);
      });
      gridItem.removeEventListener('mouseup', (e) => isDrawing=false)
      gridItem.removeEventListener('mousemove', (e) => {
        if(isDrawing){
          setBlackColour(e);
        }
      })
      gridItem.addEventListener('mousedown',(e) => {
        isDrawing = true;
        setRandomColour(e);
        });
        gridItem.addEventListener('mouseup', (e) => isDrawing=false)
        gridItem.addEventListener('mousemove', (e) => {
          if(isDrawing){
            setRandomColour(e);
          }
        })
    })
 } 

 function setToBlack(){
  let gridItems = document.querySelectorAll('.grid-item');
  gridItems.forEach(gridItem => {
    gridItem.removeEventListener('mousedown',(e) => {
      isDrawing = true;
      setRandomColour(e);
      });
      gridItem.removeEventListener('mouseup', (e) => isDrawing=false)
      gridItem.removeEventListener('mousemove', (e) => {
        if(isDrawing){
          setRandomColour(e);
        }
      })
      gridItem.addEventListener('mousedown',(e) => {
        isDrawing = true;
        setBlackColour(e);
        });
        gridItem.addEventListener('mouseup', (e) => isDrawing=false)
        gridItem.addEventListener('mousemove', (e) => {
          if(isDrawing){
            setBlackColour(e);
          }
        })
    })
 }

function setRandomColour(e){
 e.target.style.backgroundColor = random_rgb();
}

function setBlackColour(e){
  e.target.style.backgroundColor = 'black';
}


function gridReset (){
  let gridItems = document.querySelectorAll('.grid-item');
  gridItems.forEach(gridItem => {
    gridItem.style.backgroundColor = 'white';
  })
}

submitBtn.addEventListener('click',getUserValue);
pixelInput.addEventListener('keydown',e => {
  if(e.code == 'Enter'){
    getUserValue();
  }
  else return;
});
removeGridBtn.addEventListener('click',gridlines);
resetBtn.addEventListener('click',gridReset);
colorBtn.addEventListener('click',setColors);
blackBtn.addEventListener('click',setToBlack);
generateGrid();
addMouseEvent();


function random_rgb() {
  let o = Math.round, r = Math.random, s = 255;
  return 'rgb(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ')';
}
