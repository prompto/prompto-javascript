
export default class IteratorType extends IterableType {

    constructor(itemType) {
        super(new Identifier("Iterator<" + itemType.name + ">"), itemType);
    }

    withItemType(itemType) {
        return new IteratorType(itemType);
    }

    isAssignableFrom(context, other) {
        return IterableType.prototype.isAssignableFrom.call(this, context, other)
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
            return IterableType.prototype.checkMember.call(this, context, section, name);
    }

    declare(transpiler) {
        this.itemType.declare(transpiler);
    }

    getMemberMethods(context, name) {
        switch (name) {
            case "toList":
                return [new ToListMethodDeclaration(this.itemType)];
            default:
                return IterableType.prototype.getMemberMethods.call(context, name);
        }
    }
}

