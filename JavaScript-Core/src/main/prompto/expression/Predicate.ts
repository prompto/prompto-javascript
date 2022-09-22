import {Expression} from "./index";
import {Context, Transpiler} from "../runtime";
import {QueryBuilder} from "../store";

export default interface Predicate extends Expression {
    checkQuery(context: Context ): void;
    interpretQuery(context: Context, builder: QueryBuilder): void;
    declareQuery(transpiler: Transpiler): void;
    transpileQuery(transpiler: Transpiler, builderName: string): void;

}
