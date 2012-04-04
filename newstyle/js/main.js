var WineApp = WineApp || {};

WineApp.Router = Backbone.Router.extend({

    routes: {
        '': 'index',
        'wines/new': 'new',
        'wines/:id': 'detail'
    },

    index: function() {

        new WineApp.View.header();
        new WineApp.View.welcome().render();

        this.list();

    },

    list: function() {

        this.wineCollection = new WineApp.Collection.wine();
        this.wineListView = new WineApp.View.list({model: this.wineCollection});
        this.wineCollection.fetch();

    },

    detail: function(id) {

        this.wineDetialView && this.wineDetialView.$el.unbind();

        this.wineDetialView = new WineApp.View.detail({
            model: this.wineCollection.get(id)
        });
        this.wineDetialView.render();

    },

    new: function() {

        this.wineDetialView && this.wineDetialView.$el.unbind();

        this.wineDetialView = new WineApp.View.detail({
            model: new WineApp.Model.wine()
        });
        this.wineDetialView.render();

    }

});

var App;

$(function() {
    App = new WineApp.Router();
    Backbone.history.start();
});
