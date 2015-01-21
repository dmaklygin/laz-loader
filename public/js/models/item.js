/**
 * Item Model
 */
App.Models.Item = Backbone.Model.extend({

  defaults: {
    title: ''
  },

  parse: function(response) {
    console.log(response);
  }

});