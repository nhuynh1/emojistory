  window.addEventListener("DOMContentLoaded", function() {
    
    const $form = document.getElementById("contact-form");
    const $button = $form.querySelector('button[type="submit"]');
    const $status = document.querySelector('.contact .form-status'); // message for submit success/error
    const $errors = document.querySelector('.contact .form-errors'); // message for client-side form validation
    const $errorsList = $errors.querySelector('ul');
    
    // successful form submission function
    function success() { 
      $form.reset();
      $button.style = "display: none ";
      $form.style = "display: none ";
      $status.innerHTML = "Thanks for your message!";
    }
    
    // error in submission to formspree.io function
    function error() { // error in form submission to formspree.io
      $status.innerHTML = "Oops! There was a problem sending your message. Feel free to email me instead at emojistory@gmail.com";
    }
    
    // show errors for client-side validation
    function showError(field) {
      
      // helper to create error items
      function createErrorLinkItem(text) {
        let listItem = document.createElement('li');
        let anchor = document.createElement('a');
        anchor.href = `#${field.name}`;
        anchor.textContent = text;
        anchor.onclick = function () {
          field.focus();
        }
        listItem.appendChild(anchor);
        return listItem;
      }
      
      if(field.validity.valueMissing) { // nothing in field
        let listItem = createErrorLinkItem(`The ${field.title} is empty; it is a required field and must be filled in`);
        $errorsList.appendChild(listItem);
      }
      else if(field.validity.typeMismatch) { // not the correct type
        let listItem = createErrorLinkItem(`The ${field.title} field is in the wrong format`);
        $errorsList.appendChild(listItem);
      }
      field.classList.add('error');
    }
    
    // handle the form submission event
    $form.addEventListener("submit", function(e) {
      e.preventDefault();
      
      // get all required fields and remove the error class (if set)
      const requiredFields = [...$form.querySelectorAll("[required]")].map(field => {
        field.classList.remove('error');
        return field;
      });
      $errorsList.innerHTML = ''; // clear out errors list
      
      // get all required fields with validation errors
      let errorFields = requiredFields.filter(field => !field.validity.valid);
      
      // show errors if they exist
      if(errorFields.length > 0) {
        let heading = document.createElement('h3');
        heading.textContent = `There ${errorFields.length === 1 ? "is" : "are"} ${errorFields.length} error${errorFields.length === 1 ? "" : "s"} in this form`
        errorFields.forEach(showError);
        return; // do not continue submission if there are errors
      }
      
      let data = new FormData($form); // data for AJAX request
      // ajax(form.method, form.action, data, success, error); // send AJAZ request to formspree.io
      success(); // simulate success
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