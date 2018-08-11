function DictEntry(key, value) {
	this.key = key;
	this.value = value;
	return this;
}

DictEntry.prototype.toString = function() {
	return this.key.toString() + ':' + this.value.toString();
};

DictEntry.prototype.toDialect = function(writer) {
    writer.append(this.key.toString()).append(':');
    this.value.toDialect(writer);
};


DictEntry.prototype.declare = function(transpiler) {
    this.value.declare(transpiler);
};


DictEntry.prototype.transpile = function(transpiler) {
    transpiler.append(this.key.toString()).append(':');
    this.value.transpile(transpiler);
};


exports.DictEntry = DictEntry;
