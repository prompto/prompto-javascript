import BaseStatement from "./BaseStatement"
import { VoidType, MethodType } from "../type/index"
import { ClosureValue } from "../value/index"
import { ConcreteMethodDeclaration } from "../declaration/index"
import { Variable } from "../runtime/index"

export default class DeclarationStatement extends BaseStatement {

    constructor(declaration) {
        super();
        this.declaration = declaration;
        this.declaration.declarationStatement = this;
        if(declaration instanceof ConcreteMethodDeclaration)
            declaration.declarationOf = this;
    }

    toDialect(writer) {
        if(this.declaration instanceof ConcreteMethodDeclaration) try {
            writer.context.registerMethodDeclaration(this.declaration);
         } catch(e) {
            // ok
         }
        this.declaration.toDialect(writer);
    }

    check(context) {
        if(this.declaration instanceof ConcreteMethodDeclaration) {
            this.declaration.checkChild(context);
            context.registerMethodDeclaration(this.declaration);
        } else {
            throw new SyntaxError("Unsupported:" + typeof(declaration));
        }
        return VoidType.instance;
    }

    interpret(context) {
        if(this.declaration instanceof ConcreteMethodDeclaration) {
            const method = this.declaration;
            context.registerMethodDeclaration(method);
            const type = new MethodType(method);
            context.registerValue(new Variable(method.id, type));
            context.setValue(method.id, new ClosureValue(context, type));
            return null;
        } else {
            throw new SyntaxError("Unsupported:" + typeof(this.declaration));
        }
    }

    declare(transpiler) {
        this.declaration.declareChild(transpiler);
        transpiler.context.registerMethodDeclaration(this.declaration);
    }

    transpile(transpiler) {
        this.declaration.transpile(transpiler);
        transpiler.context.registerMethodDeclaration(this.declaration);
        const instance = transpiler.context.getClosestInstanceContext();
        if(instance!=null) {
            const name = this.declaration.getTranspiledName(transpiler.context);
            transpiler.append(name).append(" = ").append(name).append(".bind(this);").newLine();
        }
        return true;
    }
}

