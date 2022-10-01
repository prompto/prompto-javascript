import ExecutionError from './ExecutionError'
import { Identifier } from "../grammar";
import {Context} from "../runtime";
import {IExpression} from "../expression";

export default class IndexOutOfRangeError extends ExecutionError {

	getExpression(context: Context) {
		return context.getRegisteredInstance(new Identifier("INDEX_OUT_OF_RANGE")) as unknown as IExpression;
	}

}
