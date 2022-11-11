import Section from '../parser/Section';
import { IdentifierList } from "./index";
import { CodeWriter } from "../utils";
import { Context, Transpiler } from "../runtime";
import { IQueryBuilder } from "../store";
export default class OrderByClause extends Section {
    ids: IdentifierList;
    descending: boolean;
    constructor(ids: IdentifierList, descending: boolean);
    toDialect(writer: CodeWriter): void;
    checkQuery(context: Context): void;
    interpretQuery(context: Context, query: IQueryBuilder): void;
    declare(transpiler: Transpiler): void;
    transpileQuery(transpiler: Transpiler, builderName: string): void;
}
