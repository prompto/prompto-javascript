export default class ContOp {

    constructor(name) {
        this.name = name;
    }

    toString() {
        return this.name.toLowerCase().replace('_', ' ');
    }

    toDialect(writer) {
        writer.append(this.toString());
    }
}

ContOp.IN = new ContOp("IN");
ContOp.HAS = new ContOp("HAS");
ContOp.HAS_ALL = new ContOp("HAS_ALL");
ContOp.HAS_ANY = new ContOp("HAS_ANY");
ContOp.NOT_IN = new ContOp("NOT_IN");
ContOp.NOT_HAS = new ContOp("NOT_HAS");
ContOp.NOT_HAS_ALL = new ContOp("NOT_HAS_ALL");
ContOp.NOT_HAS_ANY = new ContOp("NOT_HAS_ANY");
