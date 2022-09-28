import CategoryParameter from './CategoryParameter'
import { AttributeDeclaration, ConcreteCategoryDeclaration } from '../declaration'
import {Identifier, IdentifierList} from '../grammar'
import { SyntaxError } from '../error'
import {equalObjects, equalArrays, CodeWriter} from '../utils'
import {IType} from "../type";
import {IParameter} from "./index";
import {Context} from "../runtime";

export default class ExtendedParameter extends CategoryParameter {

    attributes: IdentifierList;

    constructor(id: Identifier, mutable: boolean, type: IType, attributes: IdentifierList) {
        super(id, mutable, type);
        this.attributes = attributes;
    }

    getProto() {
        return this.type.name + '(' + this.attributes.toString() + ')';
    }

    equals(obj: IParameter): boolean {
        return obj == this ||
            (obj instanceof ExtendedParameter && equalObjects(this.type, obj.type) && this.name == obj.name &&  equalArrays(this.attributes, obj.attributes));
    }

    register(context: Context): void {
        const declaration = new ConcreteCategoryDeclaration(this.id, this.attributes, new IdentifierList(null, this.type.id), null);
        context.registerDeclaration(declaration);
        context.registerInstance(this, true);
        if(this.defaultExpression!=null)
            context.setValue(this.id, this.defaultExpression.interpret(context));
    }

    check(context: Context): IType {
        this.type.checkExists(context);
        if(this.attributes!==null) {
            this.attributes.forEach(id => {
                const actual = context.getRegisteredDeclaration(AttributeDeclaration, id);
                if (!actual && id.name != "text") {
                    throw new SyntaxError("Unknown attribute: \"" + id.name + "\"");
                }
            });
        }
        return this.type;
    }

    getType(context: Context) {
        const decl = context.getRegistered(this.id);
        return decl ? decl.getType(context) : this.type;
    }

    toEDialect(writer: CodeWriter): void {
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

    toODialect(writer: CodeWriter): void {
        this.type.toDialect(writer);
        writer.append('(');
        this.attributes.toDialect(writer, false);
        writer.append(')');
        writer.append(' ');
        writer.append(this.name);
    }

    toMDialect(writer: CodeWriter): void {
        writer.append(this.name);
        writer.append(':');
        this.type.toDialect(writer);
        writer.append('(');
        this.attributes.toDialect(writer, false);
        writer.append(')');
    }
}

