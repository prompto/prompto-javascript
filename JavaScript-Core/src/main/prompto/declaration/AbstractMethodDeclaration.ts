import BaseMethodDeclaration from './BaseMethodDeclaration'
import {IType, VoidType} from '../type'
import {Identifier} from "../grammar";
import {ParameterList} from "../param";
import {Context, Transpiler} from "../runtime";
import {IValue} from "../value";
import {CodeWriter} from "../utils";
import {IDeclarationInfo} from "../runtime/Catalog";

export default class AbstractMethodDeclaration extends BaseMethodDeclaration {

    constructor(id: Identifier, parameters: ParameterList, returnType?: IType | null) {
        super(id, parameters, returnType || VoidType.instance);
    }

    isAbstract() {
        return true;
    }

    getType(context: Context): IType {
        return this.returnType!;
    }

    toDeclarationInfo(): IDeclarationInfo {
        throw "Should never get there!";
    }

    interpret(context: Context): IValue {
        throw "Should never get there!";
    }

    check(context: Context, isStart: boolean): IType {
        if(this.parameters!=null) {
            this.parameters.check(context);
        }
        if(isStart) {
            const local = context.newLocalContext();
            this.registerParameters(local);
        }
        return this.returnType!;
    }

    checkChild(context: Context) {
        if(this.parameters!=null) {
            this.parameters.check(context);
        }
        return this.returnType;
    }

    declare(transpiler: Transpiler): void {
        this.declareParameters(transpiler);
    }

    transpile(transpiler: Transpiler): void {
        // nothing to do
    }

    toMDialect(writer: CodeWriter): void {
        writer.append("abstract def ");
        writer.append(this.name);
        writer.append(" (");
        this.parameters.toDialect(writer);
        writer.append(")");
        if(this.returnType != VoidType.instance) {
            writer.append("->");
            this.returnType!.toDialect(writer);
        }
    }

    toEDialect(writer: CodeWriter): void {
        writer.append("define ");
        writer.append(this.name);
        writer.append(" as abstract method ");
        this.parameters.toDialect(writer);
        if(this.returnType!=null && this.returnType !== VoidType.instance) {
            writer.append("returning ");
            this.returnType.toDialect(writer);
        }
    }

    toODialect(writer: CodeWriter): void {
        writer.append("abstract ");
        if(this.returnType!=null && this.returnType !== VoidType.instance) {
            this.returnType.toDialect(writer);
            writer.append(" ");
        }
        writer.append("method ");
        writer.append(this.name);
        writer.append(" (");
        this.parameters.toDialect(writer);
        writer.append(");");
    }

}
