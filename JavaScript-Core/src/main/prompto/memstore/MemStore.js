import Store from '../../../main/prompto/store/Store.ts'
import {MemQueryBuilder, StorableDocument, AuditRecord, AuditMetadata, StoredDocument} from '../memstore'
import {DateTime, Document, List} from '../intrinsic'

// a utility class for running tests only
export default class MemStore extends Store {

    constructor() {
        super();
        this.sequences = {};
        this.documents = {};
        this.nextDbId = 1;
        this.auditRecords = {};
        this.nextAuditDbId = 1;
        this.auditMetadatas = {};
        this.nextAuditMetadataDbId = 1;
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
        meta.dbId = this.nextAuditMetadataDbId++;
        meta.utcTimestamp = DateTime.now();
        return meta;
    }

    storeAuditMetadata(auditMeta) {
        if(auditMeta && !auditMeta.dbId) {
            const doc = auditMeta;
            auditMeta = this.newAuditMetadata();
            doc.$user_keys.forEach(key => auditMeta[key] = doc[key]);
        } else if(auditMeta==null)
            auditMeta = this.newAuditMetadata();
        this.auditMetadatas[auditMeta.dbId] = auditMeta;
        return auditMeta;

    }

    doDelete(dbId, auditMeta) {
        delete this.documents[dbId];
        const audit = this.newAuditRecord(auditMeta);
        audit.instanceDbId = dbId;
        audit.operation = "DELETE";
        this.auditRecords[audit.dbId] = audit;
    }

    doStore(storable, auditMeta) {
        let data = storable.document;
        if(data.dbId) {
            const previous = this.documents[data.dbId] || null;
            const toStore = new StoredDocument(data.category);
            if(previous)
                Object.assign(toStore, previous, data);
            else
                Object.assign(toStore, data);
            this.documents[data.dbId] = toStore;
            const audit = this.newAuditRecord(auditMeta);
            audit.instanceDbId = data.dbId;
            audit.operation = previous != null ? "UPDATE" : "INSERT";
            audit.instance = storable;
            this.auditRecords[audit.dbId] = audit;
        }
    }

    newAuditRecord(auditMeta) {
        const audit = new AuditRecord();
        audit.dbId = this.nextAuditDbId++;
        audit.metadataDbId = auditMeta.dbId;
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
                return query.projection == null ? doc : doc.project(query.projection);
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
        if(query.projection!=null)
            docs = docs.map(doc => doc.project(query.projection));
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
        const found = Object.values(this.auditRecords).filter(a => a.instanceDbId === dbId )[0] || null;
        return found ? found.metadataDbId : null;
    }

    fetchAllAuditMetadataIds(dbId) {
        const items = Object.values(this.auditRecords).filter(a => a.instanceDbId === dbId ).map(a => a.metadataDbId);
        return new List(false, items);
    }

    fetchAuditMetadata(dbId) {
        return this.auditMetadatas[dbId] || null;
    }

    fetchAuditMetadataAsDocument(dbId) {
        const auditMeta = this.fetchAuditMetadata(dbId);
        const result = auditMeta ? new Document() : null;
        if (result)
            Object.keys(auditMeta).forEach(key => result[key] = auditMeta[key]);
        return result;
    }

    fetchLatestAuditRecord(dbId) {
        const audits = this.fetchAllAuditRecords(dbId);
        return audits.length > 0 ? audits[0] : null;
    }

    fetchLatestAuditRecordAsDocument(dbId) {
        const record = this.fetchLatestAuditRecord(dbId);
        return record === null ? null : record.asDocument();
    }

    fetchAllAuditRecords(dbId) {
        return Object.values(this.auditRecords).filter(a => a.instanceDbId === dbId).sort((a1, a2) => a2.utcTimestamp.compareTo(a1.utcTimestamp));
    }

    fetchAllAuditRecordsAsDocuments(dbId) {
        return this.fetchAllAuditRecords(dbId).map(a => a.asDocument());
    }

    fetchDbIdsAffectedByAuditMetadataId(dbId) {
        return Object.values(this.auditRecords).filter(a => a.metadataDbId === dbId).map(a => a.instanceDbId);
    }

    fetchAuditRecordsMatching(auditPredicates, instancePredicates){
        return Object.values(this.auditRecords).filter(a => a.matches(auditPredicates, instancePredicates));
    }

    fetchAuditRecordsMatchingAsDocuments(auditPredicates, instancePredicates){
        return this.fetchAuditRecordsMatching(auditPredicates, instancePredicates).map(a => a.asDocument());
    }

    deleteAuditRecord(dbId){
        if(this.auditRecords[dbId]) {
            delete this.auditRecords[dbId];
            return true;
        } else
            return false;
    }

    deleteAuditMetadata(dbId){
        if(this.auditMetadatas[dbId]) {
            delete this.auditMetadatas[dbId];
            return true;
        } else
            return false;
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
