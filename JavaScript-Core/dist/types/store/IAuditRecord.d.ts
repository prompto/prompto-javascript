import { DateTime } from "../intrinsic";
export default interface IAuditRecord {
    dbId: any;
    instanceDbId: any;
    metadataDbId: any;
    operation: "INSERT" | "UPDATE" | "DELETE";
    utcTimestamp: DateTime;
}
