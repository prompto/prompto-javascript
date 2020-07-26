var VoidType = require("./VoidType").VoidType;
var NullType = require("./NullType").NullType;

function TypeMap() {
	return this;
}

TypeMap.prototype.inferType = function(context, section) {
	var keys = Object.keys(this);
	switch (keys.length) {
		case 0:
			return VoidType.instance;
		case 1:
			return this[keys[0]];
		default:
			return this.doInferType(context, keys, section);
	}
};

TypeMap.prototype.doInferType = function(context, keys, section) {
	var inferred = null;
	// first pass: get less specific type
	for(var i=0;i<keys.length;i++) {
		var current = this[keys[i]];
		if(current == NullType.instance) {
			continue;
		} else if(inferred==null) {
			inferred = current;
		} else if(inferred.isAssignableFrom(context, current)) {
			continue;
		} else if(current.isAssignableFrom(context, inferred)) {
			inferred = current;
		} else {
			context.problemListener.reportIncompatibleTypes(section, current, inferred);
		}
	}
	// second pass: check compatibility
	keys.forEach(function(k) {
        var type = this[k];
		if(type!=inferred && !inferred.isAssignableFrom(context, type)) {
            context.problemListener.reportIncompatibleTypes(section, inferred, type);
		}
	}, this);
	return inferred;
};

exports.TypeMap = TypeMap;
