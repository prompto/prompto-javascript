import Literal from '../../../main/prompto/literal/Literal.ts'
import { VersionType } from '../type'
import { VersionValue } from '../value'
import { Version } from '../intrinsic'

export default class VersionLiteral extends Literal {

    constructor(text) {
        const version = Version.parse(text.substring(1,text.length-1));
        super(text, new VersionValue(version));
    }

    check(context: Context): IType {
        return VersionType.instance;
    }

    declare(transpiler: Transpiler): void {
        transpiler.require(Version);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append("Version.parse(").append(this.text).append(")");
    }
}


