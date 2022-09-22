import {MatchOp} from "./index";
import Query from "./Query";

export default interface QueryBuilder {

    verify(fieldName: string, matchOp: MatchOp, value: any): QueryBuilder;
    and(): QueryBuilder;
    or(): QueryBuilder;
    not(): QueryBuilder;
    build(): Query;
    first(value: any): QueryBuilder;
    last(value: any): QueryBuilder;
    project(projection: string[]): QueryBuilder;
    orderBy(field: string, descending: boolean): QueryBuilder;
}
