import {Context} from "../runtime";
import {IType} from "../type";
import Identifier from "./Identifier";

export default interface INamed {
    id: Identifier;
    get name(): string;
    getType(context?: Context): IType;

}
