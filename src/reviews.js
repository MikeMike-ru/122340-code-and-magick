'use strict';

var reviews = [];
var invisibleFilter = document.querySelector('.reviews-filter');
var reviewTemplate = document.getElementById('review-template');
var reviewBlock = document.querySelector('.reviews');
var reviewsContainer = document.querySelector('.reviews-list');
var starsArray = [
  'review-rating-one',
  'review-rating-two',
  'review-rating-three',
  'review-rating-four',
  'review-rating-five'
];
var elementToClone;
var REVIEWS_URL = 'http://o0.github.io/assets/json/reviews.json';

if ('content' in reviewTemplate) {
  elementToClone = reviewTemplate.content.querySelector('.review');
} else {
  elementToClone = reviewTemplate.querySelector('.review');
  reviewTemplate.classList.add('invisible');
}

invisibleFilter.classList.add('invisible');

var getReviewElement = function(data) {
  var element = elementToClone.cloneNode(true);
  element.querySelector('.review-text').textContent = data.description;
  element.querySelector('.review-rating').classList.add(starsArray[+data.rating - 1]);

  var authorImage = new Image();

  authorImage.onload = function() {
    var authorBoth = element.querySelector('.review-author');
    authorBoth.src = data.author.picture;
    authorBoth.width = '124';
    authorBoth.height = '124';
  };

  authorImage.onerror = function() {
    element.classList.add('review-load-failure');
  };

  authorImage.src = data.author.picture;

  reviewsContainer.appendChild(element);
};

var getReviews = function(callback) {
  var xhr = new XMLHttpRequest();

  xhr.onprogress = function() {
    reviewBlock.classList.add('reviews-list-loading');
  };

  xhr.onload = function(evt) {
    reviewBlock.classList.remove('reviews-list-loading');
    var loadedData = JSON.parse(evt.target.response);
    callback(loadedData);
  };

  xhr.onerror = function() {
    reviewBlock.classList.remove('reviews-list-loading');
    reviewBlock.classList.add('reviews-load-failure');
  };

  xhr.open('GET', REVIEWS_URL);
  xhr.send();
};

var renderReviews = function(loadedReviews) {
  reviews = loadedReviews;
  reviews.forEach(function(review) {
    getReviewElement(review);
  });
};

var loadReviewsCallback = function(reviewsList) {
  renderReviews(reviewsList);
};

getReviews(loadReviewsCallback);

invisibleFilter.classList.remove('invisible');


