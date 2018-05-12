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


exports.Dictionary = Dictionary;