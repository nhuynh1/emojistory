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
