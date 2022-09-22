import Section from '../parser/Section'
import Named from "./Named";
import Identifier from "./Identifier";
import {Context} from "../runtime";
import {Type} from "../type";

export default abstract class NamedInstance extends Section implements Named {

    id: Identifier;

    constructor(id: Identifier) {
        super();
        this.id = id;
    }

    get name(): string {
        return this.id.name;
    }

    abstract getType(context: Context): Type;

}
