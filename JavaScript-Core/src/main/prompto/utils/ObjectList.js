class ObjectList extends Array {

    constructor(items, item) {
        super();
        items = items || null;
        if(items!==null) {
            this.addAll(items);
        }
        item = item || null;
        if(item!==null) {
            this.add(item);
        }
    }

    addAll(items) {
        this.push.apply(this, Array.from(items));
    }

    add(item) {
        if(item)
            this.push(item);
    }

    insert(before, item) {
        this.splice(0, 0, item);
    }

    remove(index) {
        this.splice(index, 1);
    }

    toString() {
        return this.join(", ");
    }
}


exports.ObjectList = ObjectList;
