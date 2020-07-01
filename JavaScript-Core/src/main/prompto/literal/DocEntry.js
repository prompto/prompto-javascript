function DocEntry(key, value) {
	this.key = key;
	this.value = value;
	return this;
}

DocEntry.prototype.toString = function() {
	return this.key.toString() + ':' + this.value.toString();
};

DocEntry.prototype.toDialect = function(writer) {
    writer.append(this.key.toString()).append(':');
    this.value.toDialect(writer);
};


DocEntry.prototype.declare = function(transpiler) {
    this.value.declare(transpiler);
};


DocEntry.prototype.transpile = function(transpiler) {
    transpiler.append(this.key.toString()).append(':');
    this.value.transpile(transpiler);
};


exports.DocEntry = DocEntry;
