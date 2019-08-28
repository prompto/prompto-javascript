function Variable (id, type) {
    this.id = id;
	this.type = type;
	return this;
}

Object.defineProperty(Variable.prototype, "name", {
    get : function() {
        return this.id.name;
    }
});

Variable.prototype.toString = function() {
	return this.name;
}

Variable.prototype.transpile = function(transpiler) {
    transpiler.append(this.name);
}

Variable.prototype.getType = function(context) {
    return this.type;
};

exports.Variable = Variable;
