import {IExpression} from "./index";
import {Context, Transpiler} from "../runtime";
import {IQueryBuilder} from "../store";

export default interface IPredicate extends IExpression {
    checkQuery(context: Context ): void;
    interpretQuery(context: Context, builder: IQueryBuilder): void;
    declareQuery(transpiler: Transpiler): void;
    transpileQuery(transpiler: Transpiler, builderName: string): void;
}
