function getRandomColor() {
  const chars = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += chars[Math.floor(Math.random() * 16)];
  }
  return color;
}

//click and dblclick
const pTags = document.querySelectorAll('p');

for(let i = 0; i < pTags.length; i++){
  pTags[i].addEventListener('click', e => {
    e.preventDefault();
    pTags[i].style.color = getRandomColor();
  })
}

//pTags.forEach((pTag, index)=>{
//  pTag.addEventListener('click', e => {
//    e.preventDefault();
//    pTag.style.color = getRandomColor();
//  })
//})

//mouseover && mouseout
const links = document.querySelectorAll('.nav-link');
/*
//Will make everything in document that we mouseover 2rem
document.addEventListener('mouseover', event => {
  event.target.style.fontSize = "2rem";
})
*/
links.forEach(link => {
  link.addEventListener('mouseover', event => {
    event.target.style.fontSize = "2rem";
  })
  
  link.addEventListener('mouseout', () => {
    link.style.fontSize = "1.6rem";
  })
});

//keydown
const outputBox = document.createElement('p')

document.querySelector('body').append(outputBox);

document.addEventListener('keydown', event => {
  if(event.which === 68){
    alert("You hit D")
  }
  outputBox.textContent += `${event.key}`
});

const pics = document.querySelectorAll('img');
let blur = 0;
let lastKnownPosition = 0;

window.addEventListener('scroll', event => {
  if(lastKnownPosition < window.scrollY){
    blur += 1
  }
  else{
    blur -= 1
  }
  lastKnownPosition = window.scrollY;

  pics.forEach(pic => pic.style.filter = `blur(${blur}px)`);
});

let dragged;
pTags.forEach(pTag => {
  pTag.draggable = true;
  pTag.classList.add('dropzone');
})

/* events fired on the draggable target */
document.addEventListener("dragstart", function(event) {
  // store a ref. on the dragged elem
  dragged = event.target;
  // make it half transparent
  event.target.style.opacity = .5;
});

document.addEventListener("dragend", function(event) {
  // reset the transparency
  event.target.style.opacity = "";
});

/* events fired on the drop targets */
document.addEventListener("dragover", function(event) {
  // prevent default to allow drop
  event.preventDefault();
});

document.addEventListener("dragenter", function(event) {
  // highlight potential drop target when the draggable element enters it
  if (event.target.className == "dropzone") {
    event.target.style.background = "lightBlue";
  }
});

document.addEventListener("dragleave", function(event) {
  // reset background of potential drop target when the draggable element leaves it
  if (event.target.className == "dropzone") {
    event.target.style.background = "";
  }
});

document.addEventListener("drop", function(event) {
  // prevent default action (open as link for some elements)
  event.preventDefault();
  // move dragged elem to the selected drop target
  if (event.target.className == "dropzone") {
    event.target.style.background = "";
    //dragged.parentNode is the place where we dragged the p tag from
    //we are removing the ptag from that place and adding the ptag we are dropping on to the original place
    console.log(event.target.textContent) 
    let temp = dragged.textContent 
    dragged.textContent = event.target.textContent;
    event.target.textContent = temp;
  }
});
