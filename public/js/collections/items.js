// Items Collection
App.Collections.Items = Backbone.Collection.extend({

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
        .done(function() {
          console.log('response data from server', arguments);
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