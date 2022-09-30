/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return */
import IAuditRecord from "../store/IAuditRecord";
import {DateTime, Document} from "../intrinsic";
import {StorableDocument} from "./index";

export default class AuditRecord extends Map<string, any> implements IAuditRecord  {

    dbId: any;
    instanceDbId: any;
    metadataDbId: any;
    utcTimestamp: DateTime;
    operation: "INSERT" | "UPDATE" | "DELETE";
    instance?: StorableDocument | null;

    asDocument(): Document<string, any> {
        const doc = {
            dbId: this.dbId,
            metadataDbId: this.metadataDbId,
            utcTimeStamp: this.utcTimestamp,
            instanceDbId: this.instanceDbId,
            operation: this.operation,
            instance: this.convertInstance(this.instance)
        }
        return Object.assign(new Document<string, any>(), doc);
    }

    convertInstance(instance: StorableDocument | null | undefined): any | undefined {
        if(instance) {
            if(instance.document) {
                return Object.assign({}, ...instance.document);
            }
        }
    }

    matches(auditPredicates: Map<string, any> | null, instancePredicates: Map<string, any> | null) {
        if ((auditPredicates ? auditPredicates.size : 0) + (instancePredicates ? instancePredicates.size : 0) == 0)
            return false;
        else
            return (auditPredicates ? this.auditMatchesAll(auditPredicates) : true) && (instancePredicates ? this.instanceMatchesAll(instancePredicates) : true);
    }

    auditMatchesAll(predicates: Map<string, any>) {
        return Array.from(predicates.keys()).every( key => this.auditMatches(key, predicates.get(key)), this);
    }

    instanceMatchesAll(predicates: Map<string, any>) {
        return this.instance && Array.from(predicates.keys()).every( key => this.instanceMatches(key, predicates.get(key)), this);
    }

    auditMatches(name: string, value: any) {
        return AuditRecord.valuesMatch(name, value, this);
    }

    instanceMatches(name: string, value: any) {
        return AuditRecord.valuesMatch(name, value, this.instance!.document);
    }

    static valuesMatch(name: string, v1: any, v2: any) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const val1 = v1[name as keyof typeof v1];
        const val2 = v2[name as keyof typeof v2];
        if(val1 == val2)
            return true;
        let equals = val1["equals" as keyof typeof val1] as (obj: any) => boolean;
        if(equals)
            return equals.bind(val1)(val2);
        equals = val2["equals" as keyof typeof val2] as (obj: any) => boolean;
        if(equals)
            return equals.bind(val2)(val1);
        return false;
    }

}
