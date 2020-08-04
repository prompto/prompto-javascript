class PropertyMap {
    constructor() {
        this.entries = {};
        return this;
    }

    set(name, type) {
        this.entries[name] = type;
    }

    get(name) {
        return this.entries[name] || null;
    }

    has(name) {
        return !!this.entries[name];
    }
}

exports.PropertyMap = PropertyMap;