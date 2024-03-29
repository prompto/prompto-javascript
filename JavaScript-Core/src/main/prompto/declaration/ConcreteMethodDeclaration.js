import BaseMethodDeclaration from './BaseMethodDeclaration.js'
import { CategoryParameter, CodeParameter } from '../param/index.js'
import { StatementList, DeclarationStatement } from '../statement/index.js'
import { SingletonCategoryDeclaration } from '../declaration/index.js'
import { VoidType, DictionaryType, TextType } from '../type/index.js'
import { InstanceContext } from '../runtime/index.js';
import { SyntaxError } from '../error/index.js'

export default class ConcreteMethodDeclaration extends BaseMethodDeclaration {

    constructor(id, args, returnType, statements) {
        super(id, args, returnType);
        this.statements = statements || new StatementList();
        this.declarationOf = null;
        this.beingChecked = false;
        this.statements.forEach(function(stmt) {
            if(stmt instanceof DeclarationStatement)
                stmt.declaration.closureOf = this;
        }, this);
    }

    locateSectionAtLine(line) {
        return this.statements.locateSectionAtLine(line);
    }

    check(context, isStart) {
        if(this.canBeChecked(context, isStart)) {
            return this.recursiveCheck(context, isStart);
        } else {
            return VoidType.instance;
        }
    }

    canBeChecked(context, isStart) {
        if(isStart) {
            return !this.mustBeCheckedInCallContext(context);
        } else {
            return true;
        }
    }

    mustBeCheckedInCallContext(context) {
        // if at least one argument is 'Code'
        if(this.parameters===null) {
            return false;
        }
        for(let i=0; i<this.parameters.length; i++) {
            if(this.parameters[i] instanceof CodeParameter) {
                return true;
            }
        }
        return false;
    }

    recursiveCheck(context, isStart) {
        if(this.beingChecked) {
            if(this.returnType)
                return this.returnType;
            else {
                context.problemListener.reportUntypedRecursiveMethod(this.id, this.name, this.getProto(context));
                return VoidType.instance;
            }
        } else {
            this.beingChecked = true;
            try {
                return this.fullCheck(context, isStart);
            } finally {
                this.beingChecked = false;
            }
        }
    }
    fullCheck(context, isStart) {
        if(isStart) {
            context = context.newLocalContext();
            this.registerParameters(context);
        }
        if(this.parameters!==null) {
            this.parameters.check(context);
        }
        return this.checkStatements(context);
    }

    checkChild(context) {
        this.checkSingletonInitialize(context);
        if(this.parameters!=null) {
            this.parameters.check(context);
        }
        const child = context.newChildContext();
        this.registerParameters(child);
        return this.checkStatements(child);
    }

    checkSingletonInitialize(context) {
        if("initialize" === this.name) {
            this.checkSingletonInitializeContext(context);
            this.checkSingletonInitializeParameters(context);
        }
    }

    checkSingletonInitializeParameters(context) {
        if(this.parameters!=null && this.parameters.length > 0)
            context.problemListener.reportIllegalInitializeParameters(this);
    }

    checkSingletonInitializeContext(context) {
        if(context instanceof InstanceContext) {
            if(context.getDeclaration() instanceof SingletonCategoryDeclaration)
                return;
        }
        context.problemListener.reportIllegalInitialize(this.id);
    }

    checkStatements(context) {
        try {
            return this.statements.check(context, this.returnType);
        } catch(e) {
            if(e instanceof SyntaxError)
                throw new SyntaxError(e.message + " in method '" + this.name + "'");
            else
                throw e;
        }
    }

    interpret(context) {
        context.enterMethod(this);
        try {
            return this.statements.interpret(context);
        } finally {
            context.leaveMethod(this);
        }
    }

    toDialect(writer) {
        if(writer.context.isGlobalContext())
            writer = writer.newLocalWriter();
        this.registerParameters(writer.context);
        writer.toDialect(this);
    }

    isEligibleAsMain() {
        if(this.parameters.length === 0)
            return true;
        else if(this.parameters.length === 1) {
            const arg = this.parameters[0];
            if( arg instanceof CategoryParameter
                && arg.type instanceof DictionaryType
                && arg.type.itemType === TextType.instance )
                    return true;
        }
        return false;
    }

    toMDialect(writer) {
        writer.append("def ").append(this.name).append(" (");
        this.parameters.toDialect(writer);
        writer.append(")");
        if(this.returnType!=null && this.returnType !== VoidType.instance) {
            writer.append("->");
            this.returnType.toDialect(writer);
        }
        writer.append(":").newLine().indent();
        this.statements.toDialect(writer);
        writer.dedent();
    }

    toEDialect(writer) {
        writer.append("define ").append(this.name).append(" as method ");
        this.parameters.toDialect(writer);
        if(this.returnType!=null && this.returnType !== VoidType.instance) {
            writer.append("returning ");
            this.returnType.toDialect(writer);
            writer.append(" ");
        }
        writer.append("doing:").newLine().indent();
        this.statements.toDialect(writer);
        writer.dedent();
    }

    toODialect(writer) {
        if(this.returnType!=null && this.returnType !== VoidType.instance) {
            this.returnType.toDialect(writer);
            writer.append(" ");
        }
        writer.append("method ").append(this.name).append(" (");
        this.parameters.toDialect(writer);
        writer.append(") {").newLine().indent();
        this.statements.toDialect(writer);
        writer.dedent().append("}").newLine();
    }

    declare(transpiler) {
        if(!this.declaring) {
            this.declaring = true;
            try {
                this.doDeclare(transpiler);
            } finally {
                this.declaring = false;
            }
        }
    }

    doDeclare(transpiler) {
        if(this.returnType)
            this.returnType.declare(transpiler);
        if (this.memberOf)
            this.memberOf.declare(transpiler);
        else {
            transpiler = transpiler.newLocalTranspiler();
            transpiler.declare(this);
            this.declareParameters(transpiler);
        }
        this.registerParameters(transpiler.context);
        this.statements.declare(transpiler);
    }

    transpile(transpiler) {
        this.registerParameters(transpiler.context);
        this.registerCodeArguments(transpiler.context);
        this.transpileProlog(transpiler);
        this.statements.transpile(transpiler);
        this.transpileEpilog(transpiler);
    }

    declareChild(transpiler) {
        this.declareParameters(transpiler);
        transpiler = transpiler.newChildTranspiler();
        this.registerParameters(transpiler.context);
        return this.statements.declare(transpiler);
    }

    registerCodeArguments(context) {
        if(!this.codeArguments)
            return;
        Object.getOwnPropertyNames(this.codeArguments).forEach(function(name) {
            const arg = this.codeArguments[name];
            context.setValue(arg.id, arg.value);
        }, this);
    }

    fullDeclare(transpiler, id) {
        const declaration = new ConcreteMethodDeclaration(id, this.parameters, this.returnType, this.statements);
        declaration.memberOf = this.memberOf;
        transpiler.declare(declaration);
        this.statements.declare(transpiler);
        // remember code arguments
        declaration.codeArguments = {};
        this.parameters.filter(arg => arg instanceof CodeParameter).forEach(arg => {
            declaration.codeArguments[arg.name] = { id: arg.id, value: transpiler.context.getValue(arg.id) };
        });
    }

}
