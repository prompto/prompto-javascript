import Value from './Value.ts'
import { TextValue, IntegerValue, SetValue, NullValue, ListValue } from './index.ts'
import { DictionaryType, TextType } from '../type'
import { StrictSet, Dictionary } from '../intrinsic'
import { SyntaxError, InternalError } from '../error'

export default class DictionaryValue extends Value {
 
    constructor(itemType, dict, mutable) {
        super(new DictionaryType(itemType));
        this.mutable = mutable || false;
        this.dict = dict || new Dictionary(this.mutable);
    }

    toString() {
        return this.dict.toString();
    }

    isEmpty() {
        return this.dict.isEmpty();
    }

    Add(context, value) {
        if (value instanceof DictionaryValue) {
            return new DictionaryValue(this.type.itemType, this.dict.add(value.dict));
        } else {
            throw new SyntaxError("Illegal: Dict + " + typeof(value));
        }
    }

    hasItem(context, value) {
        if (value instanceof TextValue) {
            return value.value in this.dict;
        } else {
            throw new SyntaxError("Only TextValue key type supported by DictionaryValue");
        }
    }

    getMemberValue(context, id) {
        switch(id.name) {
            case "count":
            return new IntegerValue(this.dict.length);
            case "json":
            return super.getMemberValue(context, id);
            case "keys": {
                const keys = new StrictSet();
                const iter = this.dict.keys.iterator();
                while (iter.hasNext()) {
                    keys.add(new TextValue(iter.next()));
                }
                return new SetValue(TextType.instance, keys);
            }
            case "values":
            {
                const list = this.dict.$keys.map(name => {
                    return this.dict[name];
                }, this);
                return new ListValue(this.type.itemType, list);
            }
            default:
                return super.getMemberValue(context, id);
        }
    }

    setItemInContext(context, index, value) {
        if (index instanceof TextValue) {
            this.dict[index] = value;
        } else
            throw new SyntaxError("No such item:" + index.toString())
    }

    getItemInContext(context, index) {
        if (index instanceof TextValue)
        {
            const value = this.dict[index] || NullValue.instance;
            if (value instanceof Value) {
                return value;
            } else {
                throw new InternalError("Item not a value!");
            }
        } else {
            throw new SyntaxError("No such item:" + index.toString());
        }
    }

    convertToJavaScript() {
        const dict = {};
        this.dict.$keys.forEach(function(key) {
            dict[key] = this.dict[key].convertToJavaScript();
        }, this);
        return dict;
    }

    equals(obj) {
        if(obj instanceof DictionaryValue) {
            return this.dict.equals(obj.dict);
        } else {
            return false;
        }
    }

    getIterator(context) {
        return new KVPIterator(context, this.dict);
    }

    swap(context) {
        const swapped = new Dictionary(true);
        const iter = this.dict.iterator();
        while(iter.hasNext()) {
            const entry = iter.next();
            let key = entry.value;
            if(key instanceof TextValue)
                key = new TextValue(key.toString());
            swapped.setItem(key, entry.key);
        }
        swapped.mutable = false;
        return new DictionaryValue(TextType.instance, swapped, false);
    }

    removeKey(key) {
        this.dict.removeKey(key.value);
    }


    removeValue(value) {
        this.dict.removeValue(value);
    }

    toJsonNode() {
        const dict = {};
        this.dict.$keys.forEach(function(key) {
            dict[key] = this.dict[key].toJsonNode();
        }, this);
        return dict;

    }

}

class KVPIterator {

    constructor(context, dict) {
        this.context = context;
        this.dict = dict;
        this.keys = this.dict.$keys;
        this.index = 0;
    }

    hasNext() {
        return this.index < this.keys.length;
    }

    next() {
        const key = this.keys[this.index++];
        return new KVPValue(key, this.dict[key]);
    }
}

class KVPValue extends Value {

    constructor(key, value) {
        super(null); // TODO check that this is safe
        this.key = key;
        this.value = value;
    }

    getMemberValue(context, id) {
        switch(id.name) {
            case "key":
            return new TextValue(this.key);
            case "value":
            if (this.value.interpret) {
                this.value = this.value.interpret(context);
            }
            return this.value;
            default:
                return super.getMemberValue(context, id);
        }
    }
}

