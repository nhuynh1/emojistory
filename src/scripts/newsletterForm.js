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
}

let newsletterDialog = new MinimizableDialog(
                          document.querySelector('.newsletter-form__minimize'),
                          document.querySelector('.newsletter-dialog'));

const form = document.querySelector('#subscribeMC');

form.addEventListener('submit', subscribe);

function subscribe(e) {
  e.preventDefault();
  const status = document.querySelector('.form-status');
  fetch(form.action, {
    method: form.method,
    body: `email=${form.email.value.trim()}`
  })
    .then(response => response.json())
    .then(json => {
      if(json.emailAdded) {
        form.reset();
        [...form.children].forEach(element => {
          element.style.display = "none";
        })
        status.style.display = "block";
        status.textContent = 'Please check your email to confirm your subscription';
      }
      else {
        status.innerHTML = 'Your email address is already on our notification list. If you previously unsubscribed or have not received an email to confirm your subscription please try <a href="http://eepurl.com/g46HIr">signing up directly on Mailchimp</a>';
      }
  })
}