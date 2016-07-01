'use strict';

var getFilteredReviews = function(filter, reviews) {
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

module.exports = getFilteredReviews;
