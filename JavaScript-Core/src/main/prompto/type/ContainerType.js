import IterableType from './IterableType.js'
import { BooleanType, IntegerType } from './index.js'
import { Variable } from '../runtime/index.js'

export default class ContainerType extends IterableType {
  
    constructor(id, itemType) {
        super(id);
        this.itemType = itemType;
    }

    checkContains(context, section, other) {
        if(other.isAssignableFrom(context, this.itemType)) {
            return BooleanType.instance;
        } else {
            return  super.checkContains(context, section, other);
        }
    }

    checkMember(context, section, id) {
        if ("count" === id.name) {
            return IntegerType.instance;
        } else {
            return  super.checkMember(context, section, id);
        }
    }

    declareMember(transpiler, section, id) {
        if(id.name !== "count")
           super.declareMember(transpiler, section, id);
    }

    transpileMember(transpiler, id) {
        if ("count" === id.name) {
            transpiler.append("length");
        } else {
            return super.transpileMember(transpiler, id);
        }
    }

    declareSorted(transpiler, key) {
        // nothing to do
    }

    declareIterator(transpiler, name, expression) {
        transpiler = transpiler.newChildTranspiler();
        transpiler.context.registerValue(new Variable(name, this.itemType));
        expression.declare(transpiler);
    }

    transpileIterator(transpiler, name, expression) {
        transpiler.append(".iterate(function(").append(name).append(") { return ");
        transpiler = transpiler.newChildTranspiler();
        transpiler.context.registerValue(new Variable(name, this.itemType));
        expression.transpile(transpiler);
        transpiler.append("; }, this)");
        transpiler.flush();
    }
}
