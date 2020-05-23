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
    contentWrapper.setAttribute('aria-hidden', 'true'); // hide rest of page from screen reader
    document.body.style.top = `-${window.scrollY}px`;
    menu.style.top = ` ${window.scrollY}px`;
    document.body.classList.add('menu-open');
    navToggle.setAttribute('aria-expanded', 'true');
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
  const scrollY = document.body.style.top;
  navToggle.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
  document.body.style.top = '';
  window.scrollTo(0, parseInt(scrollY || '0') * -1); // ensures we return to same scroll position
  contentWrapper.removeAttribute('aria-hidden'); // ensure screen reader reads page
  navToggle.focus();
}

modalOverlay.addEventListener('click', closeMenu);



function MinimizableDialog(minButton, dialog) {
  this._minButton = minButton;
  this._dialog = dialog;
  
  this._minButton.setAttribute('aria-expanded', 'true');
  this._minButton.setAttribute('aria-controls', this._dialog.id)
  this._minButton.addEventListener('click', this.toggleMinimize.bind(this));
}

MinimizableDialog.prototype.toggleMinimize = function() {
  let isExpanded = this._minButton.getAttribute('aria-expanded') === 'true';
  this._minButton.setAttribute('aria-expanded', !isExpanded);
  
  // if we're expanding then set focus to the dialog
}

//let newsletterDialog = new MinimizableDialog(
//                          document.querySelector('.newsletter-form__minimize'),
//                          document.querySelector('.newsletter-dialog'));


  window.addEventListener("DOMContentLoaded", function() {

    // get the form elements defined in your form HTML above
    
    var form = document.getElementById("contact-form");
//    var button = document.getElementById("my-form-button");
//    var status = document.getElementById("my-form-status");
    var button = document.querySelector('.contact-form__submit');
    var status = document.querySelector('.contact-form-status');
    
    console.log({form, button, status})
    
    // Success and Error functions for after the form is submitted
    
    function success() {
      form.reset();
      button.style = "display: none ";
      form.style = "display: none ";
      status.innerHTML = "Thanks for your message!";
    }

    function error() {
      status.innerHTML = "Oops! There was a problem sending your message. Feel free to email me emojistory@gmail.com";
    }

    // handle the form submission event

    form.addEventListener("submit", function(ev) {
      ev.preventDefault();
      
      // field validations needed
      
      var data = new FormData(form);
//      console.log({data, method: form.method, action: form.action, success, error});
//      ajax(form.method, form.action, data, success, error);
      error();
    });
  });
  
  // helper function for sending an AJAX request

  function ajax(method, url, data, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        success(xhr.response, xhr.responseType);
      } else {
        error(xhr.status, xhr.response, xhr.responseType);
      }
    };
    xhr.send(data);
  }


//const minimizeDialog = document.querySelector('.newsletter-form__minimize');
//minimizeDialog.setAttribute('aria-expanded', 'true');
//
//minimizeDialog.addEventListener('click', (e) => {
//  let toggleOpen = e.target.getAttribute('aria-expanded') === 'true';
//  
//  if(toggleOpen) {
//    e.target.setAttribute('aria-label', 'expand newsletter signup form');
//    document.querySelector('.newsletter-form').style.height = '0px';
//  document.querySelector('.newsletter-form').style.padding = '0px';
//  } else  {
//    e.target.setAttribute('aria-label', 'minimize newsletter signup form');
//    document.querySelector('.newsletter-form').style.height = '70px';
//  document.querySelector('.newsletter-form').style.padding = '15px';
//  }
//  
//  minimizeDialog.setAttribute('aria-expanded', !toggleOpen);
//  
//  
//  
//})


//document.addEventListener('focus', (e) => {
//  let win = {
//    top: window.pageYOffset, 
//    bottom: window.pageYOffset + window.innerHeight
//  };
//  
//  let el = {
//    top: window.pageYOffset + e.target.getBoundingClientRect().top, 
//    bottom: window.pageYOffset + e.target.getBoundingClientRect().top + e.target.getBoundingClientRect().height
//  };
//  
//  if(el.top < win.top || el.bottom + 70 > win.bottom)
//    e.target.scrollIntoView();
//}, true)