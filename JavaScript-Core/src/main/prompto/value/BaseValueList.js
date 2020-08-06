var Value = require("./Value").Value;
var Container = require("./Value").Container;
var IntegerValue = require("./IntegerValue").IntegerValue;
var PromptoError = require("../error/PromptoError").PromptoError;
var InternalError = require("../error/InternalError").InternalError;
var IndexOutOfRangeError = require("../error/IndexOutOfRangeError").IndexOutOfRangeError;

/* an abstract list of values, common to ListValue and TupleValue */
class BaseValueList extends Container {
  
    constructor(type, items, item, mutable) {
        super(type);
        this.items = items || [];
        item = item || null;
        if(item!==null) {
            this.add(item);
        }
        this.mutable = mutable || false;
    }

    toString() {
        return "[" + this.items.join(", ") + "]";
    }

    add(o) {
        this.items.push(o);
    }

    setItem(index, value) {
        this.items[index] = value;
    }

    setItemInContext(context, index, value) {
        if (index instanceof IntegerValue) {
            var idx = index.IntegerValue() - 1;
            if (idx > this.items.length) {
                throw new IndexOutOfRangeError();
            }
            this.items[idx] = value;
        } else
            throw new SyntaxError("No such item:" + index.toString())
    }

    get(index) {
        return this.items[index];
    }

    size() {
        return this.items.length;
    }

    isEmpty() {
        return this.items.length===0;
    }

    slice(fi, li) {
        var first = this.checkFirst(fi);
        var last = this.checkLast(li);
        var items = this.items.slice(first-1,last);
        return this.newInstance(items);
    }

    checkFirst(fi) {
        var value = (fi == null) ? 1 : fi.IntegerValue();
        if (value < 1 || value > this.items.length) {
            throw new IndexOutOfRangeError();
        }
        return value;
    }

    checkLast(li) {
        var value = (li == null) ? this.items.length : li.IntegerValue();
        if (value < 0) {
            value = this.items.length + 1 + li.IntegerValue();
        }
        if (value < 1 || value > this.items.length) {
            throw new IndexOutOfRangeError();
        }
        return value;
    }

    hasItem(context, lval) {
        for (var i=0;i<this.items.length;i++) {
            if (this.items[i].equals(lval))
                return true;
        }
        return false;
    }

    getItemInContext(context, index) {
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
    }

    equals(obj) {
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
    }

    getMemberValue(context, name) {
        if ("count"==name) {
            return new IntegerValue(this.items.length);
        } else {
            return Container.prototype.getMemberValue.call(this, context, name);
        }
    }

    getIterator(context) {
        return new ListIterator(this.items, context);
    }

    toDialect(writer) {
        if(this.items.length>0) {
            this.items.forEach(o => {
                if(o.toDialect)
                    o.toDialect(writer);
                else
                    writer.append(o.toString());
                writer.append(", ");
            });
            writer.trimLast(2);
        }
    }

    toJson(context, json, instanceId, fieldName, withType, binaries) {
        var values = [];
        this.items.map(item => {
            item.toJson(context, values, instanceId, fieldName, withType, binaries);
        });
        if(Array.isArray(json))
            json.push(values);
        else
            json[fieldName] = values;

    }
}

class ListIterator {
    constructor(items, context) {
        this.items = items;
        this.context = context;
        this.index = -1;
        return this;
    }

    hasNext() {
        return this.index < this.items.length - 1;
    }

    next() {
        return this.items[++this.index];
    }
}

exports.BaseValueList = BaseValueList;