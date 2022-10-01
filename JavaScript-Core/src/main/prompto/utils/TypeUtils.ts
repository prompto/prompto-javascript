import {TextValue, IntegerValue, DecimalValue, NullValue, IValue} from '../value'
import { MissingType, TypeMap } from '../type'
import {Context} from "../runtime";
import {IExpression} from "../expression";
import {Section} from "../parser";

export function convertFromJavaScript(value: any): IValue {
    if(value==null) {
        return NullValue.instance;
    } else if(typeof(value)=='string') {
        return new TextValue(value);
    } else if(typeof(value)=='number') {
        if(Number.isInteger(value))
            return new IntegerValue(value);
        else
            return new DecimalValue(value);
    } else {
        throw "Not implemented yet in convertFromJavaScript:" + typeof(value);
    }
}


export function inferExpressionsType(context: Context, section: Section, expressions: IExpression[]) {
    if (expressions.length == 0)
        return MissingType.instance;
    const types = new TypeMap();
    expressions.forEach(e => types.add(e.check(context)));
    return types.inferType(context, section);
}


