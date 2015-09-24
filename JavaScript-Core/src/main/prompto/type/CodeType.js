var NativeType = require("./NativeType").NativeType;
var Identifier = require("../grammar/Identifier").Identifier;

function CodeType()  {
	NativeType.call(this, new Identifier("Code"));
	return this;
}

CodeType.prototype = Object.create(NativeType.prototype);
CodeType.prototype.constructor = CodeType;

CodeType.instance = new CodeType();

/*
@Override
public Class<?> toJavaClass() {
	return null;
}
*/

exports.CodeType = CodeType;
