var locateMethod = require('./Interpreter').locateMethod;
var CategoryDeclaration = require("../declaration/CategoryDeclaration").CategoryDeclaration;

function Transpiler(context) {
    this.context = context;
    this.declared = new Set();
    this.required = new Set();
    this.lines = [];
    this.line = "";
    this.indents = "";
    return this;
}

Transpiler.prototype.toString = function() {
    this.appendAllRequired();
    this.appendAllDeclared();
    return this.lines.join("\n");
};


Transpiler.prototype.copyTranspiler = function(context) {
    var transpiler = new Transpiler(context);
    transpiler.declared = this.declared;
    transpiler.required = this.required;
    transpiler.lines = this.lines;
    transpiler.line = this.line;
    transpiler.indents = this.indents;
    transpiler.parent = this;
    return transpiler;
};

Transpiler.prototype.newLocalTranspiler = function() {
    var context = this.context.newLocalContext();
    return this.copyTranspiler(context);
};

Transpiler.prototype.newChildTranspiler = function(context) {
    if(!context)
        context = this.context.newChildContext();
    return this.copyTranspiler(context);
};

Transpiler.prototype.newMemberTranspiler = function() {
    var context = this.context.newLocalContext();
    context.parent = this.context;
    return this.copyTranspiler(context);
};

Transpiler.prototype.newGetterTranspiler = function(name) {
    transpiler = this.newMemberTranspiler();
    transpiler.getterName = name;
    return transpiler;
};


Transpiler.prototype.newSetterTranspiler = function(name) {
    transpiler = this.newMemberTranspiler();
    transpiler.setterName = name;
    return transpiler;
};


Transpiler.prototype.newInstanceTranspiler = function(type) {
    var context = this.context.newInstanceContext(null, type, true);
    return this.copyTranspiler(context);
};

Transpiler.prototype.flush = function() {
    if(this.parent) {
        this.parent.line = this.line;
        this.parent.indents = this.indents;
    }
};

Transpiler.prototype.declare = function(decl) {
    this.declared.add(decl);
};


Transpiler.prototype.appendAllDeclared = function() {
    var list = [];
    var set = new Set();
    this.declared.forEach(function(decl) {
        if(decl instanceof CategoryDeclaration)
            decl.ensureDeclarationOrder(this.context, list, set);
        else
            list.push(decl);
    }, this);
    list.forEach(function(decl) {
        this.appendOneDeclared(decl);
    }, this);
};


Transpiler.prototype.appendOneDeclared = function(decl) {
    var transpiler = this.newLocalTranspiler();
    decl.transpile(transpiler);
    transpiler.flush();
    if(this.line!==this.indents) {
        this.lines.push(this.line);
        this.line = this.indents;
    }
    this.lines.push("");
};


Transpiler.prototype.require = function(fn) {
    this.required.add(fn);
};



Transpiler.prototype.appendAllRequired = function() {
    this.required.forEach(function(fn) {
        this.appendOneRequired(fn);
    }, this);
};

Transpiler.prototype.getTranspiled = function(object) {
    if(object===null)
        return "null";
    else if(object.toTranspiled)
        return object.toTranspiled();
    else
        return object.toString();
};

Transpiler.prototype.appendOneRequired = function(fn) {
    this.lines.push(fn.toString());
    Object.keys(fn).forEach(function (key) {
        this.lines.push(fn.name + "." + key + " = " + this.getTranspiled(fn[key]) + ";");
    }, this);
    if(fn.prototype.__proto__) {
        var proto = fn.prototype.__proto__;
        if(proto.constructor.name!=="Object")
            this.lines.push(fn.name + ".prototype.__proto__ = " + proto.constructor.name + ".prototype;");
    }
    Object.keys(fn.prototype).forEach(function (key) {
        var value = key==="constructor" ? fn.name : fn.prototype[key].toString();
        this.lines.push(fn.name + ".prototype." + key + " = " + value + ";");
    }, this);
    Object.getOwnPropertyNames(fn.prototype).forEach(function(name) {
        var desc = Object.getOwnPropertyDescriptor(fn.prototype, name);
        if(desc.get || desc.set) {
            this.lines.push("Object.defineProperty(" + fn.name + ".prototype, '" + name + "', {");
            if(desc.get) {
                this.lines.push("    get: " + desc.get.toString());
            }
            if(desc.set) {
                this.lines.push("    set: " + desc.set.toString());
            }
            this.lines.push("});")
        }
    }, this);
};

Transpiler.prototype.append = function(text) {
    this.line += text;
    return this;
};

Transpiler.prototype.trimLast = function(count) {
    this.line = this.line.substring(0, this.line.length - count);
    return this;
};

Transpiler.prototype.newLine = function() {
    this.lines.push(this.line);
    this.line = this.indents;
    return this;
};

Transpiler.prototype.indent = function(indentOnly) {
    if(!indentOnly)
        this.lines.push(this.line);
    this.indents += '\t';
    this.line = this.indents;
    return this;
};

