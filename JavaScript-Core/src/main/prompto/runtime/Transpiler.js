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

Transpiler.prototype.newMemberTranspiler = function(context) {
    var context = this.context.newLocalContext();
    context.parent = this.context;
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
    decl.transpile(this);
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

Transpiler.prototype.appendOneRequired = function(fn) {
    this.lines.push(fn.toString());
    Object.keys(fn).forEach(function (key) {
        this.lines.push(fn.name + "." + key + " = " + fn[key].toString() + ";");
    }, this);
    if(fn.prototype.__proto__) {
        var proto = fn.prototype.__proto__;
        if(proto.constructor.name!=="Object")
            this.lines.push(fn.name + ".prototype.__proto__ = " + proto.constructor.name + ".prototype;");
    }
    Object.keys(fn.prototype).forEach(function (key) {
        this.lines.push(fn.name + ".prototype." + key + " = " + fn.prototype[key].toString() + ";");
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
        throw new Exception("Illegal dedent!");
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
    var names = Object.getOwnPropertyNames(this);
    var vals = names.map(function (name) {
        return name + ':' + this[name];
    }, this);
    return "{" + vals.join(", ") + "}";
};


ObjectUtils.arrayToString = function() {
    return '[' + this.join(', ') + ']';
};

ObjectUtils.arrayHasAll = function(items, noCheckEquals) {
    var set = new StrictSet(this);
    return set.hasAll(items, noCheckEquals);
};


ObjectUtils.arrayHasAny = function(items, noCheckEquals) {
    var set = new StrictSet(this);
    return set.hasAny(items, noCheckEquals);
};

ObjectUtils.stringHasAll = function(items) {
    if(StrictSet && items instanceof StrictSet)
        items = Array.from(items.values());
    for(var i=0;i<items.length;i++) {
        if(!this.includes(items[i]))
            return false;
    }
    return true;
};


ObjectUtils.stringHasAny = function(items) {
    if(StrictSet && items instanceof StrictSet)
        items = Array.from(items.values());
    for(var i=0;i<items.length;i++) {
        if(this.includes(items[i]))
            return true;
    }
    return false;
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


Transpiler.transpile = function(context, methodName, cmdLineArgs) {
    try {
        patchObject();
        var transpiler = new Transpiler(context);
        transpiler.lines.push("if(!Object.values) { Object.values = " + ObjectUtils.values.toString() + " };");
        transpiler.lines.push("Object.prototype.toString = " + ObjectUtils.objectToString.toString() + ";");
        transpiler.lines.push("Array.prototype.toString = " + ObjectUtils.arrayToString.toString() + ";");
        transpiler.lines.push("Array.prototype.hasAll = " + ObjectUtils.arrayHasAll.toString() + ";");
        transpiler.lines.push("Array.prototype.hasAny = " + ObjectUtils.arrayHasAny.toString() + ";");
        transpiler.lines.push("Number.prototype.formatInteger = " + ObjectUtils.formatInteger.toString() + ";");
        transpiler.lines.push("Number.prototype.toDecimalString = " + ObjectUtils.decimalToString.toString() + ";");
        transpiler.lines.push("String.prototype.hasAll = " + ObjectUtils.stringHasAll.toString() + ";");
        transpiler.lines.push("String.prototype.hasAny = " + ObjectUtils.stringHasAny.toString() + ";");
        var method = locateMethod(context, methodName, cmdLineArgs);
        method.declare(transpiler);
        transpiler.appendAllRequired();
        transpiler.appendAllDeclared();
        return transpiler.lines.join("\n");
    } finally {
        context.terminated();
        unpatchObject();
    }
};

exports.Transpiler = Transpiler;
