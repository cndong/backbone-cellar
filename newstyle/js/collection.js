var WineApp = WineApp || {};

WineApp.Collection = {

    wine: Backbone.Collection.extend({

        model: WineApp.Model.wine,

        url: '../api/wines'

    })

};
