'use strict';

var reviews = [];
var reviewTemplate = document.getElementById('review-template');
var reviewBlock = document.querySelector('.reviews');
var reviewsContainer = document.querySelector('.reviews-list');
var filtersContainer = document.querySelector('.reviews-filter');
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

filtersContainer.classList.add('invisible');
reviewBlock.classList.add('reviews-list-loading');

var getReviewElement = function(data) {
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

var getReviews = function(callback) {
  var xhr = new XMLHttpRequest();

  xhr.onload = function(evt) {
    reviewBlock.classList.remove('reviews-list-loading');
    var loadedData = JSON.parse(evt.target.response);
    callback(loadedData);
  };

  xhr.onerror = function() {
    onEventFunction();
  };

  xhr.timeout = 10000;
  xhr.ontimeout = function() {
    onEventFunction();
  };

  xhr.open('GET', REVIEWS_URL);
  xhr.send();
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
  console.log('Nothing in here');
};

var renderReviews = function(reviewsList) {
  reviewsContainer.innerHTML = '';
  reviewsList.forEach(function(review) {
    getReviewElement(review);
  });
};

var setFilterEnabled = function(filter) {
  var filteredReviews = getFilteredReviews(filter);
  renderReviews(filteredReviews);
};

var setFiltrationEnabled = function() {
  var filters = filtersContainer.reviews;
  for (var i = 0; i < filters.length; i++) {
    filters[i].onclick = function() {
      setFilterEnabled(this.id);
    };
  }
};

getReviews(function(loadedReviews) {
  reviews = loadedReviews;
  setFiltrationEnabled();
  renderReviews(reviews);
  if (reviews.length) {
    nothingFoundTemplate();
  }
});

filtersContainer.classList.remove('invisible');
reviewBlock.classList.remove('reviews-list-loading');

