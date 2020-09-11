import Section from "../parser/Section"

export default class Identifier extends Section {

    constructor(name) {
        super();
        this.name = name;
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
