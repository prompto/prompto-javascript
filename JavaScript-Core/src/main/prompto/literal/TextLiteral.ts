import Literal from './Literal'
import {TextType, Type} from '../type'
import { TextValue } from '../value'
import {Context, Transpiler} from "../runtime";

/*jshint evil:true*/
function unescape(text: string): string {
	return eval(text) as string;
}

export default class TextLiteral extends Literal<TextValue> {

    constructor(text: string) {
        super(text, new TextValue(unescape(text)));
    }

    check(context: Context): Type {
        return TextType.instance;
    }

    declare(transpiler: Transpiler): void {
        // nothing to do
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append(this.text);
    }
}

