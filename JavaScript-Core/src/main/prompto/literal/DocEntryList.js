function DocEntryList(entries, entry) {
	this.items = entries || [];
	entry = entry || null;
	if(entry!==null) {
		this.items.push(entry);
	}
	return this;
}

DocEntryList.prototype.toDialect = function(writer) {
    writer.append('{');
    if(this.items.length>0) {
        this.items.forEach(function(item) {
            item.toDialect(writer);
            writer.append(", ");
        });
        writer.trimLast(2);
    }
    writer.append('}');
};

DocEntryList.prototype.declare = function(transpiler) {
    this.items.forEach(function(item) {
        item.declare(transpiler);
    });
 };


DocEntryList.prototype.transpile = function(transpiler) {
    transpiler.append('{');
    if(this.items.length>0) {
        this.items.forEach(function(item) {
            item.transpile(transpiler);
            transpiler.append(",");
        });
        transpiler.trimLast(1);
    }
    transpiler.append('}');
};

DocEntryList.prototype.toString = function() {
	return "{" + this.items.join(", ") + ">";
};

DocEntryList.prototype.add = function(entry) {
	this.items.push(entry);
};

exports.DocEntryList = DocEntryList;