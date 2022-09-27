import Section from '../parser/Section'
import INamed from "./INamed";
import Identifier from "./Identifier";
import {Context} from "../runtime";
import {IType} from "../type";

export default abstract class NamedInstance extends Section implements INamed {

    id: Identifier;

    constructor(id: Identifier) {
        super();
        this.id = id;
    }

    get name(): string {
        return this.id.name;
    }

    abstract getType(context: Context): IType;

}
