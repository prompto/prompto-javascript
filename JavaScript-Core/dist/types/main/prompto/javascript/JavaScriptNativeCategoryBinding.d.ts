import { JavaScriptModule } from "./index";
import { Transpiler } from "../runtime";
import { CodeWriter } from "../utils";
import { INativeCategoryBinding } from "../grammar";
export default class JavaScriptNativeCategoryBinding implements INativeCategoryBinding {
    identifier: string;
    module: JavaScriptModule | null;
    constructor(identifier: string, module: JavaScriptModule | null);
    resolve(): (() => any) | null;
    resolve_field(m: object | null): (() => any) | null;
    resolve_module(): object | null;
    resolveWidget(): (() => any) | null;
    resolve_widget_module(): object | null;
    toDialect(writer: CodeWriter): void;
    transpile(transpiler: Transpiler): void;
    transpileWidget(transpiler: Transpiler): void;
}
