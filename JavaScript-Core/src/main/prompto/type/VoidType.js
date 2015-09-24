var NativeType = require("./NativeType").NativeType;
var Identifier = require("../grammar/Identifier").Identifier;

function VoidType() {
	NativeType.call(this, new Identifier("Void"));
	return this;
}

VoidType.prototype = Object.create(NativeType.prototype);
VoidType.prototype.constructor = VoidType;

VoidType.instance = new VoidType();
	
/*	
	@Override
	public Class<?> toJavaClass() {
		return void.class;
	}

	@Override
	public boolean isAssignableTo(Context context, IType other) {
		throw new RuntimeException("Should never get there !");
	}
	
*/

exports.VoidType = VoidType;
