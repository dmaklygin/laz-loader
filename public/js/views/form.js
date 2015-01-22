/**
 * Search Form View
 */
App.Views.Form = App.Views.View.extend({

  el: '.form',

  events: {
    'click .button_type_upload': 'load'
  },

  initialize: function () {
    if (!this.collection) {
      throw new Error('Collection not found');
    }
    // Caching jQ elements
    this.links = [];
    this.links.push(this.$el.find('.form__link_num_1'));
    this.links.push(this.$el.find('.form__link_num_2'));

    this.button = this.$el.find('.button_type_upload');

    // Listener loading event
    this.collection.on('loading', this.disableButton, this);
    this.collection.on('loaded', this.enableButton, this);
  },

  /**
   * Loading items from server
   */
  load: function () {
    // gathering only string links
    var links = this.links.map(function (linkEl) {
      return linkEl.val();
    });

    App.items.loadItems(links);

    return false;
  },

  enableButton: function () {
    this.toggleButton(true);
  },

  disableButton: function () {
    this.toggleButton(false);
  },

  toggleButton: function (enable) {
    this.button.attr('disabled', !enable);
  }

});