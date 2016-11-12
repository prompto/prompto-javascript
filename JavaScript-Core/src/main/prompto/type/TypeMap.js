var VoidType = require("./VoidType").VoidType;

function TypeMap() {
	return this;
}

TypeMap.prototype.inferType = function(context) {
	var keys = Object.keys(this);
	if(keys.length===0) {
		return VoidType.instance;
	}
	var type = null;
	// first pass: get less specific type
	for(var i=0;i<keys.length;i++) {
		var common = this[keys[i]];
		if(type==null) {
			type = common;
		} else if(type.isAssignableFrom(context, common)) {
			continue;
		} else if(common.isAssignableFrom(context, type)) {
			type = common;
		} else {
			throw new SyntaxError("Incompatible types: " + type.name + " and " + common.name);
		}
	}
	// second pass: check compatible
	keys.forEach(function(k) {
        var t = this[k];
		if(t!=type && !type.isAssignableFrom(context, t)) {
			throw new SyntaxError("Incompatible types: " + type.name + " and " + t.name);
		}
	}, this);
	return type;
};

exports.TypeMap = TypeMap;
