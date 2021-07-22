import { Document } from "../intrinsic/index.js"

export default class Store {
  
    nextSequenceValue(name) {
        throw new Error("Must override nextSequenceValue!");
    }

    newQueryBuilder() {
        throw new Error("Must override newQueryBuilder!");
    }

    newStorableDocument(categories, dbIdFactory) {
        throw new Error("Must override newStorableDocument!");
    }

    deleteAndStore(add, del, meta) {
        throw new Error("Must override deleteAndStore!");
    }

    deleteAndStoreAsync(add, del, meta, andThen) {
        throw new Error("Must override deleteAndStoreAsync!");
    }

    fetchUnique(dbId) {
        throw new Error("Must override fetchUnique!");
    }

    fetchOne(query) {
        throw new Error("Must override fetchOne!");
    }

    fetchMany(query) {
        throw new Error("Must override fetchMany!");
    }

    fetchLatestAuditMetadataId(dbId) {
        throw new Error("Must override fetchLatestAuditMetadataId!");
    }

    fetchAllAuditMetadataIds(dbId) {
        throw new Error("Must override fetchAllAuditMetadataIds!");
    }

    fetchAuditMetadata(dbId) {
        throw new Error("Must override fetchAuditMetadata!");
    }

    fetchAuditMetadataAsDocument(dbId) {
        const auditMeta = this.fetchAuditMetadata(dbId);
        const result = auditMeta ? new Document() : null;
        if(result)
            Object.keys(auditMeta).forEach(key => result[key] = auditMeta[key]);
         return result;
    }
}



