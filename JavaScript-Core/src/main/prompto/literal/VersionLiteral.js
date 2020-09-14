import Literal from "./Literal"
import { VersionType } from "../type/index"
import { VersionValue } from "../value/index"
import { Version } from "../intrinsic/index"

export default class VersionLiteral extends Literal {

    constructor(text) {
        const version = Version.parse(text.substring(2,text.length-1));
        super(text, new VersionValue(version));
    }

    check(context) {
        return VersionType.instance;
    }

    declare(transpiler) {
        transpiler.require(Version);
    }

    transpile(transpiler) {
        transpiler.append("Version.parse(").append(this.text).append(")");
    }
}


