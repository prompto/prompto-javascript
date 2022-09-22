import Literal from './Literal.ts'
import { UUIDType } from '../type'
import { UUIDValue } from '../value'
import { UUID } from '../intrinsic'

/*jshint evil:true*/
function parse(text) {
	return eval(text);
}

export default class UUIDLiteral extends Literal {

    constructor(text) {
        super(text, new UUIDValue(parse(text)));
    }

    check(context: Context): Type {
        return UUIDType.instance;
    }

    declare(transpiler: Transpiler): void {
        transpiler.require(UUID);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append("UUID.fromString(").append(this.text).append(")");
    }
}