Transpiler.prototype.dedent = function() {
    if(this.line!==this.indents)
        this.lines.push(this.line);
    if(this.indents.length==0) {
        throw new Error("Illegal dedent!");
    }
    this.indents = this.indents.slice(1);
    this.line = this.indents;
    return this;
};

function ObjectUtils() {

}

ObjectUtils.values = function(o) {
    var values = [];
    for(name in o) { values.push(o[name]); }
    return values;
};


ObjectUtils.objectToString = function() {
    var names = Object.getOwnPropertyNames(this).filter(function(name) { return typeof(this[name]) !== 'function'; }, this);
    var vals = names.map(function (name) {
        return name + ':' + this[name];
    }, this);
    return "{" + vals.join(", ") + "}";
};


ObjectUtils.arrayItem = function(idx) {
    if(idx==null)
        throw new ReferenceError();
    else if(idx<1 || idx>this.length)
        throw new RangeError();
    else
        return this[idx-1];
};


ObjectUtils.getArrayItem = function (idx, create) {
    if(idx==null)
        throw new ReferenceError();
    else if(idx<1 || idx>this.length)
        throw new RangeError();
    else {
        if(!this[idx - 1] && create)
            this[idx - 1] = new Document();
        return this[idx - 1] || null;
    }
};


ObjectUtils.setArrayItem = function (idx, value) {
    if(idx==null)
        throw new ReferenceError();
    else if(idx<1 || idx>this.length)
        throw new RangeError();
    else
        this[idx-1] = value;
};


ObjectUtils.arrayToString = function() {
    return '[' + this.join(', ') + ']';
};

ObjectUtils.arrayEquals = function(o) {
    o = o || null;
    if(this===o) {
        return true;
    }
    if(!Array.isArray(o) || this.length !== o.length) {
        return false;
    }
    for(var i=0;i<this.length;i++) {
        if(!equalObjects(this[i], o[i])) {
            return false;
        }
    }
    return true;
}

ObjectUtils.arrayHasAll = function(items, noCheckEquals) {
    var set = new StrictSet(this);
    return set.hasAll(items, noCheckEquals);
};


ObjectUtils.arrayHasAny = function(items, noCheckEquals) {
    var set = new StrictSet(this);
    return set.hasAny(items, noCheckEquals);
};

ObjectUtils.arraySlice1Based = function(start, last) {
    if(start) {
        if (start < 0 || start >= this.length)
            throw new RangeError();
        start = start - 1;
    } else
        start = 0;
    if(!last)
        return this.slice(start);
    if(last >= 0) {
        if(last<=start || last>= this.length - 1)
            throw new RangeError();
        return this.slice(start, last);
    } else {
        // TODO check Range
        return this.slice(start, 1 + last);
    }
};

ObjectUtils.iterateArray = function (fn) {
    var self = this;
    return {
        length: self.length,
        iterator: function() {
            var idx = 0;
            return {
                hasNext: function() { return idx < self.length; },
                next: function() { return fn(self[idx++]); }
            };
        }
    }
};


ObjectUtils.stringHasAll = function(items) {
    if(StrictSet && items instanceof StrictSet)
        items = Array.from(items.set.values());
    for(var i=0;i<items.length;i++) {
        if(!this.includes(items[i]))
            return false;
    }
    return true;
};


ObjectUtils.stringHasAny = function(items) {
    if(StrictSet && items instanceof StrictSet)
        items = Array.from(items.set.values());
    for(var i=0;i<items.length;i++) {
        if(this.includes(items[i]))
            return true;
    }
    return false;
};

ObjectUtils.stringSlice = function(start, last) {
    if(start) {
        if (start < 0 || start >= this.length)
            throw new RangeError();
        start = start - 1;
    } else
        start = 0;
    if(!last)
        return this.substring(start);
    if(last >= 0) {
        if(last<1 || last>this.length)
            throw new RangeError();
        return this.substring(start, last);
    } else {
        if(last<-this.length)
            throw new RangeError();
        return this.substring(start, this.length + 1 + last)
    }
};

ObjectUtils.formatInteger = function(format) {
    var value = "000000000000" + this;
    return value.substr(value.length - format.length);
};

ObjectUtils.decimalToString = function() {
    // mimic 0.0######
    var s = this.toString();
    var i = s.indexOf('.');
    if(i>=0) {
        // fix IEEE issue
        i = s.indexOf('000000', i);
        if( i < 0)
            return s;
        else
            return s.substr(0, i);
    } else
        return s + ".0";
};

function print(msg) {
    var isNodeJs = typeof window === 'undefined' && typeof importScripts === 'undefined';
    if(isNodeJs)
        process.stdout.write(msg);
    else
        console.log(msg);
}

