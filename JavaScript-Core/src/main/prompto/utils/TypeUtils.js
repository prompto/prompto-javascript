import { TextValue, IntegerValue, DecimalValue, NullValue } from '../value/index.js'
import { MissingType, TypeMap } from '../type/index.js'

export function convertFromJavaScript(value) {
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


export function inferExpressionsType(context, expressions) {
    if (expressions.length == 0)
        return MissingType.instance;
    const types = new TypeMap();
    expressions.forEach(e => types.add(e.check(context)));
    return types.inferType(context, expressions[0]);
}


