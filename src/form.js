'use strict';

(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');
  var reviewForm = document.querySelector('.review-form');
  var formMarks = reviewForm.elements['review-mark'];
  var formName = reviewForm.elements['review-name'];
  var formText = reviewForm.elements['review-text'];
  var labelBoth = document.querySelector('.review-fields');
  var labelName = labelBoth.querySelector('.review-fields-name');
  var labelText = labelBoth.querySelector('.review-fields-text');
  var submitButton = document.querySelector('.review-submit');
  formName.setAttribute('required', 'required');

  var setDisabled = function() {
    if (formText.hasAttribute('required') && formText.value) {
      submitButton.removeAttribute('disabled');
    } else if (formText.value) {
      submitButton.removeAttribute('disabled');
    } else {
      submitButton.setAttribute('disabled', 'disabled');
    }
    if (formName.value) {
      submitButton.removeAttribute('disabled');
    } else {
      submitButton.setAttribute('disabled', 'disabled');
    }
  };

  var setInvisible = function() {
    if (formName.value && formText.value) {
      labelBoth.classList.add('invisible');
      submitButton.removeAttribute('disabled');
    } else {
      labelBoth.classList.remove('invisible');
      submitButton.setAttribute('disabled', 'disabled');
    }
    if (formName.value) {
      labelName.classList.add('invisible');
    } else {
      labelName.classList.remove('invisible');
    }
    if (formText.value) {
      labelText.classList.add('invisible');
    } else {
      labelText.classList.remove('invisible');
    }
  };

  var setRequired = function() {
    for (var i = 0; i < formMarks.length; i++) {
      if (formMarks[i].checked) {
        if (formMarks[i].value <= 2) {
          formText.setAttribute('required', 'required');
        } else {
          formText.removeAttribute('required');
        }
      }
    }
  };

  for (var i = 0; i < formMarks.length; i++) {
    formMarks[i].onchange = function() {
      setRequired();
      setDisabled();
    };
  }

  formName.oninput = function() {
    setInvisible();
    setDisabled();
  };

  formText.oninput = function() {
    setInvisible();
    setDisabled();
  };

  setInvisible();
  setDisabled();

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };
})();
