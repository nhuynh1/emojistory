document.querySelector('body').classList.add('js'); // JavaScript loaded

const keyboard = {
  tab: 9,
  escape: 27
}

const contentWrapper = document.querySelector('.wrapper');
const modalOverlay = document.querySelector('.modal-overlay');
const nav = document.querySelector('.primary-nav');
const navToggle = nav.querySelector('.nav-toggle');
const menu = nav.querySelector('.menu');

const focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';

const focusableElements = menu.querySelectorAll(focusableElementsString);
const firstTabStop = focusableElements[0];
const lastTabStop = focusableElements[focusableElements.length - 1];

navToggle.setAttribute('aria-expanded', 'false');

navToggle.addEventListener('click', (e) => {
  let expanded = e.target.getAttribute('aria-expanded') === 'true' || false;

  if(!expanded) {
    openMenu(e);
  } else {
    closeMenu();
  }
});
  
function openMenu(e) {
    navToggle.setAttribute('aria-expanded', 'true');
    modalOverlay.style.display = 'block';
    contentWrapper.setAttribute('aria-hidden', 'true');
    document.querySelector('body').style.overflowY = 'hidden';
    firstTabStop.focus();
    menu.addEventListener('keydown', trapTabKey);

  function trapTabKey(e) {
    if(e.keyCode === keyboard.tab) {
      // SHIFT + TAB
      if (e.shiftKey) {
        if (document.activeElement === firstTabStop) {
          e.preventDefault();
          lastTabStop.focus();
        }
      // TAB
      } else {
        if (document.activeElement === lastTabStop) {
          e.preventDefault();
          firstTabStop.focus();
        }
      }
    }
    // ESCAPE
    if(e.keyCode === keyboard.escape) {
      closeMenu();
    }
  }
}

function closeMenu() {
  navToggle.setAttribute('aria-expanded', 'false');
  modalOverlay.style.display = 'none';
  document.querySelector('body').style.overflowY = 'visible';
  contentWrapper.removeAttribute('aria-hidden');
  navToggle.focus();
}

modalOverlay.addEventListener('click', (e) =>{
  closeMenu();
});

document.addEventListener('focus', (e) => {
  let win = {
    top: window.pageYOffset, 
    bottom: window.pageYOffset + window.innerHeight
  };
  
  let el = {
    top: window.pageYOffset + e.target.getBoundingClientRect().top, 
    bottom: window.pageYOffset + e.target.getBoundingClientRect().top + e.target.getBoundingClientRect().height
  };
  
  if(el.top < win.top || el.bottom + 70 > win.bottom)
    e.target.scrollIntoView();
}, true)