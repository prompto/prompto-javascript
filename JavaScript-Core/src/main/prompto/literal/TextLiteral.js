import Literal from "./Literal"
import { TextType } from "../type/index"
import { TextValue } from "../value/index"

/*jshint evil:true*/
function unescape(text) {
	return eval(text);
}

export default class TextLiteral extends Literal {

    constructor(text) {
        super(text, new TextValue(unescape(text)));
    }

    check(context) {
        return TextType.instance;
    }

    declare(transpiler) {
        // nothing to do
    }

    transpile(transpiler) {
        transpiler.append(this.text);
    }
}

