var invisibleFilter = document.querySelector('.reviews-filter');
var reviewTemplate = document.getElementById('review-template');
var reviewsContainer = document.querySelector('.reviews-list');
var elementToClone = reviewTemplate.content.querySelector('.review');
invisibleFilter.classList.add('invisible');

var getReview = function(data, container) {
  var element = elementToClone.cloneNode(true);
  container.appendChild(element);
  element.querySelector('.review-text').textContent = data.description;

  var authorImage = new Image();
  authorImage.onload = function() {
    element.querySelector('.review-author').src = data.author.picture;
  };

  authorImage.onerror = function() {
    element.classList.add('review-load-failure');
  };

  authorImage.src = data.author.picture;

  return element;
};

window.reviews.forEach(function(review) {
  getReview(review, reviewsContainer)
});

invisibleFilter.classList.remove('invisible');

