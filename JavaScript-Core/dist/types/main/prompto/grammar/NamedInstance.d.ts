import Section from '../parser/Section';
import INamed from "./INamed";
import Identifier from "./Identifier";
import { Context } from "../runtime";
import { IType } from "../type";
export default abstract class NamedInstance extends Section implements INamed {
    id: Identifier;
    constructor(id: Identifier);
    get name(): string;
    abstract getType(context: Context): IType;
}
