'use strict';
//-------------------------------------------------
// DOM SELECTIONS
//-------------------------------------------------
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

//-------------------------------------------------
// MODAL WINDOW
//-------------------------------------------------

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//-------------------------------------------------
// PAGE NAVIGATION
//-------------------------------------------------

//Using event delegation
document.querySelector('.nav').addEventListener('click', function(event){
  event.preventDefault();

  // Check if the clicked element is a nav link
  if(event.target.classList.contains('nav__link')){
    const id = event.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//-------------------------------------------------
// BUTTON SCROLLING
//-------------------------------------------------

btnScrollTo.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: 'smooth' });
});

btnScrollTo.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: 'smooth' });
});

//-------------------------------------------------
// TABBED COMPONENT
//-------------------------------------------------

tabsContainer.addEventListener('click', function (e) {
  //This is not useful as we also want to click on the span element not just the button
  //const clicked = event.target; 

  //What we want is to trigger the event regardless of us clicking on the parent (button) or child (span)
  const clicked = e.target.closest('.operations__tab');

  //Guard clause
  if (!clicked) return;

  //Remove active classes
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabsContent.forEach(content => content.classList.remove('operations__content--active'));

  //Activate tab
  clicked.classList.add('operations__tab--active');

  //Activate content area
  //What we are doing here is changing the content based on the selerced tab
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//-------------------------------------------------
// MENU FADE ANIMATION
//-------------------------------------------------

//We will use the nav class because we not only want to include the menu, but also the logo
//Why not mouseEnter? Because mouseEnter doesn't bubble up
//We need the event bubble so that it can reach the nav element

const handleHover = function(event, opacity){
 if(event.target.classList.contains('nav__link')){
    //We need to select the siblings (all the other links) & the logo
    const link = event.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('.nav__logo');

    //We now trigger our functionality based on the link and its siblings
    siblings.forEach(element => {
      if(element !== link) element.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
};

nav.addEventListener('mouseover', function(event){
  handleHover(event, 0.5);
});

nav.addEventListener('mouseout', function(event){
  handleHover(event, 1);
});