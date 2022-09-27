import {Transpiler} from "./index";

export default interface ITranspilable {
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
}
