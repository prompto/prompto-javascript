import { AttributeInfo, MatchOp } from "./index";
import IQuery from "./IQuery";
export default interface IQueryBuilder {
    verify(fieldInfo: AttributeInfo, matchOp: MatchOp, value: any): IQueryBuilder;
    and(): IQueryBuilder;
    or(): IQueryBuilder;
    not(): IQueryBuilder;
    build(): IQuery;
    first(value: any): IQueryBuilder;
    last(value: any): IQueryBuilder;
    project(projection: string[]): IQueryBuilder;
    orderBy(fieldInfo: AttributeInfo, descending: boolean): IQueryBuilder;
}
