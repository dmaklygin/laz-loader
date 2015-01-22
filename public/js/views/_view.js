/**
 * Created by dmitrij on 22.01.15.
 */
App.Views.View = Backbone.View.extend({
  /**
   * Get Template name
   * @returns {string} template name
   */
  getTemplate: function() {
    return this.template || null;
  },

  /**
   * Rendering View
   */
  render: function() {
    // get template name
    var template = this.getTemplate();

    if (template === false) {
      return;
    }

    if (!template || !App.Templates[template]) {
      throw new Error('Template not found');
    }
    // Get data
    var data = this.serialize();
    // Renderer placed on jade
    var html = App.Templates[template](data);
    // Attach html to DOM
    this.attach(html);
  },

  serialize: function() {
    if (!this.model && !this.collection) {
      return {};
    }

    var args = [this.model || this.collection];
    if (arguments.length) {
      args.push.apply(args, arguments);
    }

    if (this.model) {
      return this.serializeModel.apply(this, args);
    } else {
      return {
        items: this.serializeCollection.apply(this, args)
      };
    }
  },

  serializeModel: function(model){
    return model.toJSON.apply(model, _.rest(arguments));
  },

  serializeCollection: function(collection){
    return collection.toJSON.apply(collection, _.rest(arguments));
  },

  attach: function(html) {
    this.$el.html(html);
  }

});