import IterableType from '../../../main/prompto/type/IterableType.ts'
import { IntegerType } from './index.ts'
import { Identifier } from '../grammar'
import ToListMethodDeclaration from '../builtins/ToListMethodDeclaration.ts'
import ToSetMethodDeclaration from '../builtins/ToSetMethodDeclaration.ts'

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

    checkMember(context, section, id) {
        if ("count" === id.name)
            return IntegerType.instance;
        else
            return  super.checkMember(context, section, id);
    }

    declare(transpiler: Transpiler): void {
        this.itemType.declare(transpiler);
    }

    getMemberMethods(context, id) {
        switch (id.name) {
            case "toList":
                return [new ToListMethodDeclaration(this.itemType)];
            case "toSet":
                return [new ToSetMethodDeclaration(this.itemType)];
            default:
                return  super.getMemberMethods.call(context, id);
        }
    }
}

