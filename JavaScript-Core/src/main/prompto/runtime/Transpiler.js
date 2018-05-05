var locateMethod = require('./Interpreter').locateMethod;

function Transpiler(context) {
    this.context = context;
    this.requires = new Set();
    this.lines = [];
    this.line = "";
    this.indents = "";
    return this;
}

Transpiler.prototype.require = function(key, path) {
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

Transpiler.transpile = function(context, methodName, cmdLineArgs) {
    try {
        var method = locateMethod(context, methodName, cmdLineArgs);
        var transpiler = new Transpiler(context);
        method.transpile(transpiler);
        if(transpiler.line!==transpiler.indents)
            transpiler.lines.push(transpiler.line);
        transpiler.lines.push("");
        transpiler.lines.push(methodName); // return the method to call
        return transpiler.lines.join("");
    } finally {
        context.terminated();
    }
};

exports.Transpiler = Transpiler;
