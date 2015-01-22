App.Views.Compare = App.Views.View.extend({

  el: '.compare',

  template: 'compare',

  initialize: function() {

    if (!this.collection) {
      throw new Error('Collection not found');
    }
    // Listener to any changes
    this.collection.on('add remove reset', this.render, this);
  },

  serialize: function() {
    // Specification keys
    var specifications = {};

    this.collection.each(function(item) {
      var specItem = item.get('specifications');
      specItem && _.each(specItem, function(value, key) {
        specifications[key] = 1;
      });
    });

    var data = App.Views.View.prototype.serialize.apply(this, arguments);

    return _.extend(data, {
      specsKeys: Object.keys(specifications),
      // array of items with cpecs
      itemsSpecs: this.collection.pluck('specifications')
    });
  }

});