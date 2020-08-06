var TextValue = null;
var ListValue = null;
var AnyType = require("../type/AnyType").AnyType;

exports.resolve = () => {
    TextValue = require("./TextValue").TextValue;
    ListValue = require("./ListValue").ListValue;
};

var id = 0;

class Value {
   
    constructor(type) {
        this.id = ++id;
        this.type = type;
        this.mutable = false;
    }

    collectStorables(list) {
        // do nothing
    }

    convertToJavaScript() {
        throw new SyntaxError("convertToJavaScript not implemented by " + this.constructor.name);
    }

    And(context, value) {
        throw new SyntaxError("Logical and not supported by " + this.constructor.name);
    }

    Or(context, value) {
        throw new SyntaxError("Logical or not supported by " + this.constructor.name);
    }

    Not(context) {
        throw new SyntaxError("Logical negation not supported by " + this.constructor.name);
    }

    Add(context, value) {
        throw new SyntaxError("Add not supported by " + this.constructor.name);
    }

    transpile(transpiler) {
        throw new Error("Transpile not implemented by " + this.constructor.name);
    }

    Subtract(context, value) {
        throw new SyntaxError("Subtract not supported by " + this.constructor.name);
    }

    Multiply(context, value) {
        throw new SyntaxError("Multiply not supported by " + this.constructor.name);
    }

    Divide(context, value) {
        throw new SyntaxError("Divide not supported by " + this.constructor.name);
    }

    IntDivide(context, value) {
        throw new SyntaxError("Integer divide not supported by " + this.constructor.name);
    }

    Modulo(context, value) {
        throw new SyntaxError("Modulo not supported by " + this.constructor.name);
    }

    Minus(context) {
        throw new SyntaxError("Minus not supported by " + this.constructor.name);
    }

    compareToValue(context, value) {
        throw new SyntaxError("Compare not supported by " + this.constructor.name);
    }

    getMemberValue(context, name) {
        if("text" == name)
            return new TextValue(this.toString());
        else
            throw new SyntaxError("No member support for " + name + " in " + this.constructor.name);
    }

    ConvertTo(type) {
        return this;
    }

    Roughly(context, value) {
        return this.equals(value);
    }

    Contains(context, value) {
        throw new SyntaxError("Contains not supported by " + this.constructor.name);
    }

    toDocumentValue(context) {
        return this;
    }
}

class Instance extends Value {
    constructor(type) {
        super(type);
        return this;
    }
}

class Container extends Value {
    constructor(type) {
        super(type);
        return this;
    }

    toDocumentValue(context) {
        var items = this.items.map(item => {
            item.toDocumentValue(context);
        });
        return new ListValue(AnyType.instance, items);
    }
}


exports.Value = Value;
exports.Instance = Instance;
exports.Container = Container;
