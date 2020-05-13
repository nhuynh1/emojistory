const navToggle = document.querySelector('.nav-toggle');
const menu = document.querySelector('.menu');
const modalOverlay = document.querySelector('.modal-overlay');

document.querySelector('body').classList.add('js');

navToggle.setAttribute('aria-expanded', 'false');
menu.style.display = 'none';

navToggle.addEventListener('click', (e) => {
  let expanded = e.target.getAttribute('aria-expanded') === 'true' || false;
  
  if(expanded) {
    menu.style.display = 'flex';
     modalOverlay.style.display = 'block';
  }
  e.target.setAttribute('aria-expanded', !expanded);
//  menu.setAttribute('hidden', !expanded);
//  if(navToggle.getAttribute('aria-expanded') === 'true'){
//    menu.setAttribute('aria-expanded', 'false');
//    document.querySelector('body').style.overflowY = 'visible';
//  }
//  else {
//    menu.setAttribute('aria-expanded', 'true');
//    modalOverlay.style.display = 'block';
//    document.querySelector('body').style.overflowY = 'hidden';
//    
//    //https://css-tricks.com/prevent-page-scrolling-when-a-modal-is-open/
//  }
});

// keyboard trap
// hide everything else from screen reader

// disable scrolling

modalOverlay.addEventListener('click', (e) =>{
  e.target.style.display = 'none';
  menu.setAttribute('aria-expanded', 'false');
  document.querySelector('body').style.overflowY = 'visible';
})