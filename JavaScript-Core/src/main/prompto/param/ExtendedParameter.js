import CategoryParameter from "./CategoryParameter"
import { AttributeDeclaration, ConcreteCategoryDeclaration } from "../declaration/index"
import { IdentifierList } from "../grammar/index"
import { SyntaxError } from "../error/index"
import { equalObjects, equalArrays } from "../utils/index"

export default class ExtendedParameter extends CategoryParameter {

    constructor(type, id, attributes) {
        super(type, id);
        this.attributes = attributes;
    }

    getProto() {
        return this.type.name + '(' + this.attributes.toString() + ')';
    }

    equals(obj) {
        if(obj===this) {
            return true;
        } 
        if(obj===null || obj===undefined) {
            return false;
        }
        if(!(obj instanceof ExtendedParameter)) {
            return false;
        }
        return equalObjects(this.type, obj.type) &&
            this.name===obj.name && 
            equalArrays(this.attributes, obj.attributes);
    }

    register(context) {
        const actual = context.getRegisteredValue(this.name);
        if(actual!==null) {
            throw new SyntaxError("Duplicate argument: \"" + this.id.name + "\"");
        }
        const declaration = new ConcreteCategoryDeclaration(this.id, this.attributes, new IdentifierList(this.type.id), null);
        context.registerDeclaration(declaration);
        context.registerValue(this);
        if(this.defaultExpression!=null)
            context.setValue(this.id, this.defaultExpression.interpret(context));
    }

    check(context) {
        this.type.checkExists(context);
        if(this.attributes!==null) {
            this.attributes.forEach(attr => {
                const actual = context.getRegisteredDeclaration(attr);
                if (!(actual instanceof AttributeDeclaration)) {
                    throw new SyntaxError("Unknown attribute: \"" + attr + "\"");
                }
            });
        }
    }

    getType(context) {
        const decl = context.getRegisteredDeclaration(this.name);
        return decl ? decl.getType(context) : this.type;
    }

    toEDialect(writer) {
        this.type.toDialect(writer);
        writer.append(' ');
        writer.append(this.name);
        switch(this.attributes.length) {
            case 0:
                break;
            case 1:
                writer.append(" with attribute ");
                this.attributes.toDialect(writer, false);
                break;
            default:
                writer.append(" with attributes ");
                this.attributes.toDialect(writer, true);
                break;
        }
    }

    toODialect(writer) {
        this.type.toDialect(writer);
        writer.append('(');
        this.attributes.toDialect(writer, false);
        writer.append(')');
        writer.append(' ');
        writer.append(this.name);
    }

    toMDialect(writer) {
        writer.append(this.name);
        writer.append(':');
        this.type.toDialect(writer);
        writer.append('(');
        this.attributes.toDialect(writer, false);
        writer.append(')');
    }
}

