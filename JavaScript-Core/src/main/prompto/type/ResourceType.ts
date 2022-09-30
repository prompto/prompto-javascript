import CategoryType from './CategoryType'
import {Identifier} from "../grammar";
import {TypeFamily} from "../store";
import {Context} from "../runtime";

export default class ResourceType extends CategoryType {
 
    constructor(name: Identifier) {
        super(name, false, TypeFamily.RESOURCE);
    }

    equals(obj: any) {
        return obj == this || (obj instanceof ResourceType && this.name==obj.name);
    }

    asMutable(context: Context, mutable: boolean) {
        if(mutable)
            throw new Error("Should bever get there!");
        return this;
    }
}


