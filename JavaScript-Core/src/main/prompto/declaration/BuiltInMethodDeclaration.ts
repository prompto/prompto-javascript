import BaseMethodDeclaration from './BaseMethodDeclaration'
import {Parameter, ParameterList} from '../param'
import {BuiltInContext, Context, Transpiler} from '../runtime'
import { InternalError } from '../error'
import {ArgumentList, Identifier} from "../grammar";
import {Value} from "../value";
import {DeclarationInfo} from "../runtime/Catalog";
import {Type} from "../type";
import {CodeWriter} from "../utils";

export default abstract class BuiltInMethodDeclaration<T extends Value> extends BaseMethodDeclaration {

    constructor(name: string, ...args: Parameter[]) {
        let params = null;
        if ( args.length > 1 ) {
            params = new ParameterList();
            for(let i = 1;i<args.length; i++) {
                params.add(args[i]);
            }
        }
        super(new Identifier(name), params);
    }

    getValue(context: Context): T {
        let ctx: Context | null = context;
        while (ctx) {
            if (ctx instanceof BuiltInContext)
                return ctx.value as T;
            ctx = ctx.getParentContext();
        }
        throw new InternalError("Could not locate context for built-in value!");
    }

    transpile(transpiler: Transpiler): void {
        throw new Error("Should never get there!");
    }

    transpileCall(transpiler: Transpiler, args: ArgumentList): void {
        throw new Error("Need to override transpileCall in " + this.constructor.name);
    }

    toDeclarationInfo(): DeclarationInfo {
        throw new Error("TBD!");
    }

    getType(): Type {
        throw new Error("TBD!");
    }

    toEDialect(writer: CodeWriter) {
        throw new Error("TBD!");
    }

    toMDialect(writer: CodeWriter) {
        throw new Error("TBD!");
    }

    toODialect(writer: CodeWriter) {
        throw new Error("TBD!");
    }
}
