import {CodeWriter} from "../utils";
import {Transpiler} from '../runtime';

export default interface IDocumentKey {

    check(context: CodeWriter): void;
    transpile(transpiler: Transpiler): void {;
}
