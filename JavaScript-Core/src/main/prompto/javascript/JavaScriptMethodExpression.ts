/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/ban-types,@typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access */
import JavaScriptSelectorExpression from './JavaScriptSelectorExpression'
import {JavaScriptExpressionList, JavaScriptModule} from '../javascript'
import { NativeInstance } from '../value'
import { SyntaxError } from '../error'
import {Identifier} from "../grammar";
import {Context, Transpiler} from "../runtime";
import {CodeWriter} from "../utils";

interface InstanceAndMethod {
    instance: any;
    // eslint-disable-next-line @typescript-eslint/ban-types
    method: Function;
}

export default class JavaScriptMethodExpression extends JavaScriptSelectorExpression {

    id: Identifier;
    args: JavaScriptExpressionList;

    constructor(id: Identifier, args: JavaScriptExpressionList | null) {
        super(null);
        this.id = id;
        this.args = args || new JavaScriptExpressionList();
    }

    toString() {
        return (this.parent === null ? "" : (this.parent.toString() + ".")) + this.id.name + "(" + this.args.toString() + ")";
    }

    interpret(context: Context, module: JavaScriptModule) {
        const m = this.findInstanceAndMethod(context, module);
        if(!m)
            throw new SyntaxError("Could not find function: "+ this.id.name + (module ? " in module: " + module.toString() : ""));
        const args = this.args.computeArguments(context);
        return m.method.apply(m.instance, args);
    }

    transpile(transpiler: Transpiler): void {
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

    findInstanceAndMethod(context: Context, module: JavaScriptModule): InstanceAndMethod {
        if (this.parent === null) {
            return this.findGlobal(context, module);
        } else {
            return this.findMember(context, module);
        }
    }

    interpretNew(context: Context, module: JavaScriptModule) {
        const m = this.findInstanceAndMethod(context, module);
        if(!m)
            throw new SyntaxError("Could not find function: "+ this.id.name);
        const args = this.args.computeArguments(context);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return args.length ? new m.method(args) : new m.method();
    }

    findGlobal(context: Context, module: JavaScriptModule): InstanceAndMethod {
        if(module!=null)
            return this.findInModule(context, module);
        else
            return { instance: null, method: stringToFunction(this.id.name) };
    }

    findInModule(context: Context, module: JavaScriptModule): InstanceAndMethod {
        try {
            const m = module.resolve();
            if(m) {
                const key = this.id.name as keyof typeof m;
                if (m[key])
                    return {instance: null, method: m[key]};
            }
            throw true;
        } catch (e) {
            throw new SyntaxError("Could not resolve module method: " + module.toString() + " " + this.id.name);
        }
    }

    findMember(context: Context, module: JavaScriptModule): InstanceAndMethod {
        let i = this.parent!.interpret(context, module);
        if(i===null) {
            throw "Null reference";
        }
        if(i instanceof NativeInstance) {
            i = i.instance;
        }
        if(i) {
            const key = this.id.name as keyof typeof i;
            if(i[key])
                return { instance:i, method: i[key] };
        }
        throw new SyntaxError("Could not resolve member method: " + this.toString());
    }

    toDialect(writer: CodeWriter): void {
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

function stringToFunction(str: string): Function {
    const arr = str.split(".");
    let fn = global;
    for (let i = 0, len = arr.length; i < len; i++) {
        fn = fn[arr[i] as keyof typeof fn];
    }
    return fn as unknown as Function;
}
