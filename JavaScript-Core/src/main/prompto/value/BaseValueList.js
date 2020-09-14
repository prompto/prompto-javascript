import Container from "./Container"
import { Value, IntegerValue } from "./index"
import { PromptoError, SyntaxError, IndexOutOfRangeError, InternalError } from "../error/index"

/* an abstract list of values, common to ListValue and TupleValue */
export default class BaseValueList extends Container {
  
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
            const idx = index.IntegerValue() - 1;
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
        const first = this.checkFirst(fi);
        const last = this.checkLast(li);
        const items = this.items.slice(first-1,last);
        return this.newInstance(items);
    }

    checkFirst(fi) {
        const value = (fi == null) ? 1 : fi.IntegerValue();
        if (value < 1 || value > this.items.length) {
            throw new IndexOutOfRangeError();
        }
        return value;
    }

    checkLast(li) {
        let value = (li == null) ? this.items.length : li.IntegerValue();
        if (value < 0) {
            value = this.items.length + 1 + li.IntegerValue();
        }
        if (value < 1 || value > this.items.length) {
            throw new IndexOutOfRangeError();
        }
        return value;
    }

    hasItem(context, lval) {
        for (let i=0;i<this.items.length;i++) {
            if (this.items[i].equals(lval))
                return true;
        }
        return false;
    }

    getItemInContext(context, index) {
        if (index instanceof IntegerValue) {
            try {
                const idx = index.IntegerValue() - 1;
                if(idx>this.items.length) {
                    throw new IndexOutOfRangeError();
                }
                const value = this.items[idx] || null;
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
                for(let i=0;i<this.items.length;i++) {
                    const v1 = this.items[i] || null;
                    const v2 = obj.items[i] || null;
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
            return super.getMemberValue(context, name);
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
        const values = [];
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
    }

    hasNext() {
        return this.index < this.items.length - 1;
    }

    next() {
        return this.items[++this.index];
    }
}
