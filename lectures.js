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

// const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// const randomColour = () => `rgb(${randomInt(0,255)}, ${randomInt(0,255)}, ${randomInt(0,255)})`;

// document.querySelector('.nav__link').addEventListener('click', function(event){
//     this.style.backgroundColor = randomColour();
//     console.log('LINK', event.target);
// });

// document.querySelector('.nav__links').addEventListener('click', function(event){
//     this.style.backgroundColor = randomColour();
//     console.log('CONTAINER', event.target);
// });

// document.querySelector('.nav').addEventListener('click', function(event){
//     this.style.backgroundColor = randomColour();
//     console.log('NAV', event.target);
// });


//Traversing the DOM

// Going downwards: child
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
console.log(h1.firstElementChild);
console.log(h1.lastElementChild);

// Going upwards: parent
console.log(h1.parentNode);
console.log(h1.parentElement);
h1.closest('.header').style.background = 'var(--gradient-secondary)'; //This allows us to select the closest ancestor element with the class 'header'

// Going sideways: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);
console.log(h1.previousSibling);
console.log(h1.nextSibling);

//if we need all the siblings
console.log(h1.parentNode.children);
console.log(h1.parentElement.children);