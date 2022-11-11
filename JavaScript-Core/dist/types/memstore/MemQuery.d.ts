import IQuery from "../store/IQuery";
import MemPredicate from "./MemPredicate";
import MemOrderBy from "./MemOrderBy";
export default interface MemQuery extends IQuery {
    predicate: MemPredicate | null;
    first: number | null;
    last: number | null;
    projection: string[] | null;
    orderBys: MemOrderBy[] | null;
}
