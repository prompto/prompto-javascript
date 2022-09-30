import {Literal} from "./index";
import {IValue} from "../value";
import {ExpressionList} from "../expression";
import {IType} from "../type";

export default abstract class ContainerLiteral<T extends IValue> extends Literal<T> {

    mutable: boolean;
    expressions: ExpressionList;
    itemType?: IType;

}
