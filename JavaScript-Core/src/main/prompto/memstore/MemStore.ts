/* eslint-disable @typescript-eslint/no-unsafe-assignment,no-unused-labels,@typescript-eslint/no-unsafe-return */
import Store from '../store/Store'
import {MemQueryBuilder, StorableDocument, AuditRecord, AuditMetadata, StoredDocument} from '../memstore'
import {Cursor, DateTime, Document, List} from '../intrinsic'
import {IStored} from "../store";
import MemQuery from "./MemQuery";
import MemOrderBy from "./MemOrderBy";
import IDbIdFactory from "../store/IDbIdFactory";

type Tuple = (any | null)[];

// a utility class for running tests only
export default class MemStore extends Store {

    nextDbId = 1;
    documents = new Map<any, StoredDocument>();
    sequences = new Map<string, number>();
    nextAuditDbId = 1;
    auditRecords = new Map<any, AuditRecord>();
    nextAuditMetadataDbId = 1;
    auditMetadatas = new Map<any, AuditMetadata>();

    constructor() {
        super();
}

    nextSequenceValue(name: string) {
        const value = (this.sequences.get(name) || 0) + 1;
        this.sequences.set(name, value);
        return value;
    }

    flush() {
        // nothing to do
    }

    isDbIdType(type: string) {
        return type == typeof(this.nextDbId);
    }

    deleteAndStore(toDel: any[] | null, toAdd: StorableDocument[] | null, auditMeta: AuditMetadata | null) {
        this.deleteAndStoreAsync(toDel, toAdd, auditMeta, null);
    }

