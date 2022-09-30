import NamedInstance from "../grammar/NamedInstance";
import {IType} from "../type";
import {INamed} from "../grammar";
import {Context} from "./Context";

/* used for downcast */
export default class LinkedVariable extends NamedInstance {

    type: IType;
    linked: INamed;

    constructor(type: IType, linked: INamed) {
        super(linked.id);
        this.type = type;
        this.linked = linked;
    }

    getType(context: Context) {
        return this.type;
    }

    get name() {
        return this.linked.name;
    }
}
