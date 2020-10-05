import JavaScriptLiteral from './JavaScriptLiteral.js'
import { CharacterType } from '../type/index.js'

export default class JavaScriptCharacterLiteral extends JavaScriptLiteral {

    constructor(text) {
        super(text);
    }

    check(context) {
        return CharacterType.instance;
    }
}
