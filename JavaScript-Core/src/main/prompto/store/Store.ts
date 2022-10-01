import {IQueryBuilder, IStored, IStorable} from "./index";
import IQuery from "./IQuery";
import IDbIdFactory from "./IDbIdFactory";
import {Cursor, Document, List} from "../intrinsic";
import IAuditMetadata from "./IAuditMetadata";
import IAuditRecord from "./IAuditRecord";

export default abstract class Store {

    abstract flush(): void;
    abstract nextSequenceValue(name: string): number;
    abstract newQueryBuilder(): IQueryBuilder;
    abstract newStorableDocument(categories: string[], dbIdFactory: IDbIdFactory | null): IStorable;
    abstract deleteAndStore(toDel: any[] | null, toAdd: IStorable[] | null, meta: IAuditMetadata | null): void;
    abstract deleteAndStoreAsync(toDel: any[] | null, toAdd: IStorable[] | null, meta: IAuditMetadata | null, andThen: () => void): void;
    abstract fetchUnique(dbId: any): IStored | null;
    abstract fetchOne(query: IQuery): IStored | null;
    abstract fetchMany(query: IQuery): Cursor<IStored>;
    abstract fetchManyAsync(query: IQuery, andThen: (cursor: Cursor<IStored>) => void): void;
    abstract isAuditEnabled(): boolean;
    abstract newAuditMetadata(): IAuditMetadata;
    abstract fetchLatestAuditMetadataId(dbId: any): IAuditMetadata | null;
    abstract fetchAllAuditMetadataIds(dbId: any): List<any>;
    abstract fetchAuditMetadata(dbId: any): IAuditMetadata | null;
    abstract fetchAuditMetadataAsDocument(dbId: any): Document<string, any> | null;
    abstract fetchLatestAuditRecord(dbId: any): IAuditRecord | null;
    abstract fetchLatestAuditRecordAsDocument(dbId: any): Document<string, any> | null;
    abstract fetchAllAuditRecords(dbId: any): List<IAuditRecord>;
    abstract fetchAllAuditRecordsAsDocuments(dbId: any): List<Document<string, any>>;
    abstract fetchDbIdsAffectedByAuditMetadataId(dbId: any): List<any>;
    abstract fetchAuditRecordsMatching(auditPredicates: Map<string, any> | null, instancePredicates: Map<string, any> | null): List<IAuditRecord>;
    abstract fetchAuditRecordsMatchingAsDocuments(auditPredicates: Map<string, any> | null, instancePredicates: Map<string, any> | null): List<Document<string, any>>;
    abstract deleteAuditRecord(dbId: any): void;
    abstract deleteAuditMetadata(dbId: any): void;
    abstract isDbIdType(value: any): boolean;
}



