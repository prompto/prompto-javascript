import JavaScriptLiteral from "./JavaScriptLiteral"
import { CharacterType } from "../type/index"

export default class JavaScriptCharacterLiteral extends JavaScriptLiteral {

    constructor(text) {
        super(text);
    }

    check(context) {
        return CharacterType.instance;
    }
}
