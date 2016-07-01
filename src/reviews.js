'use strict';

var load = require('./xhr');

var reviews = [];
var filteredReviews = [];
var reviewTemplate = document.getElementById('review-template');
var reviewBlock = document.querySelector('.reviews');
var reviewsContainer = document.querySelector('.reviews-list');
var filtersContainer = document.querySelector('.reviews-filter');
var moreReviewsButton = document.querySelector('.reviews-controls-more');
var starsArray = [
  'review-rating-one',
  'review-rating-two',
  'review-rating-three',
  'review-rating-four',
  'review-rating-five'
];
var elementToClone;
var REVIEWS_URL = 'http://o0.github.io/assets/json/reviews.json';
var PAGE_SIZE = 3;
var pageNumber = 0;
var currentId;

if ('content' in reviewTemplate) {
  elementToClone = reviewTemplate.content.querySelector('.review');
} else {
  elementToClone = reviewTemplate.querySelector('.review');
  reviewTemplate.classList.add('invisible');
}

filtersContainer.classList.add('invisible');
reviewBlock.classList.add('reviews-list-loading');

var createReviewElement = function(data) {
  var element = elementToClone.cloneNode(true);
  element.querySelector('.review-text').textContent = data.description;
  element.querySelector('.review-rating').classList.add(starsArray[+data.rating - 1]);

  var authorImage = new Image();

  authorImage.onload = function() {
    var authorBoth = element.querySelector('.review-author');
    authorBoth.src = data.author.picture;
    authorBoth.alt = data.author.name;
    authorBoth.width = '124';
    authorBoth.height = '124';
  };

  authorImage.onerror = function() {
    element.classList.add('review-load-failure');
  };

  authorImage.src = data.author.picture;

  reviewsContainer.appendChild(element);
};

var onEventFunction = function() {
  reviewBlock.classList.remove('reviews-list-loading');
  reviewBlock.classList.add('reviews-load-failure');
};

var getFilteredReviews = function(filter) {
  var reviewsToFilter = reviews.slice(0);

  switch (filter) {
    case 'reviews-all':
      reviewsToFilter = reviews.slice(0);
      break;
    case 'reviews-recent':
      reviewsToFilter = reviewsToFilter.filter(function(review) {
        var fourDays = Date.now() - 4 * 24 * 60 * 60 * 1000;
        var reviewDate = Date.parse(review.date);
        return reviewDate > fourDays && Date.now() > reviewDate;
      }).sort(function(a, b) {
        return Date.parse(b.date) - Date.parse(a.date);
      });
      break;
    case 'reviews-good':
      reviewsToFilter = reviewsToFilter.filter(function(review) {
        return review.rating > 2;
      }).sort(function(a, b) {
        return b.rating - a.rating;
      });
      break;
    case 'reviews-bad':
      reviewsToFilter = reviewsToFilter.filter(function(review) {
        return review.rating < 3;
      }).sort(function(a, b) {
        return a.rating - b.rating;
      });
      break;
    case 'reviews-popular':
      reviewsToFilter = reviewsToFilter.sort(function(a, b) {
        return b.review_usefulness - a.review_usefulness;
      });
      break;
  }
  return reviewsToFilter;
};

var nothingFoundTemplate = function() {
  var nothingInHere = document.createElement('p');
  nothingInHere.style.setProperty('margin-left', '110px');
  nothingInHere.textContent = 'К сожалению, нет подходящих отзывов.';
  reviewsContainer.appendChild(nothingInHere);
  toggleReviewsButton(false);
};

var renderReviews = function(replace) {
  if (replace) {
    reviewsContainer.innerHTML = '';
  }

  var from = pageNumber * PAGE_SIZE;
  var to = from + PAGE_SIZE;

  filteredReviews.slice(from, to).forEach(function(review) {
    createReviewElement(review);
  });
  if (filteredReviews.length === 0) {
    nothingFoundTemplate();
  }
  toggleReviewsButton(isNextPageAvailable(PAGE_SIZE));
};

var toggleReviewsButton = function(flag) {
  moreReviewsButton.classList.toggle('invisible', !flag);
};

var isNextPageAvailable = function() {
  return pageNumber < ( Math.ceil(filteredReviews.length / PAGE_SIZE) - 1 );
};

var setFilterEnabled = function(filter) {
  filteredReviews = getFilteredReviews(filter);
  pageNumber = 0;
  renderReviews(true);
};

var setFiltrationEnabled = function() {
  filtersContainer.addEventListener('click', function(evt) {
    if (evt.target.id && currentId !== evt.target.id) {
      setFilterEnabled(evt.target.id);
      currentId = evt.target.id;
    }
  });
};

moreReviewsButton.addEventListener('click', function() {
  pageNumber++;
  renderReviews(false);
});

load(REVIEWS_URL, function(loadedReviews) {
  reviewBlock.classList.remove('reviews-list-loading');
  reviews = loadedReviews;
  setFiltrationEnabled();
  setFilterEnabled();
});

filtersContainer.classList.remove('invisible');
reviewBlock.classList.remove('reviews-list-loading');


