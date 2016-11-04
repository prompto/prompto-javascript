var DataStore = require("../store/DataStore").DataStore;
var StoredDocument = require("./StoredDocument").StoredDocument;

function StorableDocument(categories) {
    if(!categories)
        throw new Error("!!!");
    this.categories = categories;
    this.document = null;
    return this;
}

Object.defineProperty(StorableDocument.prototype, "dirty", {
    get : function() {
        return this.document != null;
    },
    set : function(value) {
        if (value) {
            if(!this.document)
                this.document = new StoredDocument(this.categories, ++DataStore.instance.nextDbId);
        } else
            this.document = null;
    }
});

StorableDocument.prototype.getOrCreateDbId = function() {
    var dbId = this.document ? (this.document["dbId"] || null) : null;
    if (dbId == null) {
        dbId = ++DataStore.instance.nextDbId;
        this.setData("dbId", dbId);
    }
    return dbId;
};


StorableDocument.prototype.setData = function(name, value) {
    this.dirty = true;
    this.document[name] = value;
};

exports.StorableDocument = StorableDocument;
