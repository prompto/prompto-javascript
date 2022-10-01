import List from './List.js';
import StrictSet from './StrictSet.js';
import Document from './Document.js';
import NotMutableError from '../error/NotMutableError.js';

export default class Dictionary extends Map {

    constructor(mutable, entries) {
        super()
        if (entries)
            Object.getOwnPropertyNames(entries).forEach(function (name) {
                this.set(name, entries[name]);
            }, this);
        this.mutable = mutable || false;
        return this;
    }

    get length() {
        return this.size;
    }

    get $keys() {
        return new StrictSet(this.keys());
    }

    get $values() {
        return new List(false, this.values);
    }

    get $entries() {
        return new List(false, this.entries());
    }

    iterator() {
        let idx = 0;
        const iter = this.entries();
        return {
            hasNext: () => idx < this.size,
            next: () => {
                idx += 1;
                const kvp = iter.next();
                return {key: kvp.value.key, value: kvp.value.value};
            }
        }
    }

    swap() {
        const swapped = new Dictionary(false);
        for (const entry of this.entries()) {
            swapped.set(entry.value, entry.key);
        }
        return swapped;
    }

    removeKey(key) {
        if(!this.mutable)
            throw new NotMutableError();
        return this.delete(key);
    }

    removeValue(value) {
        if(!this.mutable)
            throw new NotMutableError();
        for (const entry of this.entries()) {
            if (value === entry.value || (value.equals && value.equals(entry.value))) {
                this.delete(entry.key);
                return true;
            }
        }
        return false;
    }

    add(dict) {
        if(!this.mutable)
            throw new NotMutableError();
        for (const entry of dict.entries()) {
            this.set(entry.key, entry.value);
        }
    }

    toString() {
        const items = Array.from(this.entries()).map(e => '"' + e.key + '":' + e.value);
        return "<" + (items.length ? items.join(", ") : ':') + ">";
    }

    getText() {
        return this.toString();
    }

    toJson() {
        return new Document(this).toJson();
    }

    equals(dict) {
        var keys = this.$keys;
        if (this.length !== dict.length)
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
    }

    hasAll(keys) {
        keys.every(this.has, this);
    }

    hasAny(keys) {
        keys.some(this.has, this);
    }

    toJsonNode() {
        return new Document(this).toJsonNode();
    }

    getItem(key) {
        if(!key)
            throw new ReferenceError();
        return this.get(key);
    }

    setItem(key, value) {
        if(!this.mutable)
            throw new NotMutableError();
        else if(!key)
            throw new ReferenceError();
        else
            this.setItem(key, value);
    };
}
