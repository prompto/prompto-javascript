import Key from "./Key";
import {Transpiler} from "../runtime";

export default abstract class DocKey extends Key {
    declare(transpiler: Transpiler): void {
        // nothing to do
    }
}
