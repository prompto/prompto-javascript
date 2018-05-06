function DictEntry(key, value) {
	this.key = key;
	this.value = value;
	return this;
}

DictEntry.prototype.toString = function() {
	return this.key.toString() + ':' + this.value.toString();
};

DictEntry.prototype.toDialect = function(writer) {
    this.key.toDialect(writer);
    writer.append(':');
    this.value.toDialect(writer);
};

DictEntry.prototype.transpile = function(transpiler) {
    transpiler.append(this.key.value).append(':');
    this.value.transpile(transpiler);
};


exports.DictEntry = DictEntry;
