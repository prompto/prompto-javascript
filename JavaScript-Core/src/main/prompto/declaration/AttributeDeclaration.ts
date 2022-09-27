import BaseDeclaration from './BaseDeclaration'
import { AttributeInfo } from '../store'
import {ContainerType, IType} from '../type'
import {catalog, Context, Transpiler} from '../runtime';
import {Identifier, IdentifierList} from "../grammar";
import {IConstraint} from "../constraint";
import {CodeWriter} from "../utils";
import {IExpression} from "../expression";
import {IValue} from "../value";

export default class AttributeDeclaration extends BaseDeclaration {

    type: IType;
    constraint: IConstraint | null;
    indexTypes: IdentifierList | null;
    storable: boolean;

    constructor(id: Identifier, type: IType, constraint: IConstraint | null, indexTypes: IdentifierList | null) {
        super(id);
        this.type = type;
        this.constraint = constraint;
        this.indexTypes = indexTypes;
        this.storable = false;
    }

    getDeclarationType(): string {
        return "Attribute";
    }

    toDeclarationInfo(): catalog.AttributeInfo {
        return { name: this.name, dialect: this.dialect.name };
    }

    getType(context?: Context): IType {
        return this.type;
    }

    toString(): string {
        return this.name + ':' + this.type.toString();
    }

    toDialect(writer: CodeWriter): void {
        writer.toDialect(this);
    }

    toEDialect(writer: CodeWriter): void {
        writer.append("define ");
        writer.append(this.name);
        writer.append(" as ");
        if(this.storable)
            writer.append("storable ");
        this.type.toDialect(writer);
        writer.append(" attribute");
        if (this.constraint != null)
            this.constraint.toDialect(writer);
        if (this.indexTypes != null) {
            writer.append(" with ");
            this.indexTypes.toDialect(writer, true);
            writer.append(" index");
        }
    }

    toODialect(writer: CodeWriter): void {
        if(this.storable)
            writer.append("storable ");
        writer.append("attribute ");
        writer.append(this.name);
        writer.append(" : ");
        this.type.toDialect(writer);
        if (this.constraint != null)
            this.constraint.toDialect(writer);
        if (this.indexTypes != null) {
            writer.append(" with index")
            if (this.indexTypes.length > 0) {
                writer.append(" (");
                this.indexTypes.toDialect(writer, false);
                writer.append(')');
            }
        }
        writer.append(';');
    }

    toMDialect(writer: CodeWriter): void {
        if(this.storable)
            writer.append("storable ");
        writer.append("attr ");
        writer.append(this.name);
        writer.append(" ( ");
        this.type.toDialect(writer);
        writer.append(" ):").newLine();
        writer.indent();
        if (this.constraint != null)
            this.constraint.toDialect(writer);
        if (this.indexTypes != null) {
            if (this.constraint != null)
                writer.newLine();
            writer.append("index (");
            this.indexTypes.toDialect(writer, false);
            writer.append(')');
        }
        if (this.constraint ==null && this.indexTypes ==null)
            writer.append("pass");
        writer.dedent();
    }

    register(context: Context): void {
        context.registerDeclaration(this);
    }

    check(context: Context): IType {
        this.type.checkExists(context);
        return this.type;
    }

    checkValue(context: Context, expression: IExpression): IValue {
        const value = expression.interpret(context);
        if(this.constraint)
            this.constraint.checkValue(context, value);
        return value;
    }

    getAttributeInfo(): AttributeInfo {
        const collection = this.type instanceof ContainerType;
        const family = collection ? (this.type as unknown as ContainerType).itemType.family : this.type.family;
        return new AttributeInfo(this.name, family, collection, this.indexTypes);
    }

    declare(transpiler: Transpiler): void {
        this.type.declare(transpiler);
        if(this.constraint)
            this.constraint.declareChecker(transpiler, this.name, this.type);
    }

    transpile(transpiler: Transpiler): void {
        // nothing to do
    }
}
