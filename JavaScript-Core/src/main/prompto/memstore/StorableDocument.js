var $DataStore = require("../store/DataStore").$DataStore;
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

StorableDocument.prototype.isDirty = function() {
    return this.document!=null;
};

StorableDocument.prototype.clear = function() {
    this.document = null;
};

StorableDocument.prototype.getDbId = function() {
    return this.document ? (this.document["dbId"] || null) : null;
};

StorableDocument.prototype.getOrCreateDbId = function() {
    var dbId = this.getDbId();
    if (dbId == null) {
        dbId = ++$DataStore.instance.nextDbId;
        if(this.dbIdListener)
            this.dbIdListener(dbId);
        this.setData("dbId", dbId, dbId);
    }
    return dbId;
};

StorableDocument.prototype.setDbId = function(dbId) {
    if(this.document)
        this.document.dbId = dbId;
};

StorableDocument.prototype.setData = function(name, value, dbId) {
    if(!this.document) {
        this.document = new StoredDocument(this.category);
        this.document.dbId = dbId? dbId : this.getOrCreateDbId();
    }
    this.document[name] = value;
};

exports.StorableDocument = StorableDocument;
