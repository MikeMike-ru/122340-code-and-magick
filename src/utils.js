'use strict';

module.exports = {

  getElementToClone: function(template, selector) {
    if ('content' in template) {
      return template.content.querySelector(selector);
    } else {
      var returnContent = function() {
        template.querySelector(selector);
        template.classList.add('invisible');
      };
      return returnContent();
    }
  }
};
