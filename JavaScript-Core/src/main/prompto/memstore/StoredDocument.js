
export default class StoredDocument {

    constructor(categories) {
        // use reserved 'category' keyword explicitly
        this.category = categories;
    }

    hasData(name) {
        return name in this;
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

    project(projection) {
        const doc = new StoredDocument(this.category);
        projection.forEach(name => doc[name] = this.getData(name), this);
        return doc;
    }
}
