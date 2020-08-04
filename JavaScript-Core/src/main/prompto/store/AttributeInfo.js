
class AttributeInfo {
    constructor(name, family, collection, indexTypes) {
        this.name = name
        this.family = family
        this.collection = collection
        this.key = indexTypes == null ? false : indexTypes.indexOf("key")>=0;
        this.value = indexTypes == null ? false : indexTypes.indexOf("value")>=0;
        this.words = indexTypes == null ? false : indexTypes.indexOf("words")>=0;
        return this;
    }

    toTranspiled() {
        return "new AttributeInfo('" + this.name + "', TypeFamily." + this.family.name + ", " + this.collection + ", null)";
    }
}

exports.AttributeInfo = AttributeInfo;