// Define Global Variables
window.App = {
  Views: {},
  Models: {},
  Collections: {},

  /**
   *
   * @param {string} method
   * @param {null|Object} options
   * @returns {Object} $.Deffered
   */
  api: function (method, options) {
    options || (options = {});
    // for legacy
    method || (method = '');

    var req = $.ajax({
      url: '/api/' + method,
      method: 'GET',
      data: options
    });

    return req.promise();
  }
};

// Start Application
$(function () {
  // Items Collection
  App.items = new App.Collections.Items();
  // Create view instance
  App.form = new App.Views.Form({ collection: App.items });
  // Comparer view instance
  App.compareView = new App.Views.Compare({ collection: App.items });
});