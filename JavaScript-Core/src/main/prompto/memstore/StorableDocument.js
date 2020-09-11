import { $DataStore } from "../store/index"
import { StoredDocument } from "./index"

export default class StorableDocument {

    constructor(categories, dbIdListener) {
        if(!categories)
            throw new Error("!!!");
        // use reserved keyword explicitly
        this.category = categories;
        this.dbIdListener = dbIdListener;
        this.document = null;
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
        let dbId = this.getDbId();
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

