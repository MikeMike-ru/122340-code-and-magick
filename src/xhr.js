'use strict';

module.exports = function(link, element, callback) {
  var xhr = new XMLHttpRequest();

  var onEventFunction = function() {
    element.classList.remove('reviews-list-loading');
    element.classList.add('reviews-load-failure');
  };

  xhr.onload = function(evt) {
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

  xhr.open('GET', link);
  xhr.send();
};
