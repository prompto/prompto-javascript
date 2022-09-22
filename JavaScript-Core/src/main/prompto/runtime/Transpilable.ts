import {Transpiler} from "./index";

export default interface Transpilable {
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
}
