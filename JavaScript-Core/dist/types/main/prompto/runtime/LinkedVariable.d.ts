import NamedInstance from "../grammar/NamedInstance";
import { IType } from "../type";
import { INamed } from "../grammar";
import { Context } from "./Context";
export default class LinkedVariable extends NamedInstance {
    type: IType;
    linked: INamed;
    constructor(type: IType, linked: INamed);
    getType(context: Context): IType;
    get name(): string;
}
