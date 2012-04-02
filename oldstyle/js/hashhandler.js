/**
 * Global onhashchange Event Manager
 *
 * Push your handlers to this manager so that they will be notified when
 * and ONLY WHEN interested URI hash comes.
 *
 * Example:
 *   HashHandler.push(['hash1', handler1, 'title1'],
 *                    ['hash2', handler2, 'title2'],
 *                    ...
 *                    ['hashN', handlerN, 'titleN']);
 */
var HashHandler =
{
    initialization: function()
    {
        this.hash  = {};
        this.title = null;
        window.onhashchange = this.change;
    },
    getCurHash: function()
    {
        var rawHash = location.hash.replace(/^(#!|#)/, ''),
            arrHash = rawHash.split('/');
        if (rawHash.indexOf('/')) {
            return [arrHash.shift(), arrHash.join('/')];
        } else {
            return ['/', rawHash.replace(/^\//, '')];
        }
    },
    push: function()
    {
        if (!this.hash) {
            this.initialization();
        }
        for (var i = 0; i < arguments.length; i++) {
            var hash = arguments[i].shift();
            this.hash[hash] = arguments[i];
            if (hash === HashHandler.getCurHash()[0]) {
                this.change();
            }
        }
    },
    change: function()
    {
        var curHash  = HashHandler.getCurHash(),
            hashItem = HashHandler.hash[curHash[0]];
        if (hashItem) {
            HashHandler.setTitle();
            hashItem[0](curHash[1]);
            if (HashHandler.title !== null) {
                document.title = HashHandler.title;
            } else if (hashItem[1]) {
                document.title = hashItem[1];
            }
        }
    },
    setTitle: function(title)
    {
        this.title = typeof title !== 'undefined' ? title : null;
    }
};
