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

    if (_this.linksCounter) {
      return;
    }

    _this.linksCounter = links.length;

    _this.trigger('loading');

    links && links.forEach(function(link) {
      _this.loadItem(link)
        .fail(function() {
          _this.linksCounter--;
          (_this.linksCounter <= 0) && _this.onItemsLoaded(models);
        })
        .done(function(response) {
          // Uniq ID for current item
          response.id = _this.hash(link);
          // add to array
          models.push(response);
          _this.linksCounter--;
          (_this.linksCounter <= 0) && _this.onItemsLoaded(models);
        });
    });
  },

  onItemsLoaded: function(models) {
    // Set items to collection
    this.set(models, { parse: true, validate: true });
    // trigger 'loaded' event
    this.trigger('loaded');
  },

  /**
   * Loading item information by link
   * @param {string} link
   */
  loadItem: function(link) {
    if (!link) {
      return $.Deferred().reject();
    }

    link += (link.indexOf('?') > 0 ? '&' : '?') + 'setLang=en';

    return App.api('item', { link: link })
  },

  hash: function(str) {
    var hash = 0;
    for (i = 0; i < str.length; i++) {
      char = str.charCodeAt(i);
      hash += char;
    }
    return hash;
  }
});