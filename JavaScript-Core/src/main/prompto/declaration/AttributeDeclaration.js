import BaseDeclaration from "./BaseDeclaration"
import { AttributeInfo } from "../store/index"
import { ContainerType } from "../type/index"

export default class AttributeDeclaration extends BaseDeclaration {

    constructor(id, type, constraint, indexTypes) {
        super(id);
        this.type = type;
        this.constraint = constraint;
        this.indexTypes = indexTypes;
        this.storable = false;
    }

    getDeclarationType() {
        return "Attribute";
    }

    getType() {
        return this.type;
    }

    toString() {
        return this.name + ':' + this.type.toString();
    }

    toDialect(writer) {
        writer.toDialect(this);
    }

    toEDialect(writer) {
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

    toODialect(writer) {
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

    toMDialect(writer) {
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

    register(context) {
        context.registerDeclaration(this);
    }

    check(context) {
        this.type.checkExists(context);
        return this.type;
    }

    checkValue(context, expression) {
        const value = expression.interpret(context);
        if(this.constraint==null) {
            return value;
        }
        this.constraint.checkValue(context, value);
        return value;
    }

    getAttributeInfo() {
        const collection = this.type instanceof ContainerType;
        const family = collection ? this.type.itemType.family : this.type.family;
        return new AttributeInfo(this.name, family, collection, this.indexTypes);
    }

    declare(transpiler) {
        this.type.declare(transpiler);
        if(this.constraint)
            this.constraint.declare(transpiler, this.name, this.type);
    }
}
