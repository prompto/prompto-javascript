import IAuditMetadata from "../store/IAuditMetadata";
import { DateTime } from "../intrinsic";
export default class AuditMetadata extends Map<string, any> implements IAuditMetadata {
    dbId: any;
    utcTimestamp: DateTime;
}
