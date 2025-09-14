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
const allSections = document.querySelectorAll('.section');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const imgTargets = document.querySelectorAll('img[data-src]');

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

//-------------------------------------------------
// STICKY NAVIGATION BAR
//-------------------------------------------------

const initialCoordinates = section1.getBoundingClientRect();

//WE SHOULD AVOID THE SCROLL EVENT SINCE IT TRIGGERS MULTIPLE TIMES
//This is very bad for performance, specially on mobile devices

// //We make it "sticky" by adding the "nav sticky" CSS class
// window.addEventListener('scroll', function(){
//   if(window.scrollY > initialCoordinates.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

//We will now do this using the intersection observer API
//Why? Because it is more efficient.
//It allows us to observe changes in the intersection of a target element with an ancestor element or with a top-level document's viewport.

/*This funtion will be called each time:
                 observer element -> intersects:
                                       -> root element at defined threshold
*/

const stickyNav = function(entries){
  const [entry] = entries;
  if(!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: [0, 0.2],
  rootMargin: '-90px',
});

headerObserver.observe(header);

//-------------------------------------------------
// REVEAL ELEMENTS AS WE SCROLL CLOSE TO THEM
//-------------------------------------------------

//We will achieve this by removing the section--hidden class
const revealSection = function(entries, observer){

  entries.forEach(entry => {
    if(!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');

      //Stop observing the element
    //This will improve performance
    observer.unobserve(entry.target);
  });
};

//We don't want to reveal the section straight away
//Otherwise the effect is not visible
//By having a 0.15 threshold, we can control when the section is revealed
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(section => {
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});

//-------------------------------------------------
// LAZY LOADING IMAGES
//-------------------------------------------------

//We use the "lazy-img" CSS class to apply a blur filter on the low quality image
//We do this so that we cannot actually see the bad image quality and we get more of a "preview" look

//We are not lazy loading all images, only the ones that have the property [data-src]
const loadImg = function(entries, observer) {
  const [entry] = entries;
  if(!entry.isIntersecting) return;

  //Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  //Check for loaded event
  //This is important because if we remove the lazy loading before the image is loaded then we defeat the purpose of this function
  //Note: You can simulate low quality networks using the network section of the inspection tools
  entry.target.addEventListener('load', function(){
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg,{
  root: null,
  threshold: 0,
});

imgTargets.forEach(img => imgObserver.observe(img));