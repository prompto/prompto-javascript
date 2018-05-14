var StrictSet = require("./StrictSet").StrictSet;

function Dictionary(entries) {
    if(entries)
        Object.getOwnPropertyNames(entries).forEach(function(name) { this[name] = entries[name]; }, this);
    return this;
}

Object.defineProperty(Dictionary.prototype, "length", {
    get : function() {
        return Object.getOwnPropertyNames(this).length;
    }
});

Object.defineProperty(Dictionary.prototype, "keys", {
    get : function() {
        return new StrictSet(Object.getOwnPropertyNames(this));
    }
});


Object.defineProperty(Dictionary.prototype, "values", {
    get : function() {
        return Object.getOwnPropertyNames(this).map(function(name) { return this[name]; }, this);
    }
});


Dictionary.prototype.add = function(dict) {
    var result = Object.assign({}, this, dict);
    result.__proto__ = Dictionary.prototype;
    return result;
}


Dictionary.prototype.toString = function() {
    var names = Object.getOwnPropertyNames(this);
    var vals = names.map(function (name) {
        return '"' + name + '":' + this[name];
    }, this);
    return "{" + vals.join(", ") + "}";
};

Dictionary.prototype.equals = function(dict) {
    var keys = Object.getOwnPropertyNames(this);
    if (keys.length != dict.length)
        return false;
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var v1 = this[key] || null;
        var v2 = dict[key] || null;
        if (v1 === v2)
            continue;
        else if (v1 === null || v2 === null)
            return false;
        else if (v1.equals) {
            if (!v1.equals(v2)) {
                return false;
            }
        } else if (v2.equals) {
            if (!v2.equals(v1)) {
                return false;
            }
        } else
            return false;
    }
    return true;
};

Dictionary.prototype.has = function(item) {
    return this.keys.has(item, true);
};


Dictionary.prototype.hasAll = function(items) {
    return this.keys.hasAll(items, true);
};

Dictionary.prototype.hasAny = function(item) {
    return this.keys.hasAny(item, true);
};


exports.Dictionary = Dictionary;