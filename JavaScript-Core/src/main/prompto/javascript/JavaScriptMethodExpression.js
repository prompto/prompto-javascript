import JavaScriptSelectorExpression from './JavaScriptSelectorExpression.js'
import { JavaScriptExpressionList } from './index.js'
import { NativeInstance } from '../value/index.js'
import { SyntaxError } from '../error/index.js'

const isNodeJs = typeof window === 'undefined' && typeof importScripts === 'undefined';
const isWorker = typeof window === 'undefined' && typeof importScripts === 'function';

export default class JavaScriptMethodExpression extends JavaScriptSelectorExpression {

    constructor(id, args) {
        super();
        this.id = id;
        this.args = args || new JavaScriptExpressionList();
    }

    toString() {
        return (this.parent === null ? "" : (this.parent.toString() + ".")) + this.id.name + "(" + this.args.toString() + ")";
    }

    interpret(context, module) {
        const m = this.findInstanceAndMethod(context, module);
        if(!m)
            throw new SyntaxError("Could not find function: "+ this.id.name + (module ? " in module: " + module.toString() : ""));
        const args = this.args.computeArguments(context);
        return m.method.apply(m.instance, args);
    }

    transpile(transpiler) {
        if (this.parent !== null) {
            this.parent.transpile(transpiler);
            transpiler.append(".");
        }
        transpiler.append(this.id.name).append("(");
        this.args.transpile(transpiler);
        transpiler.append(")");
    }

    getRoot() {
        if(this.parent!=null)
            return this.parent.getRoot();
        else
            return this.id.name;
    }

    findInstanceAndMethod(context, module) {
        if (this.parent === null) {
            return this.findGlobal(context, module);
        } else {
            return this.findMember(context, module);
        }
    }

    interpretNew(context, module) {
        const m = this.findInstanceAndMethod(context, module);
        if(!m)
            throw new SyntaxError("Could not find function: "+ this.id.name);
        const args = this.args.computeArguments(context);
        return args.length ? new m.method(args) : new m.method();
    }

    findGlobal(context, module) {
        if(module!=null)
            return this.findInModule(context, module);
        else
            return { instance: null, method: stringToFunction(this.id.name) };
    }

    findInModule(context, module) {
        try {
            const m = module.resolve();
            if(m[this.id.name])
                return { instance: null, method: m[this.id.name] };
            else
                throw true;
        } catch (e) {
            throw new SyntaxError("Could not resolve module method: " + module.toString() + " " + this.id.name);
        }
    }

    findMember(context, module) {
        let i = this.parent.interpret(context, module);
        if(i===null) {
            throw "Null reference";
        }
        if(i instanceof NativeInstance) {
            i = i.instance;
        }
        if(i[this.id.name])
            return { instance:i, method: i[this.id.name] };
        else
            throw new SyntaxError("Could not resolve member method: " + this.toString());
    }

    toDialect(writer) {
        if(this.parent!=null) {
            this.parent.toDialect(writer);
            writer.append('.');
        }
        writer.append(this.id.name);
        writer.append('(');
        if(this.args!=null)
            this.args.toDialect(writer);
        writer.append(')');
    }
}

function stringToFunction(str) {
    const arr = str.split(".");
    /* global self, window */
    let fn = isNodeJs ? global : isWorker ? self : window;
    for (let i = 0, len = arr.length; i < len; i++) {
        fn = fn[arr[i]];
    }
    return fn;
}