'use strict';

var invisibleFilter = document.querySelector('.reviews-filter');
var reviewTemplate = document.getElementById('review-template');
var reviewsContainer = document.querySelector('.reviews-list');
var elementToClone;

if ('content' in reviewTemplate) {
  elementToClone = reviewTemplate.content.querySelector('.review');
} else {
  elementToClone = reviewTemplate.querySelector('.review');
  reviewTemplate.classList.add('invisible');
}

invisibleFilter.classList.add('invisible');

var getReview = function(data, container) {
  var element = elementToClone.cloneNode(true);
  container.appendChild(element);
  element.querySelector('.review-text').textContent = data.description;

  var authorImage = new Image();

  authorImage.onload = function() {
    element.querySelector('.review-author').src = data.author.picture;
    element.querySelector('.review-author').width = '124';
    element.querySelector('.review-author').height = '124';
  };

  authorImage.onerror = function() {
    element.classList.add('review-load-failure');
  };

  authorImage.src = data.author.picture;

  return element;
};

window.reviews.forEach(function(review) {
  getReview(review, reviewsContainer);
});

invisibleFilter.classList.remove('invisible');

