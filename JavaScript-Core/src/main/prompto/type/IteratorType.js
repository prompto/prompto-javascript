import IterableType from './IterableType.js'
import { IntegerType } from './index.js'
import { Identifier } from '../grammar/index.js'
import ToListMethodDeclaration from '../builtins/ToListMethodDeclaration.js'

export default class IteratorType extends IterableType {

    constructor(itemType) {
        super(new Identifier("Iterator<" + itemType.name + ">"), itemType);
    }

    withItemType(itemType) {
        return new IteratorType(itemType);
    }

    isAssignableFrom(context, other) {
        return  super.isAssignableFrom(context, other)
            || ((other instanceof IteratorType) && this.itemType.isAssignableFrom(context, other.itemType));
    }

    equals(other) {
        if(other==this)
            return true;
        if(!(other instanceof IteratorType))
            return false;
        return this.itemType.equals(other.itemType);
    }

    checkIterator(context, source) {
        return this.itemType;
    }

    checkMember(context, section, name) {
        if ("count"===name)
            return IntegerType.instance;
        else
            return  super.checkMember(context, section, name);
    }

    declare(transpiler) {
        this.itemType.declare(transpiler);
    }

    getMemberMethods(context, name) {
        switch (name) {
            case "toList":
                return [new ToListMethodDeclaration(this.itemType)];
            default:
                return  super.getMemberMethods.call(context, name);
        }
    }
}

