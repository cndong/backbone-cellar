var WineApp = WineApp || {};

WineApp.View = {

    header: Backbone.View.extend({

        el: '#header',

        events: {
            'click .new': 'new'
        },

        new: function(event) {
            App.navigate('wines/new', true);
            return false;
        }

    }),

    welcome: Backbone.View.extend({

        el: '#content',

        render: function() {
            this.$el.html(ich.welcomeTpl());
        }

    }),

    list: Backbone.View.extend({

        el: '#sidebar',

        initialize: function() {

            this.model.bind('reset', this.render, this);
            this.model.bind('change', this.render, this);

        },

        render: function() {

            this.$el.html(
                ich.wineListTpl({
                    wines: this.model.toJSON()
                })
            );

        }

    }),

    detail: Backbone.View.extend({

        el: '#content',

        events: {
            'click .save': 'save',
            'click .delete': 'delete'
        },

        render: function() {
            this.$el.html(
                ich.wineDetailTpl(this.model.toJSON())
            );
        },

        save: function() {

            console.log('save');

            var _this = this;

            this.model.set({
                name: $('#name').val(),
                grapes: $('#grapes').val(),
                country: $('#country').val(),
                region: $('#region').val(),
                year: $('#year').val(),
                description: $('#description').val()
            });

            console.log(this.model.isNew());

            if (this.model.isNew()) {
                App.wineCollection.create(this.model, {
                    success: function() {
                        App.navigate('wines/' + _this.model.id, true);
                    }
                });
            } else {
                this.model.save();
            }

        },

        delete: function() {

            this.model.destroy({
                success: function() {
                    alert('Wine deleted successfully');
                    App.navigate('/', true);
                }
            });

        }

    })

};
