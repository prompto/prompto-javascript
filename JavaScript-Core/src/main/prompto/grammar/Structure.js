function Structure() {
    this.entries = {};
    return this;
}

Structure.prototype.set = function(name, type) {
    this.entries[name] = type;
};


Structure.prototype.get = function(name) {
    return this.entries[name] || null;
};

exports.Structure = Structure;