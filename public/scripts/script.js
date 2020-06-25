"use strict";

document.querySelector('body').classList.add('js'); // JavaScript loaded

var keyboard = {
  tab: 9,
  escape: 27
};
var contentWrapper = document.querySelector('.wrapper');
var modalOverlay = document.querySelector('.modal-overlay');
var nav = document.querySelector('.primary-nav');
var navToggle = nav.querySelector('.nav-toggle');
var menu = nav.querySelector('.menu');
var closeButton = menu.querySelector('.close-button');
var focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
var focusableElements = menu.querySelectorAll(focusableElementsString);
var firstTabStop = focusableElements[0];
var lastTabStop = focusableElements[focusableElements.length - 1];
navToggle.setAttribute('aria-expanded', 'false');
navToggle.addEventListener('click', function (e) {
  var expanded = e.target.getAttribute('aria-expanded') === 'true' || false;

  if (!expanded) {
    openMenu(e);
  } else {
    closeMenu();
  }
});

function openMenu(e) {
  contentWrapper.setAttribute('aria-hidden', 'true'); // hide rest of page from screen reader

  document.body.style.top = "-".concat(window.scrollY, "px");
  menu.style.top = " ".concat(window.scrollY, "px");
  document.body.classList.add('menu-open');
  navToggle.setAttribute('aria-expanded', 'true');
  firstTabStop.focus();
  menu.addEventListener('keydown', trapTabKey);

  function trapTabKey(e) {
    if (e.keyCode === keyboard.tab) {
      // SHIFT + TAB
      if (e.shiftKey) {
        if (document.activeElement === firstTabStop) {
          e.preventDefault();
          lastTabStop.focus();
        } // TAB

      } else {
        if (document.activeElement === lastTabStop) {
          e.preventDefault();
          firstTabStop.focus();
        }
      }
    } // ESCAPE


    if (e.keyCode === keyboard.escape) {
      closeMenu();
    }
  }
}

function closeMenu() {
  var scrollY = document.body.style.top;
  navToggle.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
  document.body.style.top = '';
  window.scrollTo(0, parseInt(scrollY || '0') * -1); // ensures we return to same scroll position

  contentWrapper.removeAttribute('aria-hidden'); // ensure screen reader reads page

  navToggle.focus();
}

modalOverlay.addEventListener('click', closeMenu);
closeButton.addEventListener('click', closeMenu);