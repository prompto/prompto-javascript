
/* used for downcast */
export default class LinkedVariable {

    constructor(type, linked) {
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
