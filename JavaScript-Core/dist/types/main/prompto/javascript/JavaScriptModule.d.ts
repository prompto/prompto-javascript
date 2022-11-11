import { Transpiler } from "../runtime";
import { CodeWriter } from "../utils";
export default class JavaScriptModule {
    ids: string[];
    constructor(ids: string[]);
    toString(): string;
    resolve(): object | null;
    resolve_webpack(): object | null;
    resolve_module(): object | null;
    resolve_runtime(): object | null;
    resolve_path(part: string, replace?: string): object | null;
    transpileWidget(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler, name: string): void;
    transpile_intrinsic(transpiler: Transpiler, name: string): boolean;
    transpile_webpack(transpiler: Transpiler, name: string): boolean;
    transpile_module(transpiler: Transpiler, name: string): boolean;
    transpile_runtime(transpiler: Transpiler, name: string): boolean;
    transpile_path(transpiler: Transpiler, name: string, part: string, replaceBy?: string): boolean;
    toDialect(writer: CodeWriter): void;
}
