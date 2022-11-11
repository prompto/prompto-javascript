import DocEntry from "./DocEntry";
import { CodeWriter } from "../utils";
import { Context, Transpiler } from "../runtime";
import ObjectList from "../utils/ObjectList";
export default class DocEntryList extends ObjectList<DocEntry> {
    constructor(entries?: DocEntry[], entry?: DocEntry);
    toDialect(writer: CodeWriter): void;
    check(context: Context): void;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
    toString(): string;
}
