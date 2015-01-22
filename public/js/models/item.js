/**
 * Item Model
 */
App.Models.Item = Backbone.Model.extend({

  defaults: {
    title: null,
    sku: null,
    price: null,
    specifications: {}
  },

  parse: function(response) {

    var model = { specifications: {} };

    var tempEl = document.createElement('div');
    try {
      tempEl.insertAdjacentHTML('afterBegin', response.document || '');
    } catch (e) {}

    // searching information
    // title
    var title = tempEl.querySelector('#prod_title');
    model.title = (title && title.innerText) || '';
    // specifications
    _.each(tempEl.querySelectorAll('.specification-table tr'), function(row) {
      var
        label = row.firstElementChild && row.firstElementChild.innerText,
        value = row.lastElementChild && row.lastElementChild.innerText;
      // parsing attributes from row
      if (!label || !value) {
        return false;
      }
      if (label == 'SKU') {
        model.sku = value;
      } else if (label == 'Price') {
        model.price = value;
      } else {
        model.specifications[label] = value;
      }
    });
    // image
    var image = tempEl.querySelector('#productImageBox .productImage');
    model.image = image && image.getAttribute('data-swap-image');

    // remove this element
    delete tempEl;

    return model;
  }

});