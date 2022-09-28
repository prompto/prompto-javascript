import {CodeWriter} from "../utils";
import {Transpiler} from '../runtime';
import {Section} from "../parser";

export default interface IDocEntryKey {

    check(context: CodeWriter): void;
    transpile(transpiler: Transpiler): void;
    asSection(): Section;
}
