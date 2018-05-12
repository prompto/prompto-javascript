var locateMethod = require('./Interpreter').locateMethod;

function Transpiler(context) {
    this.context = context;
    this.declared = new Set();
    this.required = new Set();
    this.lines = [];
    this.line = "";
    this.indents = "";
    return this;
}

Transpiler.prototype.declare = function(decl) {
    this.declared.add(decl);
};


Transpiler.prototype.appendAllDeclared = function() {
    this.declared.forEach(function(decl) {
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

Transpiler.prototype.indent = function() {
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
    return '{' +  Object.keys(this).map(function(key) { return '"' + key + '":' + this[key]; }, this). join(", ") + '}';
};

ObjectUtils.arrayToString = function() {
    return '[' + this.join(', ') + ']';
};

ObjectUtils.formatInteger = function(format) {
    var value = "000000000000" + this;
    return value.substr(value.length - format.length);
};

Transpiler.transpile = function(context, methodName, cmdLineArgs) {
    try {
        var method = locateMethod(context, methodName, cmdLineArgs);
        var transpiler = new Transpiler(context);
        transpiler.lines.push("if(!Object.values) { Object.values = " + ObjectUtils.values.toString() + " };");
        transpiler.lines.push("Object.prototype.toString = " + ObjectUtils.objectToString.toString() + ";");
        transpiler.lines.push("Array.prototype.toString = " + ObjectUtils.arrayToString.toString() + ";");
        transpiler.lines.push("Number.prototype.formatInteger = " + ObjectUtils.formatInteger.toString() + ";");
        method.transpile(transpiler);
        if(transpiler.line!==transpiler.indents) {
            transpiler.lines.push(transpiler.line);
            transpiler.line = transpiler.indents;
        }
        transpiler.lines.push("");
        transpiler.appendAllRequired();
        transpiler.appendAllDeclared();
        return transpiler.lines.join("\n");
    } finally {
        context.terminated();
    }
};

exports.Transpiler = Transpiler;
