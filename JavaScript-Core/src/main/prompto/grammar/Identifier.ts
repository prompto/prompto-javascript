import Section from '../parser/Section'

export default class Identifier extends Section {

    static DB_ID = new Identifier("dbId");
    name: string;

    constructor(name: string) {
        super();
        this.name = name;
    }

    toString() {
        return this.name;
    }

    equals(other: object) {
        if(!other || !(other instanceof Identifier))
            return false;
        else
            return this.name == other.name;
    }
}
