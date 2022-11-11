import { AttributeInfo, IStored, MatchOp } from '../store';
import MemPredicate from "./MemPredicate";
export default class MatchPredicate implements MemPredicate {
    info: AttributeInfo;
    matchOp: MatchOp;
    value: any;
    constructor(info: AttributeInfo, matchOp: MatchOp, value: any);
    matches(stored: IStored): boolean;
    matchesData(data: any): boolean;
}
