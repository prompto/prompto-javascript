import {Context} from "../runtime";
import {Type} from "../type";
import Identifier from "./Identifier";

export default interface Named {
    id: Identifier;
    get name(): string;
    getType(context: Context): Type;

}
