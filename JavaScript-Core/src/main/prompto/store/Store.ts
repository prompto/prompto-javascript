import {IQueryBuilder, IStored, IStorable} from "./index";
import IQuery from "./IQuery";
import IDbIdFactory from "./IDbIdFactory";
import {Cursor, Document, List} from "../intrinsic";
import IAuditMedata from "./IAuditMedata";
import IAuditRecord from "./IAuditRecord";

export default class Store {
  
    nextSequenceValue(name: string): number {
        throw new Error("Must override nextSequenceValue!");
    }

    newQueryBuilder(): IQueryBuilder {
        throw new Error("Must override newQueryBuilder!");
    }

    newStorableDocument(categories: string[], dbIdFactory: IDbIdFactory | null): void {
        throw new Error("Must override newStorableDocument!");
    }

    deleteAndStore(add: IStorable[] | null, del: any[] | null, meta: IAuditMedata | null): void {
        throw new Error("Must override deleteAndStore!");
    }

    deleteAndStoreAsync(add: IStorable[] | null, del: any[] | null, meta: IAuditMedata | null, andThen: () => void) {
        throw new Error("Must override deleteAndStoreAsync!");
    }

    fetchUnique(dbId: any): IStored | null {
        throw new Error("Must override fetchUnique!");
    }

    fetchOne(query: IQuery): IStored | null {
        throw new Error("Must override fetchOne!");
    }

    fetchMany(query: IQuery): Cursor<IStored> {
        throw new Error("Must override fetchMany!");
    }

    fetchManyAsync(query: IQuery, andThen: (cursor: Cursor<IStored>) => void): void {
        throw new Error("Must override fetchManyAsync!");
    }

    isAuditEnabled(): boolean {
        throw new Error("Must override isAuditEnabled!");
    }

    newAuditMetadata(): IAuditMedata {
        throw new Error("Must override newAuditMetadata!");
    }

    fetchLatestAuditMetadataId(dbId: any): IAuditMedata | null {
        throw new Error("Must override fetchLatestAuditMetadataId!");
    }

    fetchAllAuditMetadataIds(dbId: any): List<any> {
        throw new Error("Must override fetchAllAuditMetadataIds!");
    }

    fetchAuditMetadata(dbId: any): IAuditMedata | null {
        throw new Error("Must override fetchAuditMetadata!");
    }

    fetchAuditMetadataAsDocument(dbId: any): Document<string, any> | null {
        throw new Error("Must override fetchAuditMetadataAsDocument!");
    }

    fetchLatestAuditRecord(dbId: any): IAuditRecord | null {
        throw new Error("Must override fetchLatestAuditRecord!");
    }

    fetchLatestAuditRecordAsDocument(dbId: any): Document<string, any> | null {
        throw new Error("Must override fetchLatestAuditRecordAsDocument!");
    }

    fetchAllAuditRecords(dbId: any): List<IAuditRecord> {
        throw new Error("Must override fetchAllAuditRecords!");
    }

    fetchAllAuditRecordsAsDocuments(dbId: any): List<Document<string, any>> {
        throw new Error("Must override fetchAllAuditRecordsAsDocuments!");
    }

    fetchDbIdsAffectedByAuditMetadataId(dbId: any): List<any> {
        throw new Error("Must override fetchDbIdsAffectedByAuditMetadataId!");
    }

    fetchAuditRecordsMatching(auditPredicates: Map<string, any> | null, instancePredicates: Map<string, any> | null): List<IAuditRecord>{
        throw new Error("Must override fetchAuditRecordsMatching!");
    }

    fetchAuditRecordsMatchingAsDocuments(auditPredicates: Map<string, any> | null, instancePredicates: Map<string, any> | null): List<Document<string, any>>{
        throw new Error("Must override fetchAuditRecordsMatchingAsDocuments!");
    }

    deleteAuditRecord(dbId: any): void {
        throw new Error("Must override deleteAuditRecord!");
    }

    deleteAuditMetadata(dbId: any): void {
        throw new Error("Must override deleteAuditMetadata!");
    }
}



