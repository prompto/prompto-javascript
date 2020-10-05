
export default class StoredDocument {

    constructor(categories) {
        // use reserved 'category' keyword explicitly
        this.category = categories;
    }

    getData(name) {
        return this[name] || null;
    }

    matches(predicate) {
        if(predicate==null)
            return true;
        else
            return predicate.matches(this);
    }
}
