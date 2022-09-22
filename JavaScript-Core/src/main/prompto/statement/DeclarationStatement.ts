import BaseStatement from './BaseStatement'
import {VoidType, MethodType, Type} from '../type'
import {ClosureValue, Value} from '../value'
import {ConcreteMethodDeclaration, Declaration} from '../declaration'
import {Context, Transpiler, Variable} from '../runtime'
import { SyntaxError } from '../error'
import {CodeWriter, Writable} from "../utils";

export default class DeclarationStatement<D extends Declaration> extends BaseStatement implements Writable {

    declaration: D;

    constructor(declaration: D) {
        super();
        this.declaration = declaration;
        if(declaration instanceof ConcreteMethodDeclaration)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            declaration.declarationOf = this;
    }

    toDialect(writer: CodeWriter): void {
        if(this.declaration instanceof ConcreteMethodDeclaration) try {
            writer.context.registerMethodDeclaration(this.declaration);
         } catch(e) {
            // ok
         }
        writer.toDialect(this);
    }

    toEDialect(writer: CodeWriter): void {
        this.declaration.toEDialect(writer);
    }

    toMDialect(writer: CodeWriter): void {
        this.declaration.toMDialect(writer);
    }

    toODialect(writer: CodeWriter): void {
        this.declaration.toODialect(writer);
    }

    check(context: Context): Type {
        if(this.declaration instanceof ConcreteMethodDeclaration) {
            this.declaration.checkChild(context);
            context.registerMethodDeclaration(this.declaration);
        } else {
            throw new SyntaxError("Unsupported:" + this.declaration.getDeclarationType());
        }
        return VoidType.instance;
    }

    interpret(context: Context): Value | null {
        if(this.declaration instanceof ConcreteMethodDeclaration) {
            const method = this.declaration;
            context.registerMethodDeclaration(method);
            const type = new MethodType(method);
            context.registerInstance(new Variable(method.id, type), true);
            context.setValue(method.id, new ClosureValue(context, type));
            return null;
        } else {
            throw new SyntaxError("Unsupported:" + typeof(this.declaration));
        }
    }

    declare(transpiler: Transpiler): void {
        if(this.declaration instanceof ConcreteMethodDeclaration) {
            this.declaration.declareChild(transpiler);
            transpiler.context.registerMethodDeclaration(this.declaration);
        } else {
            throw new SyntaxError("Unsupported:" + typeof(this.declaration));
        }
    }

    transpile(transpiler: Transpiler): void {
        if(this.declaration instanceof ConcreteMethodDeclaration) {
            this.declaration.transpile(transpiler);
            transpiler.context.registerMethodDeclaration(this.declaration);
            const instance = transpiler.context.getClosestInstanceContext();
            if(instance!=null) {
                const name = this.declaration.getTranspiledName(transpiler.context);
                transpiler.append(name).append(" = ").append(name).append(".bind(this);").newLine();
            }
        } else {
            throw new SyntaxError("Unsupported:" + typeof(this.declaration));
        }
    }

}

