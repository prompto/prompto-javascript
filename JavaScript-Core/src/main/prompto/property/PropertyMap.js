export default class PropertyMap {

    constructor() {
        this.entries = {};
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