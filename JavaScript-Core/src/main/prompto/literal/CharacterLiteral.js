
/*jshint evil:true*/
function unescape(text) {
	return eval(text);
}

export default class CharacterLiteral extends Literal {

    constructor(text) {
        super(text, new CharacterValue(unescape(text)));
    }

    check(context) {
        return CharacterType.instance;
    }

    declare(transpiler) {
        // nothing to do
    }

    transpile(transpiler) {
        transpiler.append(this.text);
    }
}


