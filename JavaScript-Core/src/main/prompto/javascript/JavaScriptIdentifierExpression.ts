/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import JavaScriptExpression from './JavaScriptExpression'
import { $DataStore } from '../store'
import { PromptoError, SyntaxError } from '../error'
import {Context, Transpiler} from "../runtime";
import {Identifier} from "../grammar";
import {CodeWriter} from "../utils";
import {JavaScriptModule} from "./index";

export default class JavaScriptIdentifierExpression extends JavaScriptExpression {

    id: Identifier;

    constructor(id: Identifier) {
        super();
        this.id = id;
    }

    toString() {
        return this.id.name;
    }

    toDialect(writer: CodeWriter): void {
        writer.append(this.id.name);
    }

    transpile(transpiler: Transpiler): void {
        if ("$store" === this.id.name)
            transpiler.append("$DataStore.instance");
        else
            transpiler.append(this.id.name);
    }

    getRoot() {
        return this.id.name;
    }

    interpret(context: Context, module: JavaScriptModule): any | null {
        let o = this.interpret_prompto(context);
        if (o != null) {
            return o;
        }
        o = this.interpret_instance(context);
        if (o != null) {
            return o;
        }
        o = this.interpret_module(module); // as a module import
        if (o != null) {
            return o;
        }
        o = this.interpret_global(); // as a global declaration
        if (o != null) {
            return o;
        }
        return null;
    }

    interpret_prompto(context: Context): any | null {
        if ("$context" === this.id.name)
            return context;
        else if ("$store" === this.id.name)
            return $DataStore.instance;
        else
            return null;
    }

    interpret_instance(context: Context): any | null {
        if (context == null) {
            return null;
        } else if("null" === this.id.name) {
            return null;
        } else {
            try {
                return context.getValue(this.id);
            } catch (e) {
                if (e instanceof PromptoError) {
                    return null;
                } else {
                    throw e;
                }
            }
        }
    }

    interpret_module(module: JavaScriptModule): any | null {
        if (module == null) {
            return null;
        } else {
            try {
                const m = module.resolve() as object;
                const o = m[this.id.name as keyof typeof m] || m["default" as keyof typeof m];
                if (o) {
                    return o;
                } else {
                    return m;
                }
            } catch (e) {
                throw new SyntaxError("Could not resolve module: " + module.toString());
            }
        }
    }

    interpret_global(): any | null {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return eval(this.id.name);
        } catch (e) {
            return null;
        }
    }
}
