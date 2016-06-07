'use strict';

(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');
  var reviewForm = document.querySelector('.review-form');
  var reviewMark = reviewForm.elements['review-mark'];
  var reviewFormGroupMark = document.querySelector('.review-form-group-mark');
  var reviewText = reviewForm.elements['review-text'];
  var reviewName = reviewForm.elements['review-name'];
  var reviewSubmit = document.querySelector('.review-submit');
  var labelName = document.querySelector('.review-fields-name');
  var labelText = document.querySelector('.review-fields-text');
  var reviewFields = document.querySelector('.review-fields');

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  reviewFormGroupMark.onchange = function() {
    if (reviewMark.value < 3) {
      reviewText.setAttribute('required', 'required');
    } else {
      reviewText.removeAttribute('required');
    }
  };

  console.log(reviewText.validity.valid);
  console.log(typeof reviewText);
  console.log(reviewName.validity.valid);


  var validateForm = function(formInput, formLabel) {
    if (formInput.validity.valid) {
      formLabel.classList.add('invisible');
    } else {
      formLabel.classList.remove('invisible');
    }
  };

  var disableSubmit = function() {
    if (reviewName && reviewText) {
      reviewSubmit.removeAttribute('disabled', 'disabled');
    } else {
      reviewSubmit.setAttribute('disabled', 'disabled');
    }
  };

  reviewName.oninput = function() {
    validateForm(reviewName, labelName);
    disableSubmit();
  };

  reviewText.oninput = function() {
    validateForm(reviewText, labelText);
    disableSubmit();
  };


  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };
})();
