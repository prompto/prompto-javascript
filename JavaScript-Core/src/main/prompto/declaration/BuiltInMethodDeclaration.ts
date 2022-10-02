import BaseMethodDeclaration from './BaseMethodDeclaration'
import {IParameter, ParameterList} from '../param'
import {BuiltInContext, Context, Transpiler} from '../runtime'
import { InternalError } from '../error'
import {ArgumentList, Identifier} from "../grammar";
import {IValue} from "../value";
import {IMethodInfo} from "../runtime/Catalog";
import {IType} from "../type";
import {CodeWriter} from "../utils";

export default abstract class BuiltInMethodDeclaration<T extends IValue> extends BaseMethodDeclaration {

    constructor(name: string, ...args: IParameter[]) {
        let params = null;
        if ( args.length > 1 ) {
            params = new ParameterList();
            for(let i = 1;i<args.length; i++) {
                params.add(args[i]);
            }
        }
        super(new Identifier(name), params, args[0].getType());
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

    checkChild(context: Context): IType {
        throw new Error("Should never get there!");
    }


    declare(transpiler: Transpiler): void {
        throw new Error("Should never get there!");
    }

    transpile(transpiler: Transpiler): void {
        throw new Error("Should never get there!");
    }

    declareCall(transpiler: Transpiler) {
        throw new Error("Need to override declareCall in " + this.constructor.name);
    }

    transpileCall(transpiler: Transpiler, args: ArgumentList): void {
        throw new Error("Need to override transpileCall in " + this.constructor.name);
    }

    toDeclarationInfo(context: Context): IMethodInfo {
        throw new Error("TBD!");
    }

    getType(): IType {
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
