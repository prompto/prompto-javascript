import Store from '../store/Store.js'
import { MemQueryBuilder, StorableDocument, AuditRecord, AuditMetadata } from './index.js'
import { DateTime, List } from '../intrinsic/index.js'

// a utility class for running tests only
export default class MemStore extends Store {

    constructor() {
        super();
        this.sequences = {};
        this.documents = {};
        this.nextDbId = 1;
        this.audits = {};
        this.nextAuditId = 1;
        this.auditMetadatas = {};
        this.nextAuditMetadataId = 1;
    }

    nextSequenceValue(name) {
        const value = (this.sequences[name] || 0) + 1;
        this.sequences[name] = value;
        return value;
    }

    flush() {
        // nothing to do
    }

    isDbIdType(type) {
        return type === typeof(this.nextDbId);
    }

    deleteAndStore(todel, toadd, auditMeta, andThen) {
        auditMeta = this.storeAuditMetadata(auditMeta);
        if(todel)
            todel.forEach(dbId => this.doDelete(dbId, auditMeta), this);
        if(toadd)
            toadd.forEach(doc => this.doStore(doc, auditMeta), this);
        if(andThen)
            andThen();
    }

    isAuditEnabled() {
        return true;
    }

    newAuditMetadata() {
        const meta = new AuditMetadata();
        meta.dbId = this.nextAuditMetadataId++;
        meta.utcTimestamp = DateTime.now();
        return meta;
    }

    storeAuditMetadata(auditMeta) {
        if(auditMeta==null)
            auditMeta = this.newAuditMetadata();
        this.auditMetadatas[auditMeta.dbId] = auditMeta;
        return auditMeta;

    }

    doDelete(dbId, auditMeta) {
        delete this.documents[dbId];
        const audit = this.newAuditRecord(auditMeta);
        audit.instanceId = dbId;
        audit.operation = "DELETE";
        this.audits[audit.dbId] = audit;
    }

    doStore(doc, auditMeta) {
        const data = doc.document;
        if(data.dbId) {
            const isInsert = this.documents[data.dbId] || false;
            this.documents[data.dbId] = data;
            const audit = this.newAuditRecord(auditMeta);
            audit.instanceId = data.dbId;
            audit.operation = isInsert ? "INSERT" : "UPDATE";
            audit.instance = doc;
            this.audits[audit.dbId] = audit;
        }
    }

    newAuditRecord(auditMeta) {
        const audit = new AuditRecord();
        audit.dbId = this.nextAuditId++;
        audit.auditMetadataId = auditMeta.dbId;
        audit.utcTimestamp = auditMeta.utcTimestamp;
        return audit;
    }

    fetchUnique(dbId) {
        return this.documents[dbId] || null;
    }

    fetchOne(query) {
        for (const dbId in this.documents) {
            const doc = this.documents[dbId];
            if(doc.matches(query.predicate))
                return doc;
        }
        return null;
    }

    fetchOneAsync(query, andThen) {
        const record = this.fetchOne(query);
        andThen(record);
    }

    fetchMany(query, mutable) {
        let docs = this.fetchMatching(query);
        const totalCount = docs.length;
        docs = this.sort(query, docs);
        docs = this.slice(query, docs);
        const iterable = new StoredIterable(docs, totalCount);
        return new MemStore.Cursor(mutable, iterable)
    }

    fetchManyAsync(query, mutable, andThen) {
        const cursor = this.fetchMany(query, mutable);
        andThen(cursor);
    }

    slice(query, docs) {
        if(docs.length === 0 || (query.first==null && query.last==null))
            return docs;
        let firstValue = query.first;
        if(firstValue==null || firstValue<1)
            firstValue = 1;
        let lastValue = query.last;
        if(lastValue==null || lastValue>docs.length)
            lastValue = docs.length;
        if(firstValue>docs.length || firstValue > lastValue)
            return [];
        return docs.slice(firstValue - 1, lastValue);
    }

    sort(query, docs) {
        if(!query.orderBys || docs.length<2)
            return docs;
        const self = this;
        docs.sort( (doc1, doc2) => {
            const tuple1 = self.readTuple(doc1, query.orderBys);
            const tuple2 = self.readTuple(doc2, query.orderBys);
            return self.compareTuples(tuple1, tuple2, query.orderBys);
        });
        return docs;
    }

    compareTuples(tuple1, tuple2, orderBys) {
        for(let i=0;i<tuple1.length;i++) {
            const descending = i<orderBys.length ? orderBys[i].descending : false;
            if(i>=tuple2.length)
                return descending ? -1 : 1;
            const val1 = tuple1[i];
            const val2 = tuple2[i];
            if(val1==null && val2==null)
                continue;
            else if(val1==null)
                return descending ? 1 : -1;
            else if(val2==null)
                return descending ? -1 : 1;
            const res = val1 < val2 ? -1 : val2 < val1 ? 1 : 0;
            if(res)
                return descending ? -res : res;
        }
        return 0;
    }

    readTuple(doc, orderBys) {
        return orderBys.map(function(ob) {
            return this.readValue(doc, ob);
        }, this);
    }

    readValue(doc, orderBy) {
        // TODO drill-down
        return doc[orderBy.info.name];
    }

    fetchMatching(query) {
        const docs = [];
        for (const dbId in this.documents) {
            const doc = this.documents[dbId];
            if(doc.matches(query.predicate))
                docs.push(doc);
        }
        return docs;
    }

    newQueryBuilder() {
        return new MemQueryBuilder();
    }

    newStorableDocument(categories, dbIdFactory) {
        return new StorableDocument(categories, dbIdFactory);
    }

    fetchLatestAuditMetadataId(dbId) {
        const found = Object.values(this.audits).filter(a => a.instanceId === dbId )[0] || null;
        return found ? found.auditMetadataId : null;
    }

    fetchAllAuditMetadataIds(dbId) {
        const items = Object.values(this.audits).filter(a => a.instanceId === dbId ).map(a => a.dbId);
        return new List(false, items);
    }

    fetchAuditMetadata(dbId) {
        return this.auditMetadatas[dbId] || null;
    }
}


MemStore.prototype.deleteAndStoreAsync = MemStore.prototype.deleteAndStore;


function StoredIterable(docs, totalCount) {
    this.count = () => docs.length;
    this.totalCount = () => totalCount;
    this.iterator = () => {
        let index = 0;
        return {
            hasNext: function() { return index < docs.length; },
            next: function() { return docs[index++]; }
        };
    }
    return this;
}

export { MemStore }