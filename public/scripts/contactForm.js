"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

window.addEventListener("DOMContentLoaded", function () {
  var $form = document.getElementById("contact-form");
  var $button = $form.querySelector('button[type="submit"]');
  var $status = document.querySelector('.contact .form-status'); // message for submit success/error

  var $errors = document.querySelector('.contact .form-errors'); // message for client-side form validation

  var $errorsList = $errors.querySelector('ul'); // successful form submission function

  function success() {
    $form.reset();
    $button.style = "display: none ";
    $form.style = "display: none ";
    $status.innerHTML = "Thanks for your message!";
  } // error in submission to formspree.io function


  function error() {
    // error in form submission to formspree.io
    $status.innerHTML = "Oops! There was a problem sending your message. Feel free to email me instead at emojistory@gmail.com";
  } // show errors for client-side validation


  function showError(field) {
    // helper to create error items
    function createErrorLinkItem(text) {
      var listItem = document.createElement('li');
      var anchor = document.createElement('a');
      anchor.href = "#".concat(field.name);
      anchor.textContent = text;

      anchor.onclick = function () {
        field.focus();
      };

      listItem.appendChild(anchor);
      return listItem;
    }

    if (field.validity.valueMissing) {
      // nothing in field
      var listItem = createErrorLinkItem("The ".concat(field.title, " is empty; it is a required field and must be filled in"));
      $errorsList.appendChild(listItem);
    } else if (field.validity.typeMismatch) {
      // not the correct type
      var _listItem = createErrorLinkItem("The ".concat(field.title, " field is in the wrong format"));

      $errorsList.appendChild(_listItem);
    }

    field.classList.add('error');
  } // handle the form submission event


  $form.addEventListener("submit", function (e) {
    e.preventDefault(); // get all required fields and remove the error class (if set)

    var requiredFields = _toConsumableArray($form.querySelectorAll("[required]")).map(function (field) {
      field.classList.remove('error');
      return field;
    });

    $errorsList.innerHTML = ''; // clear out errors list
    // get all required fields with validation errors

    var errorFields = requiredFields.filter(function (field) {
      return !field.validity.valid;
    }); // show errors if they exist

    if (errorFields.length > 0) {
      var heading = document.createElement('h3');
      heading.textContent = "There ".concat(errorFields.length === 1 ? "is" : "are", " ").concat(errorFields.length, " error").concat(errorFields.length === 1 ? "" : "s", " in this form");
      errorFields.forEach(showError);
      return; // do not continue submission if there are errors
    }

    var data = new FormData($form); // data for AJAX request

    ajax($form.method, $form.action, data, success, error); // send AJAZ request to formspree.io
    //      success(); // simulate success
  });
}); // helper function for sending an AJAX request

function ajax(method, url, data, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader("Accept", "application/json");

  xhr.onreadystatechange = function () {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;

    if (xhr.status === 200) {
      success(xhr.response, xhr.responseType);
    } else {
      error(xhr.status, xhr.response, xhr.responseType);
    }
  };

  xhr.send(data);
}