function PropertyMap() {
    this.entries = {};
    return this;
}

PropertyMap.prototype.set = function(name, type) {
    this.entries[name] = type;
};


PropertyMap.prototype.get = function(name) {
    return this.entries[name] || null;
};

PropertyMap.prototype.has = function(name) {
    return !!this.entries[name];
};

exports.PropertyMap = PropertyMap;