    deleteAndStoreAsync(toDel: any[] | null, toAdd: StorableDocument[] | null, auditMeta: AuditMetadata | null, andThen: null | (() => void)) {
        auditMeta = this.storeAuditMetadata(auditMeta);
        if(toDel)
            toDel.forEach(dbId => this.doDelete(dbId, auditMeta!), this);
        if(toAdd)
            toAdd.forEach(doc => this.doStore(doc, auditMeta!), this);
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

    storeAuditMetadata(auditMeta: AuditMetadata | null): AuditMetadata {
        // ensure auditMeta has all required fields
        if(auditMeta && !auditMeta.dbId) {
            const old = auditMeta;
            auditMeta = this.newAuditMetadata();
            for(const key in old.keys())
                auditMeta.set(key, old.get(key));
        } else if(!auditMeta)
            auditMeta = this.newAuditMetadata();
        this.auditMetadatas.set(auditMeta.dbId, auditMeta);
        return auditMeta;

    }

    doDelete(dbId: any, auditMeta: AuditMetadata) {
        this.documents.delete(dbId);
        const audit = this.newAuditRecord(auditMeta);
        audit.instanceDbId = dbId;
        audit.operation = "DELETE";
        this.auditRecords.set(audit.dbId, audit);
    }

    doStore(storable: StorableDocument, auditMeta: AuditMetadata) {
        const data = storable.document;
        if(data && data.dbId) {
            const previous = this.documents.get(data.dbId) || null;
            let toStore = new StoredDocument(data.category);
            if(previous)
                toStore = Object.assign(toStore, previous, data);
            else
                toStore = Object.assign(toStore, data);
            this.documents.set(data.dbId, toStore);
            const audit = this.newAuditRecord(auditMeta);
            audit.instanceDbId = data.dbId;
            audit.operation = previous != null ? "UPDATE" : "INSERT";
            audit.instance = storable;
            this.auditRecords.set(audit.dbId, audit);
        }
    }

    newAuditRecord(auditMeta: AuditMetadata) {
        const audit = new AuditRecord();
        audit.dbId = this.nextAuditDbId++;
        audit.metadataDbId = auditMeta.dbId;
        audit.utcTimestamp = auditMeta.utcTimestamp;
        return audit;
    }

    fetchUnique(dbId: any): StoredDocument | null {
        return this.documents.get(dbId) || null;
    }

    fetchOne(query: MemQuery): StoredDocument | null {
        if(query.predicate) for (const doc of this.documents.values()) {
            if(doc.matches(query.predicate))
                return query.projection == null ? doc : doc.project(query.projection);
        }
        return null;
    }

    fetchOneAsync(query: MemQuery, andThen: (store: IStored | null) => void) {
        const record = this.fetchOne(query);
        andThen(record);
    }

    fetchMany(query: MemQuery): Cursor<StoredDocument> {
        let docs = this.fetchMatching(query);
        const totalCount = docs.length;
        docs = this.sort(query, docs);
        docs = this.slice(query, docs);
        if(query.projection)
            docs = docs.map(doc => doc.project(query.projection!));
        let index = 0;
        const iterable = {
            count: () => docs.length,
            totalCount: () => totalCount,
            iterator: () => {
                hasNext: () => index < docs.length;
                next: () => docs[index++];
            }
        };
        return new Cursor(false, iterable)
    }

    fetchManyAsync(query: MemQuery, andThen: (cursor: Cursor<IStored>) => void) {
        const cursor = this.fetchMany(query);
        andThen(cursor);
    }

    slice(query: MemQuery, docs: StoredDocument[]): StoredDocument[] {
        if(docs.length == 0 || (query.first==null && query.last==null))
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

    sort(query: MemQuery, docs: StoredDocument[]): StoredDocument[] {
        if(!query.orderBys || docs.length<2)
            return docs;
        docs.sort( (doc1, doc2) => this.compareDocuments(doc1, doc2, query.orderBys!));
        return docs;
    }

    compareDocuments(doc1: StoredDocument, doc2: StoredDocument, orderBys: MemOrderBy[]) {
        const tuple1 = this.readTuple(doc1, orderBys);
        const tuple2 = this.readTuple(doc2, orderBys);
        return this.compareTuples(tuple1, tuple2, orderBys);
    }

    readTuple(doc: StoredDocument, orderBys: MemOrderBy[]): Tuple {
        return orderBys.map(orderBy => this.readValue(doc, orderBy), this);
    }

    readValue(doc: StoredDocument, orderBy: MemOrderBy): any | null {
        // TODO drill-down
        return doc.get(orderBy.info.name) || null;
    }

    compareTuples(tuple1: Tuple, tuple2: Tuple, orderBys: MemOrderBy[]) {
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

    fetchMatching(query: MemQuery): StoredDocument[] {
        const docs = [];
        if(query.predicate) for (const doc of this.documents.values()) {
            if(doc.matches(query.predicate))
                docs.push(doc);
        }
        return docs;
    }

    newQueryBuilder() {
        return new MemQueryBuilder();
    }

    newStorableDocument(categories: string[], dbIdFactory: IDbIdFactory | null): StorableDocument {
        return new StorableDocument(categories, dbIdFactory);
    }

    fetchLatestAuditMetadataId(dbId: any): any | null {
        for(const record of this.auditRecords.values()) {
            if(record.instanceDbId == dbId)
                return record.metadataDbId;
        }
        return null;
    }

    fetchAllAuditMetadataIds(dbId: any): List<any> {
        const dbIds = [];
        for(const record of this.auditRecords.values()) {
            if(record.instanceDbId == dbId)
                dbIds.push(record.metadataDbId);
        }
        return new List(false, dbIds);
    }

    fetchAuditMetadata(dbId: any): AuditMetadata | null {
        return this.auditMetadatas.get(dbId) || null;
    }

    fetchAuditMetadataAsDocument(dbId: any): Document<string, any> | null {
        const auditMeta = this.fetchAuditMetadata(dbId);
        if(auditMeta) {
            const result = new Document();
            Object.keys(auditMeta).forEach(key => result.$safe_setMember(key, auditMeta.get(key)));
            return result;
        } else
            return null;
     }

    fetchLatestAuditRecord(dbId: any): AuditRecord | null {
        const audits = this.fetchAllAuditRecords(dbId);
        return audits.length > 0 ? audits[0] : null;
    }

    fetchLatestAuditRecordAsDocument(dbId: any): Document<string, any> | null {
        const record = this.fetchLatestAuditRecord(dbId);
        return record == null ? null : record.asDocument();
    }

    fetchAllAuditRecords(dbId: any): List<AuditRecord> {
        let values = Array.from(this.auditRecords.values());
        values = values.filter(a => a.instanceDbId == dbId).sort((a1, a2) => a2.utcTimestamp.compareTo(a1.utcTimestamp));
        return new List<AuditRecord>(false, values);
    }

    fetchAllAuditRecordsAsDocuments(dbId: any): List<Document<string, any>> {
        const values = this.fetchAllAuditRecords(dbId).map(a => a.asDocument());
        return new List<Document<string, any>>(false, values);
    }

    fetchDbIdsAffectedByAuditMetadataId(dbId: any): List<any> {
        const values = Array.from(this.auditRecords.values()).filter(a => a.metadataDbId == dbId).map(a => a.instanceDbId);
        return new List<any>(false, values);
    }

    fetchAuditRecordsMatching(auditPredicates: Map<string, any> | null, instancePredicates: Map<string, any> | null): List<AuditRecord> {
        const values = Array.from(this.auditRecords.values()).filter(a => a.matches(auditPredicates, instancePredicates));
        return new List<AuditRecord>(false, values);
    }

    fetchAuditRecordsMatchingAsDocuments(auditPredicates: Map<string, any> | null, instancePredicates: Map<string, any> | null): List<Document<string, any>> {
        const values = this.fetchAuditRecordsMatching(auditPredicates, instancePredicates).map(a => a.asDocument());
        return new List<Document<string, any>>(false, values);
    }

    deleteAuditRecord(dbId: any): boolean {
        return this.auditRecords.delete(dbId);
    }

    deleteAuditMetadata(dbId: any): boolean {
        return this.auditMetadatas.delete(dbId);
    }

}
