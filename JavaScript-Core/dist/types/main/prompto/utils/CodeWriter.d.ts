import { Context } from '../runtime';
import { Dialect } from "../parser";
import IWritable from "./IWritable";
import { CategoryType } from "../type";
declare class Indenter {
    value: string;
    indents: string;
    isStartOfLine: boolean;
    constructor();
    appendTabsIfRequired(s: string): void;
    append(s: string): void;
    trimLast(count: number): void;
    indent(): void;
    dedent(): void;
}
export default class CodeWriter {
    dialect: Dialect;
    context: Context;
    indenter: Indenter;
    escapeMode: number;
    constructor(dialect: Dialect, context: Context, indenter?: Indenter);
    isGlobalContext(): boolean;
    appendRaw(s: string): this;
    append(s: string): this;
    trimLast(count: number): this;
    indent(): this;
    dedent(): this;
    newLine(): this;
    toString(): string;
    newLocalWriter(): CodeWriter;
    newChildWriter(context?: Context): CodeWriter;
    newInstanceWriter(type: CategoryType): CodeWriter;
    newDocumentWriter(): CodeWriter;
    newMemberWriter(): CodeWriter;
    toDialect(writable: IWritable): void;
}
export {};
