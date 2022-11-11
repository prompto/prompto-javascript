import { DateTime } from "../intrinsic";
export default interface IAuditMetadata {
    dbId: any;
    utcTimestamp: DateTime;
}
