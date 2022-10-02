import BaseExpression from './BaseExpression'
import {IType, ResourceType, TextType} from '../type'
import {IValue, IResource,  NullValue, TextValue} from '../value'
import { NullReferenceError, InvalidResourceError } from '../error'
import {IExpression} from "./index";
import {CodeWriter} from "../utils";
import {Context, Transpiler} from "../runtime";
import {Section} from "../parser";

export default class ReadOneExpression extends BaseExpression {

    resource: IExpression;

    constructor(resource: IExpression) {
        super();
        this.resource = resource;
    }

    toString() {
        return "read one from " + this.resource.toString();
    }

    toDialect(writer: CodeWriter): void {
        writer.append("read one from ");
        this.resource.toDialect(writer);
    }

    check(context: Context): IType {
        if(!context.isWithResourceContext())
            context.problemListener.reportNotAResourceContext(this.asSection());
        const sourceType = this.resource.check(context);
        if(!(sourceType instanceof ResourceType))
            context.problemListener.reportNotAResource(this.asSection());
        return TextType.instance;
    }

    interpretExpression(context: Context): IValue {
        if(!context.isWithResourceContext())
            context.problemListener.reportNotAResourceContext(this.asSection());
        const value = this.resource.interpretExpression(context);
        if(value==null) {
            throw new NullReferenceError();
        }
        if(!value.isResource()) {
            throw new InvalidResourceError("Not a resource");
        }
        const res = value as unknown as IResource;
        if(!res.isReadable()) {
            throw new InvalidResourceError("Not readable");
        }
        const s = res.readLine();
        return s ? new TextValue(s) : NullValue.instance;
    }

    declare(transpiler: Transpiler): void {
        this.resource.declare(transpiler);
    }

    transpile(transpiler: Transpiler): void {
        this.resource.transpile(transpiler);
        transpiler.append(".readLine()");
    }

    asSection(): Section {
        return this.resource instanceof Section ? this.resource : this;
    }

}
