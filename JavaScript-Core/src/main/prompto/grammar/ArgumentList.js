var ObjectList = require("../utils/ObjectList").ObjectList;

function ArgumentList(item) {
	ObjectList.call(this);
	item = item || null;
	if(item!==null) {
		this.add(item);
	}
	return this;
}

ArgumentList.prototype = Object.create(ObjectList.prototype);
ArgumentList.prototype.constructor = ArgumentList;

ArgumentList.prototype.register = function(context) {
    this.forEach(function(arg) {
        arg.register(context);
    });
};

ArgumentList.prototype.check = function(context) {
    this.forEach(function(arg) {
        arg.check(context);
    });
};

ArgumentList.prototype.find = function(name) {
	for(var i=0;i<this.length;i++) {
		if(name===this[i].name) {
			return this[i];
		}
	}
	return null;
};

ArgumentList.prototype.toDialect = function(writer) {
    if(this.length==0)
        return;
    writer.toDialect(this);
};

ArgumentList.prototype.toEDialect = function(writer) {
    writer.append("receiving ");
    this.forEach(function(arg) {
        arg.toDialect(writer);
        writer.append(", ");
    });
    if(this.length>1) {
        writer.trimLast(2);
        writer.append(" and ");
    }
    this[this.length-1].toDialect(writer);
    writer.append(" ");
};

ArgumentList.prototype.toODialect = function(writer) {
    if(this.length>0) {
        this.forEach(function(arg) {
            arg.toDialect(writer);
            writer.append(", ");
        });
        writer.trimLast(2);
    }
};

ArgumentList.prototype.toSDialect = function(writer) {
    this.toODialect(writer);
};

exports.ArgumentList = ArgumentList;