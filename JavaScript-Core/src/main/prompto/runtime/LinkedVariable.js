import NamedInstance from "../../../main/prompto/grammar/NamedInstance.ts";

/* used for downcast */

export default class LinkedVariable extends NamedInstance {

    constructor(type, linked) {
        super();
        this.type = type;
        this.linked = linked;
    }

    getType(context) {
        return this.type;
    }

    get name() {
        return this.linked.name;
    }
}
