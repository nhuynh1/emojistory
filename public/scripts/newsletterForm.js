"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function MinimizableDialog(minButton, dialog) {
  this._minButton = minButton;
  this._dialog = dialog;

  this._minButton.setAttribute('aria-expanded', 'true');

  this._minButton.setAttribute('aria-controls', this._dialog.id);

  this._minButton.addEventListener('click', this.toggleMinimize.bind(this));
}

MinimizableDialog.prototype.toggleMinimize = function () {
  var isExpanded = this._minButton.getAttribute('aria-expanded') === 'true';

  this._minButton.setAttribute('aria-expanded', !isExpanded);
};

var newsletterDialog = new MinimizableDialog(document.querySelector('.newsletter-form__minimize'), document.querySelector('.newsletter-dialog'));
var form = document.querySelector('#subscribeMC');
form.addEventListener('submit', subscribe);

function subscribe(e) {
  e.preventDefault();
  var status = document.querySelector('.form-status');
  fetch(form.action, {
    method: form.method,
    body: "email=".concat(form.email.value.trim())
  }).then(function (response) {
    return response.json();
  }).then(function (json) {
    if (json.emailAdded) {
      form.reset();

      _toConsumableArray(form.children).forEach(function (element) {
        element.style.display = "none";
      });

      status.style.display = "block";
      status.textContent = 'Please check your email to confirm your subscription';
    } else {
      status.innerHTML = 'Your email address is already on our notification list. If you previously unsubscribed or have not received an email to confirm your subscription please try <a href="http://eepurl.com/g46HIr">signing up directly on Mailchimp</a>';
    }
  });
}