var NativeType = require("./NativeType").NativeType;
var AnyType = require("./AnyType").AnyType;
var Identifier = require("../grammar/Identifier").Identifier;

function DocumentType() {
	NativeType.call(this, new Identifier("Document"));
	return this;
}

DocumentType.prototype = Object.create(NativeType.prototype);
DocumentType.prototype.constructor = DocumentType;

DocumentType.instance = new DocumentType();


/*
@Override
public Class<?> toJavaClass() {
	return Document.class;
}

@Override
public boolean isAssignableTo(Context context, IType other) {
	return (other instanceof DocumentType) || (other instanceof AnyType);
}
*/

DocumentType.prototype.checkMember = function(context, name) {
	return AnyType.instance;
};

exports.DocumentType = DocumentType;
