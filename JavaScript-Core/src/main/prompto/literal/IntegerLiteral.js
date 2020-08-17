
function parse(value) {
	return parseInt(value);
}

export default class IntegerLiteral extends Literal {

    constructor(text, value) {
        super(text, new IntegerValue(value || parse(text)));
    }

    check(context) {
        return IntegerType.instance;
    }

    declare(transpiler) {
        // nothing to do;
    }

    transpile(transpiler) {
        transpiler.append(this.text);
    }
}
