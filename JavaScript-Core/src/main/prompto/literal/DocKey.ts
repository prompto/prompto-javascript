import {CodeWriter} from "../utils";
import {Transpiler} from '../runtime';

export default interface DocKey {

    check(context: CodeWriter): void;
    transpile(transpiler: Transpiler): void {;
}
