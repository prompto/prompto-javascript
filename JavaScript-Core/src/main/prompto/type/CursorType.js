import IterableType from './IterableType.js'
import { IntegerType } from './index.js'
import { Identifier } from '../grammar/index.js'
import { Variable } from '../runtime/index.js'
import ToListMethodDeclaration from '../builtins/ToListMethodDeclaration.js'

export default class CursorType extends IterableType {

    constructor(itemType) {
        super(new Identifier("Cursor<" + itemType.name + ">"), itemType);
    }

    withItemType(itemType) {
        return new CursorType(itemType);
    }

    isAssignableFrom(context, other) {
        return  super.isAssignableFrom(context, other)
            || ((other instanceof CursorType) && this.itemType.isAssignableFrom(context, other.itemType));
    }

    equals(obj) {
        if(obj==this)
            return true;
        if(!(obj instanceof CursorType))
            return false;
        return this.itemType.equals(obj.itemType);
    }

    checkIterator(context, source) {
        return this.itemType;
    }

    declareIterator(transpiler, name, expression) {
        transpiler = transpiler.newChildTranspiler(null);
        transpiler.context.registerValue(new Variable(name, this.itemType));
        expression.declare(transpiler);
    }

    transpileIterator(transpiler, name, expression) {
        transpiler.append(".iterate(function(").append(name.name).append(") { return ");
        transpiler = transpiler.newChildTranspiler(null);
        transpiler.context.registerValue(new Variable(name, this.itemType));
        expression.transpile(transpiler);
        transpiler.append("; }, this)");
        transpiler.flush();
    }

    checkMember(context, section, name) {
        if ("count"===name)
            return IntegerType.instance;
        else if ("totalCount"===name)
            return IntegerType.instance;
        else
            return  super.checkMember(context, section, name);
    }

    declareMember(transpiler, section, name) {
        if("count"!==name && "totalCount"!==name)
            super.declareMember(transpiler, section, name);
    }

    transpileMember(transpiler, name) {
        if("count"===name || "totalCount"===name) {
            transpiler.append(name);
        } else
            super.transpileMember(transpiler, name);
    }

    getMemberMethods(context, name) {
        switch (name) {
            case "toList":
                return [new ToListMethodDeclaration(this.itemType)];
            default:
                return super.getMemberMethods.call(context, name);
        }
    }
}

