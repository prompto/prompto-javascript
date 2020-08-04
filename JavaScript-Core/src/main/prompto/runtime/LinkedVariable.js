
/* used for downcast */
class LinkedVariable {
    constructor(type, linked) {
        this.type = type;
        this.linked = linked;
        return this;
    }

    getType(context) {
        return this.type;
    }

    get name() {
        return this.linked.name;
    }
}

exports.LinkedVariable = LinkedVariable;