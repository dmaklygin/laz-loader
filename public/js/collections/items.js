// Items Collection
App.Collections.Items = Backbone.Collection.extend({

  model: App.Models.Item,

  /**
   * Loading items information by link
   * @param {array} links
   */
  loadItems: function(links) {
    var _this = this,
        models = [];

    _this.reset();

    _this.trigger('loading');

    links && links.forEach(function(link) {
      _this.loadItem(link)
        .fail(function() {
          console.log('unable to load item', link);
        })
        .done(function(response) {
          // adding new model to collection
          _this.add(_.extend({ id: _.uniqueId() }, response), { parse: true });
        });
    });
  },

  /**
   * Loading item information by link
   * @param {string} link
   */
  loadItem: function(link) {

    if (!link) {
      return $.Deferred().reject();
    }

    return App.api('item', { link: link })
  }





});