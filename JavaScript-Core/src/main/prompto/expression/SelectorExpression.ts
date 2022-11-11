import SelectorBase from './SelectorBase'
import {IntegerType, IType} from '../type'
import {IntegerValue, IValue, NullValue} from '../value'

import { SyntaxError, NullReferenceError } from '../error'
import {IExpression} from "./index";
import {CodeWriter} from "../utils";
import {Context, Transpiler} from "../runtime";
import ISliceable from "../value/ISliceable";

export default class SelectorExpression extends SelectorBase {

    first: IExpression | null;
    last: IExpression | null;

    constructor(parent: IExpression | null, first: IExpression | null, last: IExpression | null) {
        super(parent);
        this.first = first || null;
        this.last = last || null;
    }

    toString() {
        return this.parent!.toString() + "[" +
                (this.first==null?"":this.first.toString()) + ":" +
                (this.last==null?"":this.last.toString()) + "]";
    }

    toDialect(writer: CodeWriter): void {
        this.parent!.toDialect(writer);
        writer.append('[');
        if (this.first != null)
            this.first.toDialect(writer);
        writer.append(':');
        if (this.last != null)
            this.last.toDialect(writer);
        writer.append(']');
    }

    check(context: Context): IType {
        const firstType = this.first!=null ? this.first.check(context) : null;
        const lastType = this.last!=null ? this.last.check(context) : null;
        if(firstType!=null && !(firstType instanceof IntegerType)) {
            throw new SyntaxError(firstType.toString() + " is not an integer");
        }
        if(lastType!=null && !(lastType instanceof IntegerType)) {
            throw new SyntaxError(lastType.toString() + " is not an integer");
        }
        const parentType = this.parent!.check(context);
        return parentType.checkSlice(context, this);
    }

    interpretExpression(context: Context): IValue {
        const value = this.parent!.interpretExpression(context);
        if (!value || value == NullValue.instance) {
            throw new NullReferenceError();
        }
        if(!value.isSliceable())
            throw new SyntaxError("Illegal sliced object: " + this.parent!.toString());
        const sliceable = value as unknown as ISliceable;
        const fi = this.first != null ? this.first.interpretExpression(context) : null;
        if (fi && !(fi instanceof IntegerValue)) {
            throw new SyntaxError("Illegal slice value type: " + fi.toString());
        }
        const li = this.last != null ? this.last.interpretExpression(context) : null;
        if (li && !(li instanceof IntegerValue)) {
            throw new SyntaxError("Illegal slice value type: " + li.toString());
        }
        return sliceable.slice(fi as IntegerValue, li as IntegerValue);
    }

    declare(transpiler: Transpiler): void {
        this.parent!.declare(transpiler);
        const parentType = this.parent!.check(transpiler.context);
        return parentType.declareSlice(transpiler, this.first, this.last);

    }

    transpile(transpiler: Transpiler): void {
        this.parent!.transpile(transpiler);
        const parentType = this.parent!.check(transpiler.context);
        return parentType.transpileSlice(transpiler, this.first, this.last);

    }
}
