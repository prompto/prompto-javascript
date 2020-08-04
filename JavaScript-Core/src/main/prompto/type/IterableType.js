var NativeType = require("./NativeType").NativeType;

class IterableType extends NativeType {
    constructor(id, itemType) {
        super(id);
        this.itemType = itemType;
        return this;
    }

    isMoreSpecificThan(context, other) {
        return (other instanceof IterableType &&
            this.itemType.isMoreSpecificThan(context, other.itemType));
    }
}

exports.IterableType = IterableType;

