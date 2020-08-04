var $DataStore = require("../store/DataStore").$DataStore;
var StoredDocument = require("./StoredDocument").StoredDocument;

class StorableDocument {
    constructor(categories, dbIdListener) {
        if(!categories)
            throw new Error("!!!");
        // use reserved keyword explicitly
        this.category = categories;
        this.dbIdListener = dbIdListener;
        this.document = null;
        return this;
    }

    isDirty() {
        return this.document!=null;
    }

    clear() {
        this.document = null;
    }

    getDbId() {
        return this.document ? (this.document["dbId"] || null) : null;
    }

    getOrCreateDbId() {
        var dbId = this.getDbId();
        if (dbId == null) {
            dbId = ++$DataStore.instance.nextDbId;
            if(this.dbIdListener)
                this.dbIdListener(dbId);
            this.setData("dbId", dbId, dbId);
        }
        return dbId;
    }

    setDbId(dbId) {
        if(this.document)
            this.document.dbId = dbId;
    }

    setData(name, value, dbId) {
        if(!this.document) {
            this.document = new StoredDocument(this.category);
            this.document.dbId = dbId? dbId : this.getOrCreateDbId();
        }
        this.document[name] = value;
    }
}

exports.StorableDocument = StorableDocument;
