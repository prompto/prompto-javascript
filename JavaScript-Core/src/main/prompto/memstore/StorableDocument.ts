/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call */
import { $DataStore } from '../store'
import {MemStore, StoredDocument} from './index'
import { IStorable } from '../store'
import IDbIdFactory from "../store/IDbIdFactory";

export default class StorableDocument implements IStorable {

    category: string[];
    document: StoredDocument | null;
    $dbIdFactory: IDbIdFactory | null;

    constructor(categories: string[], dbIdFactory: IDbIdFactory | null, document?: StoredDocument) {
        // use reserved keyword explicitly
        this.category = categories;
        this.$dbIdFactory = dbIdFactory;
        this.document = document || null;
    }

    isDirty() {
        return this.document != null;
    }

    clear() {
        this.document = null;
    }

    getDbId() {
        return this.document ? (this.document.get("dbId") || null) : null;
    }

    getOrCreateDbId() {
        let dbId = this.getDbId();
        if (dbId == null) {
            if(this.$dbIdFactory) {
                if (this.$dbIdFactory.provider)
                    dbId = this.$dbIdFactory.provider();
            }
            if(dbId)
                this.setDbId(dbId);
            else {
                const store = $DataStore.instance as MemStore;
                dbId = store.nextDbId++;
                if(this.$dbIdFactory) {
                    if (this.$dbIdFactory.listener)
                        this.$dbIdFactory.listener(dbId);
                }
                this.setData("dbId", dbId, dbId);
            }
        }
        return dbId;
    }

    setDbId(dbId: any) {
        if(this.document)
            this.document.set("dbId", dbId);
    }

    hasData(name: string) {
        return this.document && this.document.hasData(name);
    }

    getData(name: string) {
        return this.document ? this.document.getData(name) || null : null;
    }

    setData(name: string, value: any | null, dbId?: any | null) {
        if(!this.document) {
            this.document = new StoredDocument(this.category);
            this.document.set("dbId", dbId? dbId : this.getOrCreateDbId());
        }
        this.document.set(name, value);
    }
}

