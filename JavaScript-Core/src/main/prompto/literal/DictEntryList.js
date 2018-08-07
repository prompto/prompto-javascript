function DictEntryList(entries, entry) {
	this.items = entries || [];
	entry = entry || null;
	if(entry!==null) {
		this.items.push(entry);
	}
	return this;
}

DictEntryList.prototype.toDialect = function(writer) {
    writer.append('<');
    if(this.items.length>0) {
        this.items.forEach(function(item) {
            item.toDialect(writer);
            writer.append(", ");
        });
        writer.trimLast(2);
    } else
        writer.append(':');
    writer.append('>');
};

DictEntryList.prototype.declare = function(transpiler) {
    this.items.forEach(function(item) {
        item.declare(transpiler);
    });
 };


DictEntryList.prototype.transpile = function(transpiler) {
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

DictEntryList.prototype.toString = function() {
	return "<" + (this.items.length ? this.items.join(", ") : ':') + ">";
};

DictEntryList.prototype.add = function(entry) {
	this.items.push(entry);
};

exports.DictEntryList = DictEntryList;