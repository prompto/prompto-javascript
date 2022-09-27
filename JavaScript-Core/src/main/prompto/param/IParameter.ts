import {INamed} from "../grammar";
import { Context } from "../runtime";
import {IType} from "../type";
import {IExpression} from "../expression";

export default interface IParameter extends INamed {
    defaultExpression?: IExpression;
    check(context: Context): IType;
    equals(incoming: IParameter): boolean;
}
