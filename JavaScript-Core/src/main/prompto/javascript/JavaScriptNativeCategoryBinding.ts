import INativeCategoryBinding from '../../../main/prompto/grammar/INativeCategoryBinding.js'
import {JavaScriptModule} from "./index";
import {Transpiler} from "../runtime";
import {CodeWriter} from "../utils";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
if(global && !global.Event)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    global.Event = () => {};

export default class JavaScriptNativeCategoryBinding extends INativeCategoryBinding {

    identifier: string;
    module: JavaScriptModule | null;

    constructor(identifier: string, module: JavaScriptModule | null) {
        super();
        this.identifier = identifier;
        this.module = module;
    }

    resolve(): (() => any) | null {
        const m = this.resolve_module();
        return this.resolve_field(m);
    }

    resolve_field(m: object | null): (() => any) | null {
        if(m==null) {
            try {
                return eval(this.identifier) as () => any;
            } catch(e) {
                return null;
            }
        } else {
            return ((m[this.identifier as keyof typeof m] || m["default" as keyof typeof m]) as () => any) || null;
        }
    }

    resolve_module(): object | null {
        if (this.module == null) {
            return null;
        } else {
            return this.module.resolve();
        }
    }

    resolveWidget(): (() => any) | null {
        const m = this.resolve_widget_module();
        return this.resolve_field(m);
    }

    resolve_widget_module(): object | null {
        if (this.module == null) {
            return null;
        } else {
            return (eval(this.module.toString()) as object) || null;
        }
    }

    toDialect(writer: CodeWriter): void {
        writer.append("JavaScript: ");
        writer.append(this.identifier);
        if(this.module!=null)
            this.module.toDialect(writer);
    }

    transpile(transpiler: Transpiler): void {
        if(this.module)
            this.module.transpile(transpiler, this.identifier);
    }

    transpileWidget(transpiler: Transpiler): void {
        // assumption is that required module is already imported through other means
        if(this.module!=null) {
            transpiler.append("var ").append(this.identifier).append(" = ");
            this.module.transpileWidget(transpiler);
            transpiler.append(".").append(this.identifier).append(";").newLine();
        }
    }
}
