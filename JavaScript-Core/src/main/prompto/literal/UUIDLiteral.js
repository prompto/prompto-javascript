import Literal from './Literal.js'
import { UUIDType } from '../type/index.js'
import { UUIDValue } from '../value/index.js'
import { UUID } from '../intrinsic/index.js'

/*jshint evil:true*/
function parse(text) {
	return eval(text);
}

export default class UUIDLiteral extends Literal {

    constructor(text) {
        super(text, new UUIDValue(parse(text)));
    }

    check(context) {
        return UUIDType.instance;
    }

    declare(transpiler) {
        transpiler.require(UUID);
    }

    transpile(transpiler) {
        transpiler.append("UUID.fromString(").append(this.text).append(")");
    }
}


