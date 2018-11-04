var DataStore = require("../store/DataStore").DataStore;
var StoredDocument = require("./StoredDocument").StoredDocument;

function StorableDocument(categories, dbIdListener) {
    if(!categories)
        throw new Error("!!!");
    // use reserved keyword explicitly
    this.category = categories;
    this.dbIdListener = dbIdListener;
    this.document = null;
    return this;
}

Object.defineProperty(StorableDocument.prototype, "dirty", {
    get : function() {
        return this.document != null;
    },
    set : function(value) {
        if (value) {
            if(!this.document) {
                this.document = new StoredDocument(this.category);
                this.document.dbId = this.getOrCreateDbId();
            }
        } else
            this.document = null;
    }
});

StorableDocument.prototype.getDbId = function() {
    return this.document ? (this.document["dbId"] || null) : null;
};

StorableDocument.prototype.getOrCreateDbId = function() {
    var dbId = this.getDbId();
    if (dbId == null) {
        dbId = ++DataStore.instance.nextDbId;
        this.dbIdListener(dbId);
        this.setData("dbId", dbId);
    }
    return dbId;
};


StorableDocument.prototype.setData = function(name, value) {
    this.dirty = true;
    this.document[name] = value;
};

exports.StorableDocument = StorableDocument;
