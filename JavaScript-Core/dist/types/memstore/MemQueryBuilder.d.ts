import IQueryBuilder from '../store/IQueryBuilder';
import { AttributeInfo, MatchOp } from "../store";
import MemPredicate from "./MemPredicate";
import MemOrderBy from "./MemOrderBy";
import MemQuery from "./MemQuery";
export default class MemQueryBuilder implements IQueryBuilder {
    predicates: MemPredicate[] | null;
    first_: any | null;
    last_: any | null;
    projection: string[] | null;
    orderBys: MemOrderBy[] | null;
    constructor();
    verify(fieldInfo: AttributeInfo, matchOp: MatchOp, value: any): IQueryBuilder;
    and(): IQueryBuilder;
    or(): IQueryBuilder;
    not(): IQueryBuilder;
    first(value: any): IQueryBuilder;
    last(value: any): IQueryBuilder;
    build(): MemQuery;
    project(projection: string[]): IQueryBuilder;
    orderBy(info: AttributeInfo, descending: boolean): IQueryBuilder;
}
