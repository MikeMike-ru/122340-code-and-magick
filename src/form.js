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
  var browserCookies = require('browser-cookies');
  formName.setAttribute('required', 'required');
  formName.value = browserCookies.get('name');
  formMarks.value = browserCookies.get('marks');

  var calculateExpire = function() {
    var currentDate = new Date();
    var getCurrentYear = currentDate.getFullYear();
    var birthDate = new Date(getCurrentYear, 8, 20);
    var minusOneYear = new Date(getCurrentYear - 1, 8, 20);
    var a = currentDate - minusOneYear;
    if (currentDate > birthDate) {
      a = birthDate - currentDate;
    }
    return a;
  };

  var result = calculateExpire();
  var cookieExpire = Math.ceil(result / 1000 / 60 / 60 / 24);

  var formValidation = function() {
    var isNameValid = formName.value.length !== 0;
    var isTextValid = formText.value.length !== 0 || formMarks.value > 2;
    labelBoth.classList.toggle('invisible', isNameValid && isTextValid);
    labelName.classList.toggle('invisible', isNameValid);
    labelText.classList.toggle('invisible', isTextValid);
    submitButton.disabled = !(isNameValid && isTextValid);
  };

  var setRequired = function() {
    if (formMarks.value < 3) {
      formText.setAttribute('required', 'required');
    } else {
      formText.removeAttribute('required');
    }
  };

  for (var i = 0; i < formMarks.length; i++) {
    formMarks[i].onchange = function() {
      setRequired();
      formValidation();
    };
  }

  formName.oninput = function() {
    formValidation();
  };

  formText.oninput = function() {
    formValidation();
  };

  reviewForm.onsubmit = function() {
    browserCookies.set('name', formName.value, {expires: cookieExpire});
    browserCookies.set('marks', formMarks.value, {expires: cookieExpire});
    reviewForm.submit();
  };

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };

  formValidation();
})();
