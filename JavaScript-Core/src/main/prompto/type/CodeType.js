var NativeType = require("./NativeType").NativeType;
var Identifier = require("../grammar/Identifier").Identifier;

class CodeType extends NativeType {
    constructor() {
        super(new Identifier("Code"));
        return this;
    }
}

CodeType.instance = new CodeType();

/*
@Override
public Class<?> toJavaClass() {
	return null;
}
*/

exports.CodeType = CodeType;
