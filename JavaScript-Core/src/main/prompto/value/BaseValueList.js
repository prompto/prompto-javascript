var Value = require("./Value").Value;
var Container = require("./Value").Container;
var IntegerValue = require("./IntegerValue").IntegerValue;
var PromptoError = require("../error/PromptoError").PromptoError;
var InternalError = require("../error/InternalError").InternalError;
var IndexOutOfRangeError = require("../error/IndexOutOfRangeError").IndexOutOfRangeError;

/* an abstract list of values, common to ListValue and TupleValue */
function BaseValueList(type, items, item, mutable) {
    Container.call(this, type);
	this.items = items || [];
    item = item || null;
    if(item!==null) {
        this.add(item);
    }
    this.mutable = mutable || false;
    return this;
}

BaseValueList.prototype = Object.create(Container.prototype);
BaseValueList.prototype.constructor = BaseValueList;

BaseValueList.prototype.toString = function() {
	return "[" + this.items.join(", ") + "]";
};

BaseValueList.prototype.add = function(o) {
	this.items.push(o);
};


BaseValueList.prototype.setItem = function(index, value) {
    this.items[index] = value;
};


BaseValueList.prototype.setItemInContext = function(context, index, value) {
    if (index instanceof IntegerValue) {
        var idx = index.IntegerValue() - 1;
        if (idx > this.items.length) {
            throw new IndexOutOfRangeError();
        }
        this.items[idx] = value;
    } else
        throw new SyntaxError("No such item:" + index.toString())
};


BaseValueList.prototype.get = function(index) {
	return this.items[index];
};

BaseValueList.prototype.size = function() {
	return this.items.length;
};


BaseValueList.prototype.isEmpty = function() {
	return this.items.length===0;
};

BaseValueList.prototype.slice = function(fi, li) {
	var first = this.checkFirst(fi);
	var last = this.checkLast(li);
	var items = this.items.slice(first-1,last);
	return this.newInstance(items);
};

BaseValueList.prototype.checkFirst = function(fi) {
	var value = (fi == null) ? 1 : fi.IntegerValue();
	if (value < 1 || value > this.items.length) {
		throw new IndexOutOfRangeError();
	}
	return value;
};

BaseValueList.prototype.checkLast = function(li) {
	var value = (li == null) ? this.items.length : li.IntegerValue();
	if (value < 0) {
		value = this.items.length + 1 + li.IntegerValue();
	}
	if (value < 1 || value > this.items.length) {
		throw new IndexOutOfRangeError();
	}
	return value;
};

BaseValueList.prototype.hasItem = function(context, lval) {
	for (var i=0;i<this.items.length;i++) {
		if (this.items[i].equals(lval))
			return true;
	}
	return false;
};

BaseValueList.prototype.getItemInContext = function(context, index) {
	if (index instanceof IntegerValue) {
		try {
			var idx = index.IntegerValue() - 1;
			if(idx>this.items.length) {
				throw new IndexOutOfRangeError();
			}
			var value = this.items[idx] || null;
			if(value==null) {
				return null;
			}
			if (value instanceof Value) {
				return value;
			} else {
				throw new InternalError("Item not a value!");
			}
		} catch (e) {
			if(e instanceof PromptoError) {
				throw e;
			} else {
				throw new InternalError(e.toString());
			}
		}
	} else
		throw new SyntaxError("No such item:" + index.toString());
};

BaseValueList.prototype.equals = function(obj) {
	if(obj instanceof BaseValueList) {
		if(this.items.length!=obj.items.length) {
			return false;
		} else {
			for(var i=0;i<this.items.length;i++) {
				var v1 = this.items[i] || null;
				var v2 = obj.items[i] || null;
				if(v1==v2) {
					continue;
				} else if(v1==null || v2==null) {
					return false;
				} else {
					if(v1.equals) {
						if(!v1.equals(v2)) {
							return false;
						}
					} else if(v2.equals) {
						if(!v2.equals(v1)) {
							return false;
						}
					} else {
						return false;
					}
				}
			}
			return true;
		}
	} else {
		return false;
	}
};


BaseValueList.prototype.getMemberValue = function(context, name) {
	if ("count"==name) {
		return new IntegerValue(this.items.length);
	} else {
		return Container.prototype.getMemberValue.call(this, context, name);
	}
};

BaseValueList.prototype.getIterator = function(context) {
	return new ListIterator(this.items, context);
};

function ListIterator(items, context) {
	this.items = items;
	this.context = context;
	this.index = -1;
	return this;
}

ListIterator.prototype.hasNext = function () {
	return this.index < this.items.length - 1;
}

ListIterator.prototype.next = function() {
	return this.items[++this.index];
};

BaseValueList.prototype.toDialect = function(writer) {
    if(this.items.length>0) {
        this.items.forEach(function(o) {
            if(o.toDialect)
                o.toDialect(writer);
            else
                writer.append(o.toString());
            writer.append(", ");
        });
        writer.trimLast(2);
    }
};

BaseValueList.prototype.toJson = function(context, json, instanceId, fieldName, withType, binaries) {
    var values = [];
    this.items.map(function(item) {
        item.toJson(context, values, instanceId, fieldName, withType, binaries);
    });
    if(Array.isArray(json))
        json.push(values);
    else
        json[fieldName] = values;

};



exports.BaseValueList = BaseValueList;