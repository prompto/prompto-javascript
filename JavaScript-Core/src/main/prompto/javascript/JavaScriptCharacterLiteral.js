import JavaScriptLiteral from './JavaScriptLiteral.js'
import { CharacterType } from '../type'

export default class JavaScriptCharacterLiteral extends JavaScriptLiteral {

    constructor(text) {
        super(text);
    }

    check(context: Context): IType {
        return CharacterType.instance;
    }
}
