App.Views.Compare = App.Views.View.extend({

  el: '.compare',

  template: 'compare',

  initialize: function() {

    if (!this.collection) {
      throw new Error('Collection not found');
    }
    // Listener to any changes
    this.collection.on('add remove reset', this.render, this);
    // Listener loading event
    this.collection.on('loading', this.showLoader, this);
    this.collection.on('loaded', this.hideLoader, this);

    this.render();
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
  },

  showLoader: function() {
    this.toggleLoader(true);
  },

  hideLoader: function() {
    this.toggleLoader(false);
  },

  toggleLoader: function(show) {
    this.$el[show ? 'addClass' : 'removeClass']('compare_loader_show');
  }

});