const Section = require("../parser/Section").Section;

class Identifier extends Section {
    constructor(name) {
        super();
        this.name = name;
        return this;
    }

    toString() {
        return this.name;
    }

    equals(other) {
        if(!other || !(other instanceof Identifier))
            return false;
        else
            return this.name==other.name;
    }
}

exports.Identifier = Identifier;
