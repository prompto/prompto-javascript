import BaseExpression from './BaseExpression'
import {IType, ResourceType, TextType} from '../type'
import { NullReferenceError, InvalidResourceError } from '../error'
import {IValue, TextValue} from '../value'
import {IExpression} from "./index";
import {Context, Transpiler} from "../runtime";
import {CodeWriter} from "../utils";
import IResource from "../value/IResource";
import {Section} from "../parser";

export default class ReadAllExpression extends BaseExpression {

    resource: IExpression;

    constructor(resource: IExpression) {
        super();
        this.resource = resource;
    }

    toString() {
        return "read all from " + this.resource.toString();
    }

    toDialect(writer: CodeWriter): void {
        writer.append("read all from ");
        this.resource.toDialect(writer);
    }

    check(context: Context): IType {
        context = context.newResourceContext();
        const sourceType = this.resource.check(context);
        if(!(sourceType instanceof ResourceType))
            context.problemListener.reportNotAResource(this.asSection());
        return TextType.instance;
    }

    interpret(context: Context): IValue {
        context = context.newResourceContext();
        const value = this.resource.interpret(context);
        if(!value) {
            throw new NullReferenceError();
        }
        if(!value.isResource()) {
            throw new InvalidResourceError("Not a resource");
        }
        const res = value as unknown as IResource;
        if(!res.isReadable()) {
            throw new InvalidResourceError("Not readable");
        }
        try {
            const s = res.readFully();
            return new TextValue(s);
        } finally {
            res.close();
        }
    }

    declare(transpiler: Transpiler): void {
        this.resource.declare(transpiler);
    }

    transpile(transpiler: Transpiler): void {
        this.resource.transpile(transpiler);
        transpiler.append(".readFully()");
    }

    asSection(): Section {
        return this.resource instanceof Section ? this.resource : this;
    }
}
