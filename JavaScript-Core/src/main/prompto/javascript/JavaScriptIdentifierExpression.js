import JavaScriptExpression from './JavaScriptExpression.js'
import { $DataStore } from '../store/index.js'
import { PromptoError, SyntaxError } from '../error/index.js'

export default class JavaScriptIdentifierExpression extends JavaScriptExpression {
   
    constructor(id) {
        super();
        this.id = id;
    }

    toString() {
        return this.id.name;
    }

    toDialect(writer) {
        writer.append(this.id.name);
    }

    transpile(transpiler) {
        if ("$store" === this.id.name)
            transpiler.append("$DataStore.instance");
        else
            transpiler.append(this.id.name);
    }

    getRoot() {
        return this.id.name;
    }

    interpret(context, module) {
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

    interpret_prompto(context) {
        if ("$context" === this.id.name)
            return context;
        else if ("$store" === this.id.name)
            return $DataStore.instance;
        else
            return null;
    }

    interpret_instance(context) {
        if (context == null) {
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

    interpret_module(module) {
        if (module == null) {
            return null;
        } else {
            try {
                const m = module.resolve();
                const o = m[this.id.name] || m["default"];
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

    interpret_global() {
        try {
            return eval(this.id.name);
        } catch (e) {
            return null;
        }
    }
}
