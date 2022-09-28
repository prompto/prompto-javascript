import Literal from './Literal'
import {IType, VersionType} from '../type'
import { VersionValue } from '../value'
import { Version } from '../intrinsic'
import {Context, Transpiler} from "../runtime";

export default class VersionLiteral extends Literal<VersionValue> {

    constructor(text: string) {
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


