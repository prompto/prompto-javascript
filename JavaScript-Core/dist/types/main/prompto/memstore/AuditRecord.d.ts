import IAuditRecord from "../store/IAuditRecord";
import { DateTime, Document } from "../intrinsic";
import { StorableDocument } from "./index";
export default class AuditRecord extends Map<string, any> implements IAuditRecord {
    dbId: any;
    instanceDbId: any;
    metadataDbId: any;
    utcTimestamp: DateTime;
    operation: "INSERT" | "UPDATE" | "DELETE";
    instance?: StorableDocument | null;
    asDocument(): Document<string, any>;
    convertInstance(instance: StorableDocument | null | undefined): any | undefined;
    matches(auditPredicates: Map<string, any> | null, instancePredicates: Map<string, any> | null): boolean;
    auditMatchesAll(predicates: Map<string, any>): boolean;
    instanceMatchesAll(predicates: Map<string, any>): boolean;
    auditMatches(name: string, value: any): any;
    instanceMatches(name: string, value: any): any;
    static valuesMatch(name: string, v1: any, v2: any): any;
}
