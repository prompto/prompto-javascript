import IterableType from './IterableType.js'
import { BooleanType, IntegerType } from './index.js'
import { Variable } from '../runtime/index.js'
import {convertToJson, convertToJsonNode} from '../utils/index'

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

    checkMember(context, section, name) {
        if ("count" === name) {
            return IntegerType.instance;
        } else {
            return  super.checkMember(context, section, name);
        }
    }

    declareMember(transpiler, section, name) {
        switch(name) {
            case "count":
                break;
            case "json":
                transpiler.require(convertToJson);
                transpiler.require(convertToJsonNode);
                break;
            default:
               super.declareMember(transpiler, section, name);
        }
    }

    transpileMember(transpiler, name) {
        if ("count" === name) {
            transpiler.append("length");
        } else {
            return super.transpileMember(transpiler, name);
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
