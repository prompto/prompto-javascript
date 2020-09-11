import NativeType from "./NativeType"
import { Identifier } from "../grammar/index"

export default class CodeType extends NativeType {

    constructor() {
        super(new Identifier("Code"));
    }
}

CodeType.instance = new CodeType();


