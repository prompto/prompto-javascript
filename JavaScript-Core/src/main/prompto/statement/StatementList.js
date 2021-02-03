import ObjectList from '../utils/ObjectList.js'
import {PromptoError, NullReferenceError} from '../error/index.js'
import {VoidType, MissingType, TypeMap} from '../type/index.js'
import {JavaScriptNativeCall} from '../javascript/index.js'
import {Dialect, Section} from '../parser/index.js'
import {NativeCall} from './index.js'

export default class StatementList extends ObjectList {

    constructor(statement) {
        super(null, statement);
    }

    asSection() {
        switch (this.length) {
            case 0:
                return MissingType.instance;
            case 1:
                return this[0];
            default:
                return Section.merge(this[0], this[this.length - 1]);
        }
    }

    check(context, returnType) {
        return this.checkStatements(context, returnType, false);
    }

    checkNative(context, returnType) {
        return this.checkStatements(context, returnType, true);
    }

    checkStatement(context, statement) {
        try {
            return statement.check(context);
        } catch (e) {
            if (e instanceof PromptoError)
                context.problemListener.reportError(statement, e.message);
            else {
                context.problemListener.reportError(statement, "Internal error, check your syntax!");
                console.error(e.stack);
            }
            return VoidType.instance;
        }
    }

    checkStatements(context, returnType, nativeOnly) {
        if (returnType == VoidType.instance) {
            if (nativeOnly) {
                this.filter(stmt => stmt instanceof JavaScriptNativeCall, this)
                    .forEach(function (stmt) {
                        this.checkStatement(context, stmt);
                    }, this);
            } else {
                this.forEach(function (stmt) {
                    this.checkStatement(context, stmt);
                }, this);
            }
            return VoidType.instance;
        } else {
            let section = null;
            const stmts = nativeOnly ? this.filter(stmt => stmt instanceof JavaScriptNativeCall, this) : this;
            const types = new TypeMap();
            stmts.forEach(function (stmt) {
                let type = this.checkStatement(context, stmt);
                if (!stmt.canReturn())
                    type = VoidType.instance;
                if (type !== VoidType.instance) {
                    section = stmt;
                    types.add(type);
                }
            }, this);
            return types.inferType(context, section);
        }
    }

    interpret(context) {
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

    interpretNative(context, returnType) {
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

    doInterpret(context) {
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

    doInterpretNative(context, returnType) {
        for (let i = 0; i < this.length; i++) {
            const stmt = this[i];
            if (!(stmt instanceof JavaScriptNativeCall))
                continue;
            context.enterStatement(stmt);
            try {
                const result = stmt.interpret(context, returnType);
                if (result != null)
                    return result;
            } finally {
                context.leaveStatement(stmt);
            }
        }
        return null;
    }

    toDialect(writer) {
        if (this.length === 0) {
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
                    if (writer.dialect === Dialect.O && !(stmt instanceof NativeCall))
                        writer.append(';');
                    writer.newLine();
                }
            });
        }
    }

    declare(transpiler) {
        this.forEach(stmt => {
            stmt.declare(transpiler);
        });
    }

    transpile(transpiler) {
        this.forEach(stmt => {
            const skip = stmt.transpile(transpiler);
            if (!skip)
                transpiler.append(";").newLine();
        });
    }

    locateSectionAtLine(line) {
        const statement = this.find(s => s.containsLine(line));
        return statement ? statement.locateSectionAtLine(line) : null;
    }
}
