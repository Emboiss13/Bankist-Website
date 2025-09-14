'use strict';

//Using JS events

const h1 = document.querySelector('h1');

// h1.onmouseover = function() {
//   this.style.color = 'red';
// };

// h1.onmouseout = function() {
//   this.style.color = 'black';
// };

// h1.onmousemove = function(e){
//     alert(`onmousemove: Great`)
// };


// //Creating a random colour
// //Understanding Events in JS

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const randomColour = () => `rgb(${randomInt(0,255)}, ${randomInt(0,255)}, ${randomInt(0,255)})`;

document.querySelector('.nav__link').addEventListener('click', function(event){
    this.style.backgroundColor = randomColour();
    console.log('LINK', event.target);
});

document.querySelector('.nav__links').addEventListener('click', function(event){
    this.style.backgroundColor = randomColour();
    console.log('CONTAINER', event.target);
});

document.querySelector('.nav').addEventListener('click', function(event){
    this.style.backgroundColor = randomColour();
    console.log('NAV', event.target);
});