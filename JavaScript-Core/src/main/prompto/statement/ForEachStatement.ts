import BaseStatement from './BaseStatement'
import {Variable, BreakResult, Context, Transpiler} from '../runtime'
import { IntegerType, ListType, DictionaryType, IType } from '../type'
import { InternalError } from '../error'
import { StrictSet } from '../intrinsic'
import {IIterator, IntegerValue, IValue} from '../value'
import {Section} from "../parser";
import {StatementList} from "./index";
import {IExpression} from "../expression";
import {Identifier} from "../grammar";
import {CodeWriter} from "../utils";

export default class ForEachStatement extends BaseStatement {

    v1: Identifier | null;
    v2: Identifier | null;
    source: IExpression;
    statements: StatementList;

    constructor(v1: Identifier | null, v2: Identifier | null, source: IExpression, statements: StatementList) {
        super();
        this.v1 = v1 || null;
        this.v2 = v2 || null;
        this.source = source;
        this.statements = statements;
    }

    locateSectionAtLine(line: number) {
        if(this.source instanceof Section) {
            const section = this.source.locateSectionAtLine(line);
            if(section !== null)
                return section;
        }
        if(this.statements instanceof StatementList)
            return this.statements.locateSectionAtLine(line);
        else
            return null;
    }

    check(context: Context): IType {
        const srcType = this.source.check(context);
        const elemType = srcType.checkIterator(context, this, this.source);
        return this.checkItemIterator(context, elemType);
    }

    checkItemIterator(context: Context, elemType: IType) {
        const child = context.newChildContext();
        if(this.v2) {
            child.registerInstance(new Variable(this.v1!, IntegerType.instance), true);
            child.registerInstance(new Variable(this.v2, elemType), true);
        } else
            child.registerInstance(new Variable(this.v1!, elemType), true);
        return this.statements.check(child, null);
    }

    interpret(context: Context): IValue | null {
        const srcType = this.source.check(context);
        const elemType = srcType.checkIterator(context, this, this.source);
        return this.interpretItemIterator(context, elemType);
    }

    interpretItemIterator(context: Context, elemType: IType) {
        if (this.v2 === null) {
            return this.interpretItemIteratorNoIndex(context, elemType);
        } else {
            return this.interpretItemIteratorWithIndex(context, elemType);
        }
    }

    interpretItemIteratorNoIndex(context: Context, elemType: IType) {
        const iterator = this.getIterator(context);
        while (iterator.hasNext()) {
            const child = context.newChildContext();
            child.registerInstance(new Variable(this.v1!, elemType), true);
            let value: IValue | null = iterator.next();
            child.setValue(this.v1!, value);
            value = this.statements.interpret(child);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if(value == BreakResult.instance)
                break;
            if (value != null) {
                return value;
            }
        }
        return null;
    }

    getIterator(context: Context): IIterator<IValue> {
        const src = this.source.interpret(context);
        if(src.isIterable())
            return src.getIterator();
        // is it an IIterable ?
        // eslint-disable-next-line @typescript-eslint/ban-types
        const getIterator = src["getIterator" as keyof typeof src] as Function;
        if(getIterator)
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return
            return getIterator.bind(src)()
        // eslint-disable-next-line @typescript-eslint/ban-types
        const hasNext = src["hasNext" as keyof typeof src] as Function;
        // eslint-disable-next-line @typescript-eslint/ban-types
        const next = src["next" as keyof typeof src] as Function;
        if(hasNext && next)
            return src as unknown as IIterator<IValue>;
        else
            throw new InternalError("Should never end up here!");
    }

    interpretItemIteratorWithIndex(context: Context, elemType: IType) {
        const iterator = this.getIterator(context);
        let index = 0;
        while (iterator.hasNext()) {
            const child = context.newChildContext();
            child.registerInstance(new Variable(this.v2!, elemType), true);
            child.setValue(this.v2!, iterator.next());
            child.registerInstance(new Variable(this.v1!, IntegerType.instance), true);
            child.setValue(this.v1!, new IntegerValue(++index));
            const value = this.statements.interpret(child);
            if (value != null) {
                return value;
            }
        }
        return null;
    }

    toDialect(writer: CodeWriter): void {
        writer = writer.newChildWriter();
        const srcType = this.source.check(writer.context);
        const elemType = srcType.checkIterator(writer.context, this, this.source);
        if(this.v2) {
            writer.context.registerInstance(new Variable(this.v1!, IntegerType.instance), true);
            writer.context.registerInstance(new Variable(this.v2, elemType), true);
        } else
            writer.context.registerInstance(new Variable(this.v1!, elemType), true);
        writer.toDialect(this);
    }

    toODialect(writer: CodeWriter): void {
        writer.append("for each (");
        writer.append(this.v1!.name);
        if(this.v2) {
            writer.append(", ");
            writer.append(this.v2.name);
        }
        writer.append(" in ");
        this.source.toDialect(writer);
        writer.append(")");
        const oneLine = this.statements.length === 1 && this.statements[0].isSimple();
        if(!oneLine)
            writer.append(" {");
        writer.newLine();
        writer.indent();
        this.statements.toDialect(writer);
        writer.dedent();
        if(!oneLine) {
            writer.append("}");
            writer.newLine();
        }
    }

    toEDialect(writer: CodeWriter): void {
        writer.append("for each ");
        writer.append(this.v1!.name);
        if(this.v2) {
            writer.append(", ");
            writer.append(this.v2.name);
        }
        writer.append(" in ");
        this.source.toDialect(writer);
        writer.append(":");
        writer.newLine();
        writer.indent();
        this.statements.toDialect(writer);
        writer.dedent();
    }

