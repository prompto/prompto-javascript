import BaseMethodDeclaration from './BaseMethodDeclaration'
import {CategoryParameter, CodeParameter, ParameterList, ValueCodeParameter} from '../param'
import { StatementList, DeclarationStatement } from '../statement'
import {SingletonCategoryDeclaration} from './index'
import {VoidType, DictionaryType, TextType, IType} from '../type'
import {Context, InstanceContext, Transpiler} from '../runtime';
import { SyntaxError } from '../error'
import {Identifier} from "../grammar";
import {Section} from "../parser";
import {CodeValue, IValue} from "../value";
import {CodeWriter} from "../utils";

export default class ConcreteMethodDeclaration extends BaseMethodDeclaration {

    statements: StatementList;
    beingChecked = false;
    codeParameters?: Map<string, ValueCodeParameter>;

    constructor(id: Identifier, params: ParameterList | null, returnType: IType | null, statements: StatementList) {
        super(id, params, returnType);
        this.statements = statements || new StatementList();
        this.beingChecked = false;
        this.statements.forEach(stmt => {
            if(stmt instanceof DeclarationStatement<BaseMethodDeclaration>) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                stmt.declaration.closureOf = this;
            }
        }, this);
    }

    locateSectionAtLine(line: number): Section | null {
        return this.statements.locateSectionAtLine(line);
    }

    check(context: Context, isStart: boolean): IType {
        if(this.canBeChecked(context, isStart)) {
            return this.recursiveCheck(context, isStart);
        } else {
            return VoidType.instance;
        }
    }

    canBeChecked(context: Context, isStart: boolean): boolean {
        if(isStart) {
            return !this.isTemplate();
        } else {
            return true;
        }
    }

    isTemplate(): boolean {
        // if at least one argument is 'Code'
        return this.parameters ? !!this.parameters.find(param => param instanceof CodeParameter) : false;
    }

    recursiveCheck(context: Context, isStart: boolean): IType {
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

    fullCheck(context: Context, isStart: boolean): IType {
        if(isStart) {
            context = context.newLocalContext();
            this.registerParameters(context);
        }
        if(this.parameters!=null) {
            this.parameters.check(context);
        }
        return this.checkStatements(context);
    }

    checkChild(context: Context): IType {
        this.checkSingletonInitialize(context);
        if(this.parameters!=null) {
            this.parameters.check(context);
        }
        const child = context.newChildContext();
        this.registerParameters(child);
        return this.checkStatements(child);
    }

    checkSingletonInitialize(context: Context): void {
        if("initialize" == this.name) {
            this.checkSingletonInitializeContext(context);
            this.checkSingletonInitializeParameters(context);
        }
    }

    checkSingletonInitializeParameters(context: Context): void {
        if(this.parameters!=null && this.parameters.length > 0)
            context.problemListener.reportIllegalInitializeParameters(this);
    }

    checkSingletonInitializeContext(context: Context): void {
        if(context instanceof InstanceContext) {
            if(context.getDeclaration() instanceof SingletonCategoryDeclaration)
                return;
        }
        context.problemListener.reportIllegalInitialize(this.id);
    }

    checkStatements(context: Context): IType {
        try {
            return this.statements.check(context, this.returnType);
        } catch(e) {
            if(e instanceof SyntaxError)
                throw new SyntaxError(e.message + " in method '" + this.name + "'");
            else
                throw e;
        }
    }

    interpret(context: Context): IValue | null {
        context.enterMethod(this);
        try {
            return this.statements.interpret(context);
        } finally {
            context.leaveMethod(this);
        }
    }

    toDialect(writer: CodeWriter): void {
        if(writer.context.isGlobalContext())
            writer = writer.newLocalWriter();
        this.registerParameters(writer.context);
        writer.toDialect(this);
    }

    isEligibleAsMain(): boolean {
        if(this.parameters.length == 0)
            return true;
        else if(this.parameters.length == 1) {
            const param = this.parameters[0];
            if( param instanceof CategoryParameter) {
                const type = param.type;
                if(type instanceof DictionaryType) {
                    if(type.itemType == TextType.instance)
                        return true;
                }
            }
        }
        return false;
    }

    toMDialect(writer: CodeWriter): void {
        writer.append("def ").append(this.name).append(" (");
        this.parameters.toDialect(writer);
        writer.append(")");
        if(this.returnType!=null && this.returnType != VoidType.instance) {
            writer.append("->");
            this.returnType.toDialect(writer);
        }
        writer.append(":").newLine().indent();
        this.statements.toDialect(writer);
        writer.dedent();
    }

    toEDialect(writer: CodeWriter): void {
        writer.append("define ").append(this.name).append(" as method ");
        this.parameters.toDialect(writer);
        if(this.returnType!=null && this.returnType != VoidType.instance) {
            writer.append("returning ");
            this.returnType.toDialect(writer);
            writer.append(" ");
        }
        writer.append("doing:").newLine().indent();
        this.statements.toDialect(writer);
        writer.dedent();
    }

    toODialect(writer: CodeWriter): void {
        if(this.returnType!=null && this.returnType != VoidType.instance) {
            this.returnType.toDialect(writer);
            writer.append(" ");
        }
        writer.append("method ").append(this.name).append(" (");
        this.parameters.toDialect(writer);
        writer.append(") {").newLine().indent();
        this.statements.toDialect(writer);
        writer.dedent().append("}").newLine();
    }

    declare(transpiler: Transpiler): void {
        if(!this.declaring) {
            this.declaring = true;
            try {
                this.doDeclare(transpiler);
            } finally {
                this.declaring = false;
            }
        }
    }

    doDeclare(transpiler: Transpiler): void {
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

    transpile(transpiler: Transpiler): void {
        this.registerParameters(transpiler.context);
        this.registerCodeArguments(transpiler.context);
        this.transpileProlog(transpiler);
        this.statements.transpile(transpiler);
        this.transpileEpilog(transpiler);
    }

    declareChild(transpiler: Transpiler): void {
        this.declareParameters(transpiler);
        transpiler = transpiler.newChildTranspiler();
        this.registerParameters(transpiler.context);
        return this.statements.declare(transpiler);
    }

    registerCodeArguments(context: Context): void {
        if(this.isTemplate()) {
            if(this.codeParameters)
                this.codeParameters.forEach((param, key) => context.setValue(param.id, param.value), this);
        }
    }

    fullDeclare(transpiler: Transpiler, id: Identifier): void {
        const declaration = new ConcreteMethodDeclaration(id, this.parameters, this.returnType, this.statements);
        declaration.memberOf = this.memberOf;
        transpiler.declare(declaration);
        this.statements.declare(transpiler);
        // remember code arguments
        declaration.codeParameters = new Map<string, ValueCodeParameter>();
        this.parameters.filter(param => param instanceof CodeParameter).forEach(param => {
            declaration.codeParameters?.set(param.name, new ValueCodeParameter(param.id, transpiler.context.getValue(param.id) as CodeValue));
        });
    }

}
