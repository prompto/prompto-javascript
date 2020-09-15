import NativeType from './NativeType.js'

export default class IterableType extends NativeType {

    constructor(id, itemType) {
        super(id);
        this.itemType = itemType;
    }

    isMoreSpecificThan(context, other) {
        return (other instanceof IterableType &&
            this.itemType.isMoreSpecificThan(context, other.itemType));
    }
}


