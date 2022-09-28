import Literal from './Literal'
import {CharacterType, IType} from '../type'
import { CharacterValue } from '../value'
import {Context, Transpiler} from "../runtime";

/*jshint evil:true*/
function unescape(text: string): string {
	return eval(text) as string;
}

export default class CharacterLiteral extends Literal<CharacterValue> {

    constructor(text:string) {
        super(text, new CharacterValue(unescape(text)));
    }

    check(context: Context): IType {
        return CharacterType.instance;
    }

    declare(transpiler: Transpiler): void {
        // nothing to do
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append(this.text);
    }
}


