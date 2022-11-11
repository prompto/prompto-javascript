import { DictEntry } from "./index";
import ObjectList from "../utils/ObjectList";
import { CodeWriter } from "../utils";
import { Transpiler } from "../runtime";
export default class DictEntryList extends ObjectList<DictEntry> {
    constructor(entries?: DictEntry[], entry?: DictEntry);
    toDialect(writer: CodeWriter): void;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
    toString(): string;
}
