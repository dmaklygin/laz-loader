/**
 * Search Form View
 */
App.Views.Form = App.Views.View.extend({

  el: '.search-form',

  events: {
    'click .button_type_upload': 'load'
  },

  initialize: function() {
    // Caching jQ elements
    this.links = [];
    this.links.push(this.$el.find('.search-form__link_num_1'));
    this.links.push(this.$el.find('.search-form__link_num_2'));
  },

  /**
   * Loading items from server
   */
  load: function () {
    // gathering only string links
    var links = this.links.map(function(linkEl) {
      return linkEl.val();
    });

    App.items.loadItems(links);

    return false;
  }

});