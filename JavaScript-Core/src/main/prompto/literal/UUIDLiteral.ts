import Literal from './Literal'
import {IType, UUIDType} from '../type'
import { UUIDValue } from '../value'
import { UUID } from '../intrinsic'
import {Context, Transpiler} from "../runtime";

/*jshint evil:true*/
function parse(text: string) {
	return eval(text) as string;
}

export default class UUIDLiteral extends Literal<UUIDValue> {

    constructor(text: string) {
        super(text, new UUIDValue(parse(text)));
    }

    check(context: Context): IType {
        return UUIDType.instance;
    }

    declare(transpiler: Transpiler): void {
        transpiler.require(UUID);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append("UUID.fromString(").append(this.text).append(")");
    }
}


