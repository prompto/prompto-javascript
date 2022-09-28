import IAuditMedata from "../store/IAuditMedata";
import {DateTime} from "../intrinsic";

export default class AuditMetadata extends Map<string, any> implements IAuditMedata {
    dbId: any;
    utcTimestamp: DateTime;
}
