import ObjectList from '../utils/ObjectList'
import {PromptoError, NullReferenceError} from '../error'
import {VoidType, TypeMap, IType} from '../type'
import {JavaScriptNativeCall} from '../javascript'
import {Dialect, Section} from '../parser'
import {NativeCall, IStatement} from './index'
import {Context, Transpiler} from "../runtime";
import {IValue} from "../value";
import {CodeWriter} from "../utils";

export default class StatementList extends ObjectList<IStatement> {

    nativeStatement?: JavaScriptNativeCall;

    constructor(statements?: IStatement[], statement?: IStatement) {
        super(statements, statement);
    }

    findNativeStatement(): JavaScriptNativeCall | null {
        if(this.nativeStatement)
            return this.nativeStatement;
        const stmts = this.filter(stmt => stmt instanceof JavaScriptNativeCall, this);
        if(stmts.length)
            this.nativeStatement = stmts[0] as unknown as JavaScriptNativeCall;
        return this.nativeStatement || null;
    }

    asSection(): Section | null {
        switch (this.length) {
            case 0:
                return null;
            case 1:
                return this[0].asSection();
            default:
                return Section.merge(this[0].asSection(), this[this.length - 1].asSection());
        }
    }

    locateSectionAtLine(line: number): Section | null {
        for(let i = 0;i < this.length; i++) {
            const section = this[i].locateSectionAtLine(line);
            if(section != null)
                return section;
        }
        return null;
    }

    check(context: Context, returnType: IType | null): IType {
        return this.checkStatements(context, returnType, false);
    }

    checkNative(context: Context, returnType: IType | null): IType {
        return this.checkStatements(context, returnType, true);
    }

    checkStatements(context: Context, returnType: IType | null, nativeOnly: boolean): IType {
        if (nativeOnly)
            return this.checkNativeStatements(context, returnType);
        else
            return this.checkPromptoStatements(context, returnType);
    }

    checkNativeStatements(context: Context, returnType: IType | null): IType {
        const stmt = this.findNativeStatement();
        if (returnType == VoidType.instance) {
            if(stmt)
                this.checkStatement(context, stmt);
            return VoidType.instance;
        } else {
            if(!stmt) {
                if(returnType)
                    context.problemListener.reportIncompatibleTypes(this[0].asSection(), returnType, VoidType.instance);
                return returnType || VoidType.instance;
            }
            const types = new TypeMap();
            if (returnType)
                types.add(returnType);
            let type = this.checkStatement(context, stmt);
            if (!stmt.canReturn())
                type = VoidType.instance;
            if (type != VoidType.instance) {
                types.add(type);
            }
            type = types.inferType(context, stmt.asSection()); // will raise errors if any
            if (returnType)
                return returnType;
            else
                return type;
        }
    }

    checkPromptoStatements(context: Context, returnType: IType | null): IType {
        if (returnType == VoidType.instance) {
            this.forEach(stmt =>  this.checkStatement(context, stmt), this);
            return VoidType.instance;
        } else {
            let section: Section;
            const types = new TypeMap();
            if(returnType != null)
                types.add(returnType);
            this.forEach(stmt => {
                let type = this.checkStatement(context, stmt);
                if (!stmt.canReturn())
                    type = VoidType.instance;
                if (type != VoidType.instance) {
                    section = stmt.asSection();
                    types.add(type);
                }
            }, this);
            const type = types.inferType(context, section!); // will raise errors if any
            if(returnType)
                return returnType;
            else
                return type;
        }
    }

    checkStatement(context: Context, statement: IStatement): IType {
        try {
            return statement.check(context);
        } catch (e) {
            if (e instanceof PromptoError)
                context.problemListener.reportError(statement.asSection(), e.message);
            else if(e instanceof Error) {
                context.problemListener.reportError(statement.asSection(), "Internal error, check your syntax!");
                console.error(e.stack);
            }
            return VoidType.instance;
        }
    }

    interpret(context: Context): IValue | null {
        try {
            return this.doInterpret(context);
        } catch (e) {
            if (e instanceof ReferenceError) {
                throw new NullReferenceError();
            } else {
                if (!(e instanceof PromptoError))
                    console.trace();
                throw e;
            }
        }
    }

    doInterpret(context: Context): IValue | null {
        for (let i = 0; i < this.length; i++) {
            const stmt = this[i];
            context.enterStatement(stmt);
            try {
                let result = stmt.interpret(context);
                if (!stmt.canReturn())
                    result = null;
                if (result != null)
                    return result;
            } finally {
                context.leaveStatement(stmt);
            }
        }
        return null;
    }

    interpretNative(context: Context, returnType: IType | null): IValue | null {
        try {
            return this.doInterpretNative(context, returnType);
        } catch (e) {
            if (e instanceof ReferenceError) {
                throw new NullReferenceError();
            } else {
                if (!(e instanceof PromptoError))
                    console.trace();
                throw e;
            }
        }
    }

    doInterpretNative(context: Context, returnType: IType | null): IValue | null {
        const native = this.findNativeStatement();
        if(native) {
            context.enterStatement(native);
            try {
                return native.interpretNative(context, returnType || VoidType.instance);
            } finally {
                context.leaveStatement(native);
            }
        } else
            return null;
    }

    toDialect(writer: CodeWriter): void {
        if (this.length == 0) {
            switch (writer.dialect) {
                case Dialect.E:
                case Dialect.M:
                    writer.append("pass").newLine();
                    break;
            }

        } else {
            this.forEach(stmt => {
                stmt.toDialect(writer);
                if (stmt.isSimple()) {
                    if (writer.dialect == Dialect.O && !(stmt instanceof NativeCall))
                        writer.append(';');
                    writer.newLine();
                }
            });
        }
    }

    declare(transpiler: Transpiler): void {
        this.forEach(stmt => {
            stmt.declare(transpiler);
        });
    }

    transpile(transpiler: Transpiler): void {
        this.forEach(stmt => {
            stmt.transpile(transpiler);
            if (stmt.isSimple())
                transpiler.append(";").newLine();
        });
    }

}
