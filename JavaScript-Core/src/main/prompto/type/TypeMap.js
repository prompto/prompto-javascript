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
		var t = this[keys[i]];
		if(type==null) {
			type = t;
		} else if(type.isAssignableFrom(context, t)) {
			continue;
		} else if(t.isAssignableFrom(context, type)) {
			type = t;
		} else {
			throw new SyntaxError("Incompatible types: " + type.name + " and " + t.name);
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
