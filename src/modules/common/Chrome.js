
module.exports = {
    clearAllCookies: function(urls, cb) {
        var clear = function(url, cb) {
            chrome.cookies.getAll({url: url}, function(cookies) {
                $.each(cookies, function(i, item) {
                    chrome.cookies.remove({
                        url: url + item.path,
                        name: item.name
                    });
                });
                cb && cb();
            });
        },
        worker = function() {
            var url = urls.shift();
            if (url) {
                clear(url, worker);
            } else {
                cb && cb();
            }
        };
        worker();
    },
    syncSet: function(key, obj, cb) {
        key = key.replace(/[\s]*/g, '');
        chrome.storage.sync.get(function(items) {
            var iter = key.split('.'),
                    v = items;
            while (iter.length > 1) {
                var temp = iter.shift();
                v = v[temp] = v[temp] || {};
                if (typeof v != 'object') {
                    throw "not a object";
                }
            }
            v[iter.shift()] = obj;
            chrome.storage.sync.set(items, function() {
                cb && cb();
            });
        });
    },
    syncGet: function(key, cb) {
        key = key.replace(/[\s]*/g, '');
        chrome.storage.sync.get(function(items) {
            var iter = key.split('.'),
                    v = items;
            while (iter.length > 1) {
                var temp = iter.shift();
                v = v[temp];
                if (!v) {
                    cb && cb(null);
                    return;
                }
            }
            var item=v[iter.shift()];
            cb && cb(item);
        });
    },
    syncDel: function(key, cb) {
        key = key.replace(/[\s]*/g, '');
        chrome.storage.sync.get(function(items) {
            var iter = key.split('.'),
                    v = items;
            while (iter.length > 1) {
                var temp = iter.shift();
                v = v[temp] = v[temp] || {};
                if (typeof v != 'object') {
                    cb && cb();
                }
            }
            delete v[iter.shift()];
            chrome.storage.sync.set(items, function() {
                cb && cb();
            });
        });
    },
    syncGetAll: function(cb) {
        chrome.storage.sync.get(function(items) {
            cb && cb(items);
        });
    },
    syncSetAll: function(all, cb) {
        chrome.storage.sync.set(all, function() {
            cb && cb();
        });
    },
    syncDelAll: function(cb) {
        chrome.storage.sync.clear(function() {
            cb && cb();
        });
    }
};