    toMDialect(writer: CodeWriter): void {
        writer.append("for ");
        writer.append(this.v1!.name);
        if(this.v2) {
            writer.append(", ");
            writer.append(this.v2.name);
        }
        writer.append(" in ");
        this.source.toDialect(writer);
        writer.append(":");
        writer.newLine();
        writer.indent();
        this.statements.toDialect(writer);
        writer.dedent();
    }

    canReturn() {
        return true;
    }

    declare(transpiler: Transpiler): void {
        const srcType = this.source.check(transpiler.context);
        if(srcType instanceof DictionaryType)
            transpiler.require(StrictSet);
        const elemType = srcType.checkIterator(transpiler.context, this, this.source);
        this.source.declare(transpiler);
        transpiler = transpiler.newChildTranspiler();
        if(this.v2) {
            transpiler.context.registerInstance(new Variable(this.v1!, IntegerType.instance), true);
            transpiler.context.registerInstance(new Variable(this.v2, elemType), true);
        } else
            transpiler.context.registerInstance(new Variable(this.v1!, elemType), true);
        this.statements.declare(transpiler);
    }

    transpile(transpiler: Transpiler): void {
        if(this.v2)
            this.transpileWithIndex(transpiler);
        else
            this.transpileNoIndex(transpiler);
    }

    transpileNoIndex(transpiler: Transpiler) {
        const srcType = this.source.check(transpiler.context);
        if(srcType instanceof ListType)
            this.transpileArrayNoIndex(transpiler);
        else
            this.transpileIteratorNoIndex(transpiler);
    }

    transpileArrayNoIndex(transpiler: Transpiler) {
        const srcType = this.source.check(transpiler.context);
        const elemType = srcType.checkIterator(transpiler.context, this, this.source);
        const itemsName = "$" + this.v1!.name + "_items";
        transpiler.append("var ").append(itemsName).append(" = ");
        this.source.transpile(transpiler);
        transpiler.append(";").newLine();
        const idxName = "$" + this.v1!.name + "_idx";
        transpiler.append("for(var ").append(idxName).append(" = 0; ").append(idxName).append(" < ").append(itemsName).append(".length; ").append(idxName).append("++) {");
        const child = transpiler.newChildTranspiler();
        child.indent();
        child.context.registerInstance(new Variable(this.v1!, elemType), true);
        child.append("var ").append(this.v1!.name).append(" = ").append(itemsName).append("[").append(idxName).append("];");
        this.statements.transpile(child);
        child.dedent();
        child.flush();
        transpiler.append("}");
        transpiler.newLine();
     }

    transpileIteratorNoIndex(transpiler: Transpiler) {
        const srcType = this.source.check(transpiler.context);
        const elemType = srcType.checkIterator(transpiler.context, this, this.source);
        const iterName = "$" + this.v1!.name + "_iterator";
        transpiler.append("var ").append(iterName).append(" = ");
        this.source.transpile(transpiler);
        transpiler.append(".iterator();");
        transpiler.newLine();
        transpiler.append("while(").append(iterName).append(".hasNext()) {");
        const child = transpiler.newChildTranspiler();
        child.indent();
        child.context.registerInstance(new Variable(this.v1!, elemType), true);
        child.append("var ").append(this.v1!.name).append(" = ").append(iterName).append(".next();");
        child.newLine();
        this.statements.transpile(child);
        child.dedent();
        child.flush();
        transpiler.append("}");
        transpiler.newLine();
    }

    transpileWithIndex(transpiler: Transpiler) {
        const srcType = this.source.check(transpiler.context);
        if(srcType instanceof ListType)
            this.transpileArrayWithIndex(transpiler);
        else
            this.transpileIteratorWithIndex(transpiler);
    }

    transpileArrayWithIndex(transpiler: Transpiler) {
        const srcType = this.source.check(transpiler.context);
        const elemType = srcType.checkIterator(transpiler.context, this, this.source);
        const itemsName = "$" + this.v2!.name + "_items";
        transpiler.append("var ").append(itemsName).append(" = ");
        this.source.transpile(transpiler);
        transpiler.append(";").newLine();
        transpiler.append("for(var ").append(this.v1!.name).append(" = 1; ").append(this.v1!.name).append(" <= ").append(itemsName).append(".length; ").append(this.v1!.name).append("++) {");
        const child = transpiler.newChildTranspiler();
        child.indent();
        child.context.registerInstance(new Variable(this.v1!, IntegerType.instance), true);
        child.context.registerInstance(new Variable(this.v2!, elemType), true);
        child.append("var ").append(this.v2!.name).append(" = ").append(itemsName).append("[").append(this.v1!.name).append("-1];").newLine();
        this.statements.transpile(child);
        child.dedent();
        child.flush();
        transpiler.append("}");
        transpiler.newLine();
    }

    transpileIteratorWithIndex(transpiler: Transpiler) {
        const srcType = this.source.check(transpiler.context);
        const elemType = srcType.checkIterator(transpiler.context, this, this.source);
        transpiler.append("var ").append(this.v1!.name).append(" = 1;").newLine();
        const iterName = "$" + this.v2!.name + "_iterator";
        transpiler.append("var ").append(iterName).append(" = ");
        this.source.transpile(transpiler);
        transpiler.append(".iterator();");
        transpiler.newLine();
        transpiler.append("while(").append(iterName).append(".hasNext()) {");
        const child = transpiler.newChildTranspiler();
        child.indent();
        child.context.registerInstance(new Variable(this.v1!, IntegerType.instance), true);
        child.context.registerInstance(new Variable(this.v2!, elemType), true);
        child.append("var ").append(this.v2!.name).append(" = ").append(iterName).append(".next();").newLine();
        this.statements.transpile(child);
        child.append(this.v1!.name).append("++;").newLine();
        child.dedent();
        child.flush();
        transpiler.append("}");
        transpiler.newLine();
    }

}
