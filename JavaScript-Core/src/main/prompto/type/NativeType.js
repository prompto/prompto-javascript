var BaseType = require("./BaseType").BaseType;

function NativeType(id) {
	BaseType.call(this, id);
	return this;
}

NativeType.prototype = Object.create(BaseType.prototype);
NativeType.prototype.constructor = NativeType;

NativeType.prototype.checkUnique = function(context) {
	// nothing to do
};

NativeType.prototype.checkExists = function(context) {
	// nothing to do
};

NativeType.prototype.isMoreSpecificThan = function(context, other) {
	return false;
};

NativeType.prototype.equals = function(obj) {
	return obj===this;
};

/*
private static NativeType[] all = null;

public static NativeType[] getAll() {
	if(all==null) {
		all = new NativeType[] {
				AnyType.instance(),
				BooleanType.instance(),
				IntegerType.instance(),
				DecimalType.instance(),
				CharacterType.instance(),
				TextType.instance(),
				CodeType.instance(),
				DateType.instance(),
				TimeType.instance(),
				DateTimeType.instance(),
				PeriodType.instance(),
				DocumentType.instance(),
				TupleType.instance()
			};
	}
	return all;
}
*/

exports.NativeType = NativeType;


