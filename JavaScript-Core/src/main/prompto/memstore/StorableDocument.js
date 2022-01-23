import { $DataStore } from '../store/index.js'
import { StoredDocument } from './index.js'

export default class StorableDocument {

    constructor(categories, dbIdFactory, document) {
        if(!categories)
            throw new Error("!!!");
        // use reserved keyword explicitly
        this.category = categories;
        this.$dbIdFactory = dbIdFactory;
        this.document = document || null;
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
            if(this.$dbIdFactory)
                dbId = this.$dbIdFactory.provider();
            if(dbId != null)
                this.setDbId(dbId);
            else {
                dbId = $DataStore.instance.nextDbId++;
                if(this.$dbIdFactory)
                    this.$dbIdFactory.listener(dbId);
                this.setData("dbId", dbId, dbId);
            }
        }
        return dbId;
    }

    setDbId(dbId) {
        if(this.document)
            this.document.dbId = dbId;
    }

    hasData(name) {
        return this.document && name in this.document;
    }

    getData(name) {
        return (this.document || {})[name] || null;
    }

    setData(name, value, dbId) {
        if(!this.document) {
            this.document = new StoredDocument(this.category);
            this.document.dbId = dbId? dbId : this.getOrCreateDbId();
        }
        this.document[name] = value;
    }
}

