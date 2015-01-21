/**
 * Search Form View
 */
App.Views.Form = Backbone.View.extend({

  el: '.search-form',

  events: {
    'click .button_type_upload': 'upload'
  },

  ui: {
    '.link_num_1': 'link1',
    '.link_num_2': 'link2'
  },

  /**
   * Function sends links to server
   */
  upload: function () {





  }
});