function translateError(e) {
    if(e.promptoName)
        return e.promptoName;
    else if(e instanceof RangeError)
        return "INDEX_OUT_OF_RANGE";
    else if(e instanceof TypeError)
        return "NULL_REFERENCE";
    else if(e instanceof ReferenceError)
        return "NULL_REFERENCE";
    else
        return "<unknown: " + e.name + ">";
/*
        NOT_MUTABLE: "NotMutableError",
        NOT_STORABLE: "NotStorableError",
        READ_WRITE: "ReadWriteError"
*/
}

class DivideByZeroError extends Error {

    constructor(message) {
        super("Divide by zero!")
        this.name = "DivideByZeroError";
        this.promptoName = "DIVIDE_BY_ZERO";
    }

    toString() {
        return this.message;
    }

}

function divide( a, b ) {
    if(b===0)
        throw new DivideByZeroError();
    else
        return a / b;
}

// to ease implementation
function patchObject() {
    Object.prototype.declare = function (transpiler) {
        throw new Error("Declare missing for " + this.__proto__.constructor.name);
    };
    Object.prototype.transpile = function (transpiler) {
        throw new Error("Transpile missing for " + this.__proto__.constructor.name);
    };
}

function unpatchObject() {
    delete Object.prototype.declare;
    delete Object.prototype.transpile;
}

function newTranspiler(context) {
    var transpiler = new Transpiler(context);
    var equalObjects = require("../utils/Utils").equalObjects;
    transpiler.require(equalObjects);
    transpiler.require(print);
    transpiler.require(divide);
    transpiler.require(DivideByZeroError);
    transpiler.require(translateError);
    transpiler.lines.push("TypeError.prototype.toString = function() { return 'Null reference!'; };");
    transpiler.lines.push("ReferenceError.prototype.toString = function() { return 'Null reference!'; };");
    transpiler.lines.push("RangeError.prototype.toString = function() { return 'Index out of range!'; };");
    transpiler.lines.push("if(!Object.values) { Object.values = " + ObjectUtils.values.toString() + "; };");
    transpiler.lines.push("Object.prototype.toString = " + ObjectUtils.objectToString.toString() + ";");
    transpiler.lines.push("Boolean.prototype.getText = Boolean.prototype.toString;");
    transpiler.lines.push("Array.prototype.item = " + ObjectUtils.arrayItem.toString() + ";");
    transpiler.lines.push("Array.prototype.getItem = " + ObjectUtils.getArrayItem.toString() + ";");
    transpiler.lines.push("Array.prototype.setItem = " + ObjectUtils.setArrayItem.toString() + ";");
    transpiler.lines.push("Array.prototype.toString = " + ObjectUtils.arrayToString.toString() + ";");
    transpiler.lines.push("Array.prototype.getText = Array.prototype.toString;");
    transpiler.lines.push("Array.prototype.hasAll = " + ObjectUtils.arrayHasAll.toString() + ";");
    transpiler.lines.push("Array.prototype.hasAny = " + ObjectUtils.arrayHasAny.toString() + ";");
    transpiler.lines.push("Array.prototype.equals = " + ObjectUtils.arrayEquals.toString() + ";");
    transpiler.lines.push("Array.prototype.iterate = " + ObjectUtils.iterateArray.toString() + ";");
    transpiler.lines.push("Array.prototype.slice1Based = " + ObjectUtils.arraySlice1Based.toString() + ";");
    transpiler.lines.push("Number.prototype.formatInteger = " + ObjectUtils.formatInteger.toString() + ";");
    transpiler.lines.push("Number.prototype.toDecimalString = " + ObjectUtils.decimalToString.toString() + ";");
    transpiler.lines.push("Number.prototype.getText = Number.prototype.toString;");
    transpiler.lines.push("String.prototype.hasAll = " + ObjectUtils.stringHasAll.toString() + ";");
    transpiler.lines.push("String.prototype.hasAny = " + ObjectUtils.stringHasAny.toString() + ";");
    transpiler.lines.push("String.prototype.slice1Based = " + ObjectUtils.stringSlice.toString() + ";");
    transpiler.lines.push("String.prototype.getText = String.prototype.toString;");
    return transpiler;
}

Transpiler.transpileTest = function(context, testMethod) {
    try {
        patchObject();
        var transpiler = newTranspiler(context);
        testMethod.declare(transpiler);
        return transpiler.toString();
    } finally {
        context.terminated();
        unpatchObject();
    }
};

Transpiler.prototype.printTestName = function(testName) {
    this.append('print("\\"').append(testName.substring(1, testName.length - 1)).append('\\" test ');
    return this;
};


Transpiler.transpileMethod = function(context, methodName, cmdLineArgs) {
    try {
        patchObject();
        var transpiler = newTranspiler(context);
        var method = locateMethod(context, methodName, cmdLineArgs);
        method.declare(transpiler);
        return transpiler.toString();
    } finally {
        context.terminated();
        unpatchObject();
    }
};

exports.Transpiler = Transpiler;
