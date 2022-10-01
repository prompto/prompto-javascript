import BaseMethodDeclaration from './BaseMethodDeclaration'
import { StrictSet } from '../intrinsic'
import {UnresolvedParameter, AttributeParameter, CategoryParameter, IParameter, ParameterList} from '../param'
import {Context, Transpiler} from "../runtime";
import {MethodCall} from "../statement";
import {IMethodDeclaration} from "./index";
import {IType} from "../type";
import {IValue} from "../value";
import {CodeWriter} from "../utils";

export default class DispatchMethodDeclaration extends BaseMethodDeclaration {

    context: Context;
    methodCall: MethodCall;
    declaration: IMethodDeclaration;
    declarations: IMethodDeclaration[];

    constructor(context: Context, methodCall: MethodCall, declaration: IMethodDeclaration, declarations: IMethodDeclaration[]) {
        super(declaration.id, declaration.parameters, declaration.returnType);
        this.context = context;
        this.methodCall = methodCall;
        this.declaration = declaration;
        this.declarations = declarations;
    }

    getTranspiledName(context: Context): string {
        return "$dispatch$" + this.declaration.getTranspiledName(context);
    }

    transpile(transpiler: Transpiler): void {
        this.registerParameters(transpiler.context);
        this.transpileProlog(transpiler);
        this.transpileDispatch(transpiler);
        this.transpileEpilog(transpiler);
    }

    transpileDispatch(transpiler: Transpiler): void {
        const common = this.collectCommonParams();
        for(let i=0; i<this.declarations.length; i++) {
            if(i>0)
                transpiler.append("else ");
            if(i<this.declarations.length-1) {
                transpiler.append("if(");
                this.transpileTest(transpiler, common, this.declarations[i]);
                transpiler.append(")");
            }
            transpiler.indent();
            this.transpileCall(transpiler, this.declarations[i]);
            transpiler.dedent();
        }
    }

    collectCommonParams(): StrictSet<IParameter> {
        let common: StrictSet<IParameter> | null = null;
        for(let i=0; i<this.declarations.length; i++) {
            const declaration = this.declarations[i];
            if(i==0)
                common = new StrictSet<IParameter>(declaration.parameters);
            else {
                const current = new StrictSet<IParameter>(declaration.parameters);
                common = common!.intersect(current);
                if(common.length==0)
                    break;
            }
        }
        return common!;
    }

    transpileCall(transpiler: Transpiler, declaration: IMethodDeclaration): void {
        this.methodCall.transpileSelector(transpiler, declaration);
        transpiler.append("(");
        this.parameters.forEach(param => {
            transpiler.append(param.name);
            transpiler.append(", ");
        }, this);
        transpiler.trimLast(2);
        transpiler.append(")");
    }

    transpileTest(transpiler: Transpiler, common: StrictSet<IParameter>, declaration: IMethodDeclaration): void {
        const args = this.methodCall.args;
        if(args)
            for(let i = 0, count = 0; i<args.length; i++) {
                let incoming = args[i].parameter;
                if(incoming && common.has(incoming))
                    continue;
                if(count++)
                    transpiler.append(" && ");
                if(incoming instanceof UnresolvedParameter)
                    incoming = incoming.resolved || null;
                let outgoing: IParameter | null = incoming==null ? declaration.parameters![0] : this.findCorrespondingParameter(transpiler.context, declaration.parameters!, common, incoming);
                if(outgoing instanceof UnresolvedParameter)
                    outgoing = outgoing.resolved || null;
                if(incoming==null)
                    incoming = this.declaration.parameters![0];
                if(incoming instanceof UnresolvedParameter)
                    incoming = incoming.resolved || null;
                if(incoming instanceof CategoryParameter && outgoing instanceof CategoryParameter) {
                    transpiler.append(incoming.name).append(".instanceOf(").append(outgoing.type.name).append(")");
                } else if(incoming instanceof CategoryParameter && outgoing instanceof AttributeParameter) {
                    transpiler.append(incoming.name).append(".hasOwnProperty('").append(outgoing.name).append("')");
                } else
                    throw new Error("Unsupported: " + typeof(incoming) + " and " + typeof(outgoing));
            }
    }

    findCorrespondingParameter(context: Context, params: ParameterList, common: StrictSet<IParameter>, incoming: IParameter): IParameter {
        for(let i=0; i<params.length; i++) {
            const outgoing = params[i];
            if (common.has(outgoing))
                continue;
            if (outgoing.equals(incoming))
                return outgoing;
            if (incoming instanceof CategoryParameter && outgoing instanceof CategoryParameter) {
                if(incoming.type.isAssignableFrom(context, outgoing.type) || outgoing.type.isAssignableFrom(context, incoming.type))
                    return outgoing;
            }
        }
        throw new Error("Could not find matching argument for: " + incoming.toString() + " in " + params.toString());
    }

    check(context: Context, isStart: boolean): IType {
        throw new Error("Should never get there!");
    }

    checkChild(context: Context): IType {
        throw new Error("Should never get there!");
    }

    declare(transpiler: Transpiler): void {
        throw new Error("Should never get there!");
    }

    interpret(context: Context): IValue | null {
        throw new Error("Should never get there!");
    }

    toEDialect(writer: CodeWriter): void {
        throw new Error("Should never get there!");
    }

    toMDialect(writer: CodeWriter): void {
        throw new Error("Should never get there!");
    }

    toODialect(writer: CodeWriter): void {
        throw new Error("Should never get there!");
    }
}

