import CategoryType from './CategoryType.js'

export default class ResourceType extends CategoryType {
 
    constructor(name) {
        super(name);
    }

    equals(obj) {
        if(obj==this) {
            return true;
        }
        if(!(obj instanceof ResourceType)) {
            return false;
        }
        return this.name==obj.name;
    }

    asMutable(context, mutable) {
        if(mutable)
            ; // TODO throw ?
        return this;
    }
}


