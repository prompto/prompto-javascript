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

    isAuditEnabled() {
        throw new Error("Must override isAuditEnabled!");
    }

    newAuditMetadata() {
        throw new Error("Must override newAuditMetadata!");
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
        throw new Error("Must override fetchAuditMetadataAsDocument!");
    }

    fetchLatestAuditRecord(dbId) {
        throw new Error("Must override fetchLatestAuditRecord!");
    }

    fetchLatestAuditRecordAsDocument(dbId) {
        throw new Error("Must override fetchLatestAuditRecordAsDocument!");
    }

    fetchAllAuditRecords(dbId) {
        throw new Error("Must override fetchAllAuditRecords!");
    }

    fetchAllAuditRecordsAsDocuments(dbId) {
        throw new Error("Must override fetchAllAuditRecordsAsDocuments!");
    }

    fetchDbIdsAffectedByAuditMetadataId(dbId) {
        throw new Error("Must override fetchDbIdsAffectedByAuditMetadataId!");
    }

    fetchAuditRecordsMatching(auditPredicates, instancePredicates){
        throw new Error("Must override fetchAuditRecordsMatching!");
    }

    fetchAuditRecordsMatchingAsDocuments(auditPredicates, instancePredicates){
        throw new Error("Must override fetchAuditRecordsMatchingAsDocuments!");
    }

    deleteAuditRecord(dbId){
        throw new Error("Must override deleteAuditRecord!");
    }

    deleteAuditMetadata(dbId){
        throw new Error("Must override deleteAuditMetadata!");
    }
}



