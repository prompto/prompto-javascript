var ObjectList = require("../utils/ObjectList").ObjectList;
var Dialect = require("../parser/Dialect").Dialect;

function IdentifierList(item) {
    ObjectList.call(this);
	item = item || null;
	if(item!==null) {
		this.add(item);
	}
	return this;
}

IdentifierList.prototype = Object.create(ObjectList.prototype);
IdentifierList.prototype.constructor = IdentifierList;


IdentifierList.prototype.names = function() {
    return this.map(function(id) { return id.name; } );
};


IdentifierList.prototype.hasAttribute = function(name) {
    for(var i = 0; i < this.length; i++) {
        if(this[i].name===name)
            return true;
    }
    return false;
};

IdentifierList.prototype.toDialect = function(writer, finalAnd) {
    finalAnd = finalAnd || false;
    switch(writer.dialect) {
        case Dialect.E:
            this.toEDialect(writer, finalAnd);
            break;
        case Dialect.O:
            this.toODialect(writer);
            break;
        case Dialect.M:
            this.toMDialect(writer);
            break;
    }
};

IdentifierList.prototype.toEDialect = function(writer, finalAnd) {
    switch(this.length) {
        case 0:
            return;
        case 1:
            writer.append(this[0].name);
            break;
        default:
            for(var i=0;i<this.length;i++) {
                if(finalAnd && i==this.length-1)
                    break;
                writer.append(this[i].name);
                writer.append(", ");
            }
            writer.trimLast(2);
            if(finalAnd) {
                writer.append(" and ");
                writer.append(this[this.length-1].name);
            }
    }
};

IdentifierList.prototype.toODialect = function(writer) {
    if(this.length>0) {
        this.forEach(function(id) {
            writer.append(id.name);
            writer.append(", ");
        });
        writer.trimLast(2);
    }
};

IdentifierList.prototype.toMDialect = function(writer) {
    this.toODialect(writer);
};

exports.IdentifierList = IdentifierList;