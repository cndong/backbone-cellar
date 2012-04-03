var Wines = {

    url: '../api/wines',

    init: function() {
        HashHandler.push(
            ['', Wines.index],
            ['wines', Wines.detail],
            ['wines/new', Wines.create]
        );
    },

    index: function() {
        console.log('index');

        Wines.list();

        $('#content').html(ich.welcomeTpl());
    },

    list: function() {
        console.log('list');
        $.ajax({
            url: Wines.url,
            dataType: 'json',
            success: function(response) {
                $.each(response, function(index, wine) {
                    $('#sidebar').html(ich.wineListTpl({wines: response}));
                });
            }
        });
    },

    detail: function(wineId) {
        console.log('detail');
        $.ajax({
            url: Wines.url + '/' + wineId,
            dataType: 'json',
            success: function(response) {
                $('#content').html(ich.wineDetailTpl(response));
                $('#content .save').click(Wines.save);
                $('#content .delete').click(Wines.delete);
            }
        });
    },

    create: function() {
        console.log('create');
        $('#content').html(ich.wineDetailTpl({}));
        $('#content .save').click(Wines.save);
    },

    save: function() {
        console.log('save');
        $.ajax({
            url: Wines.url,
            dataType: 'json',
            data: Wines.formToJSON(),
            type: 'POST',
            success: function(response) {
                Wines.list();
                window.location.hash = '!wines/' + response.id;
            }
        });
    },

    delete: function() {
        console.log('delete');
        $.ajax({
            url: Wines.url + '/' + $('#wineId').val(),
            type: 'DELETE',
            success: function() {
                alert('Wine deleted successfully');
                window.location.hash = '';
            }
        });
    },

    formToJSON: function() {
        return JSON.stringify({
            name: $('#name').val(),
            grapes: $('#grapes').val(),
            country: $('#country').val(),
            region: $('#region').val(),
            year: $('#year').val(),
            description: $('#description').val()
        });
    }
};

$(function() {
    Wines.init();
});
