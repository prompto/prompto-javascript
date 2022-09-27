import BaseType from './BaseType'
import { ArrowExpression } from "../expression"

let MissingType = null;
import("../type/MissingType").then(res => MissingType = res.default);
let AnyType = null;
import("../type/AnyType").then(res => AnyType = res.default);

export default class NativeType extends BaseType {

    static all: NativeType[] | null = null;

    constructor(id) {
        super(id);
    }

    getSortedComparator(context, key, desc) {
        if(key==null)
            return this.getNativeSortedComparator(desc);
        else
            return this.getExpressionSortedComparator(context, key, desc);
    }

    getExpressionSortedComparator(context, expression, desc) {
        if(expression instanceof ArrowExpression)
            return expression.getSortedComparator(context, this, desc);
        else
            throw new Error("Not supported!");
    }

    getNativeSortedComparator(desc) {
        if(desc)
            return (o1, o2) => {
                o1 = o1.value;
                o2 = o2.value;
                return o1 < o2 ? 1 : o1 === o2 ? 0 : -1;
            };
        else
            return (o1, o2) => {
                o1 = o1.value;
                o2 = o2.value;
                return o1 > o2 ? 1 : o1 === o2 ? 0 : -1;
            };
    }

    checkUnique(context) {
        // nothing to do
    }

    checkExists(context) {
        // nothing to do
    }

    isMoreSpecificThan(context, other) {
        return  other === MissingType.instance || other === AnyType.instance;
    }

    equals(obj) {
        return obj===this;
    }

    declareSorted(transpiler, key) {
        // nothing to do
    }

    transpileSortedComparator(transpiler, key, desc) {
        if(key instanceof ArrowExpression)
            return key.transpileSortedComparator(transpiler, this, desc);
        else if(desc)
            transpiler.append("function(o1, o2) { return o1 === o2 ? 0 : o1 > o2 ? -1 : 1; }");
    }
}




