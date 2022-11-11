import Section from '../parser/Section';
import Identifier from "./Identifier";
import { DocEntryList } from "../literal";
import { IExpression } from "../expression";
import { CodeWriter } from "../utils";
import { Context } from "../runtime";
import { CategoryDeclaration } from "../declaration";
export default class Annotation extends Section {
    id: Identifier;
    entries: DocEntryList;
    constructor(id: Identifier, entries: DocEntryList);
    get name(): string;
    getDefaultArgument(): IExpression | null;
    getArgument(name: string): IExpression | null;
    toDialect(writer: CodeWriter): void;
    processCategory(context: Context, declaration: CategoryDeclaration<any>): void;
}
