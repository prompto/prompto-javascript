import { CategoryDeclaration } from '../declaration/index.js'
import StrictSet from '../intrinsic/StrictSet.js';
import List from '../intrinsic/List.js';
import { equalObjects } from '../utils/index.js'

const coreNodeClasses = new Set(["Socket"]);

export default class Transpiler {

    constructor(context) {
        this.context = context;
        this.declared = new Set();
        this.required = new Set();
        this.registered = new Set();
        this.escapeMode = 0;
        this.lines = [];
        this.initializers = [];
        this.line = "";
        this.indents = "";
    }

    toString() {
        this.appendAllRequired();
        this.appendAllRegistered();
        this.appendAllDeclared();
        this.appendAllInitializers();
        return this.lines.join("\n");
    }

    copyTranspiler(context) {
        const transpiler = new Transpiler(context);
        transpiler.declared = this.declared;
        transpiler.required = this.required;
        transpiler.registered = this.registered;
        transpiler.escapeMode = this.escapeMode;
        transpiler.lines = this.lines;
        transpiler.initializers = this.initializers;
        transpiler.line = this.line;
        transpiler.indents = this.indents;
        transpiler.parent = this;
        return transpiler;
    }

    newLocalTranspiler() {
        const context = this.context.newLocalContext();
        return this.copyTranspiler(context);
    }

    newChildTranspiler(context) {
        if(!context)
            context = this.context.newChildContext();
        return this.copyTranspiler(context);
    }

    newResourceTranspiler() {
        const context = this.context.newResourceContext();
        return this.copyTranspiler(context);
    }

    newGetterTranspiler(name) {
        const transpiler = this.newChildTranspiler();
        transpiler.getterName = name;
        return transpiler;
    }

    newSetterTranspiler(name) {
        const transpiler = this.newChildTranspiler();
        transpiler.setterName = name;
        return transpiler;
    }

    newInstanceTranspiler(type) {
        const context = this.context.newInstanceContext(null, type, true);
        return this.copyTranspiler(context);
    }

    newDocumentTranspiler() {
        const context = this.context.newDocumentContext(null, false);
        return this.copyTranspiler(context);
    }

    flush() {
        if(this.parent) {
            this.parent.line = this.line;
            this.parent.indents = this.indents;
            this.parent.escapeMode = this.escapeMode;
        }
    }

    declare(decl) {
        this.declared.add(decl);
    }

    appendAllDeclared() {
        const list = [];
        const set = new Set();
        this.declared.forEach( decl => {
            if(decl instanceof CategoryDeclaration)
                decl.ensureDeclarationOrder(this.context, list, set);
            else
                list.push(decl);
        }, this);
        list.forEach( this.appendOneDeclared , this);
    }

    appendOneDeclared(decl) {
        const transpiler = this.newLocalTranspiler();
        decl.transpile(transpiler);
        transpiler.flush();
        if(this.line!==this.indents) {
            this.lines.push(this.line);
            this.line = this.indents;
        }
        this.lines.push("");
    }

    require(fn) {
        this.required.add(fn);
    }

    appendAllRequired() {
        this.required.forEach( fn => this.appendOneRequired(fn) , this);
    }

    register(f) {
        this.required.add(f);
        this.registered.add(f);
    }

    appendAllRegistered() {
        this.registered.forEach( f => this.append("intrinsic." + f.name + " = " + f.name + ";").newLine() , this);
    }

    addInitializer(line) {
        this.initializers.push(line);
    }

    appendAllInitializers() {
        if(this.initializers.length)
            this.lines = this.lines.concat(this.initializers);
    }

    getTranspiled(object) {
        if(object===null)
            return "null";
        else if(object.toTranspiled)
            return object.toTranspiled();
        else
            return object.toString();
    }

    appendOneRequired(fn) {
        if(coreNodeClasses.has(fn.name))
            return;
        this.lines.push(this.resolveImports(fn.toString()));
        Object.keys(fn).forEach( key => this.lines.push(fn.name + "." + key + " = " + this.resolveImports(this.getTranspiled(fn[key])) + ";"), this);
        if(fn.prototype.__proto__) {
            const proto = fn.prototype.__proto__;
            if(proto.constructor.name!=="Object")
                this.lines.push(fn.name + ".prototype.__proto__ = " + proto.constructor.name + ".prototype;");
        }
        Object.keys(fn.prototype).filter(key => key !== "toTranspiled").forEach( key => {
            const value = key==="constructor" ? fn.name : this.resolveImports(fn.prototype[key].toString());
            if(value.indexOf("native code")<0)
                this.lines.push(fn.name + ".prototype." + key + " = " + value + ";");
            else // for now assume this is a redirect on the same type
                this.lines.push(fn.name + ".prototype." + key + " = " + fn.name + ".prototype." + fn.prototype[key].name + ";");
        }, this);
        Object.getOwnPropertyNames(fn.prototype).forEach( name => {
            const desc = Object.getOwnPropertyDescriptor(fn.prototype, name);
            if(desc.get || desc.set) {
                this.lines.push("Object.defineProperty(" + fn.name + ".prototype, '" + name + "', {");
                if(desc.get) {
                    this.lines.push("    get: " + this.resolveImports(desc.get.toString()) + (desc.set ? "," : ""));
                }
                if(desc.set) {
                    this.lines.push("    set: " + this.resolveImports(desc.set.toString()));
                }
                this.lines.push("});")
            }
        }, this);
    }

    resolveImports(body) {
        body = this.resolveDefaultImports(body);
        body = this.resolveChildImports(body);
        return body;
    }

    resolveChildImports(body) {
        body = this.resolveChildImport(body, "Utils");
        return body;
    }

    resolveChildImport(body, parent) {
        const pattern = new RegExp("_" + parent + "\\.[a-z]*", 'g');
        let matches = body.match(pattern);
        while(matches !== null) {
            const match = matches[0];
            const replaceBy = match.substring(match.indexOf(".") + 1);
            body = body.replaceAll(match, replaceBy);
            matches = body.match(pattern);
        }
        return body;

    }

    resolveDefaultImports(body) {
        const pattern = /_[^.]*\.default/g;
        let matches = body.match(pattern);
        while(matches !== null) {
            const match = matches[0];
            const replaceBy = match.substring(1, match.length - 8);
            body = body.replaceAll(match, replaceBy);
            matches = body.match(pattern);
        }
        return body;
    }

    append(text) {
        this.line += text;
        return this;
    }

    trimLast(count) {
        this.line = this.line.substring(0, this.line.length - count);
        return this;
    }

    newLine() {
        this.lines.push(this.line);
        this.line = this.indents;
        return this;
    }

    escape() {
        this.escapeMode++;
        return this;
    }

    unescape() {
        this.escapeMode--;
        return this;
    }

    indent(indentOnly) {
        if(!indentOnly)
            this.lines.push(this.line);
        this.indents += '\t';
        this.line = this.indents;
        return this;
    }

    dedent() {
        if(this.line!==this.indents)
            this.lines.push(this.line);
        if(this.indents.length === 0) {
            throw new Error("Illegal dedent!");
        }
        this.indents = this.indents.slice(1);
        this.line = this.indents;
        return this;
    }

    static transpile(context, thing) {
        try {
            patchObject();
            const transpiler = newTranspiler(context);
            thing.declare(transpiler);
            return transpiler.toString();
        } finally {
            context.terminated();
            unpatchObject();
        }
    }

    printTestName(testName) {
        this.append("print('").append(testName).append(' test ');
        return this;
    }
}

function ObjectUtils() {

}

ObjectUtils.values = function(o) {
    const values = [];
    for(const name in o) {
        values.push(o[name]);
    }
    return values;
};

ObjectUtils.stringSplitToList = function(separator) {
    return new List(false, this.split(separator));
};

ObjectUtils.stringHasAll = function(items) {
    if(typeof(StrictSet) !== 'undefined' && items instanceof StrictSet)
        items = Array.from(items.set.values());
    for(let i=0;i<items.length;i++) {
        if(!this.includes(items[i]))
            return false;
    }
    return true;
};


ObjectUtils.stringHasAny = function(items) {
    if(typeof(StrictSet) !== 'undefined' && items instanceof StrictSet)
        items = Array.from(items.set.values());
    for(let i=0;i<items.length;i++) {
        if(this.includes(items[i]))
            return true;
    }
    return false;
};

ObjectUtils.stringSlice = function(start, last) {
    if(start) {
        if (start < 1 || start > this.length)
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
    const value = "000000000000" + this;
    return value.substr(value.length - format.length);
};

ObjectUtils.decimalToString = function() {
    // mimic 0.0######
    const s = this.toString();
    let i = s.indexOf('.');
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
    const isNodeJs = typeof window === 'undefined' && typeof importScripts === 'undefined';
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


    getText() {
        return this.message;
    }

}

function divide( a, b ) {
    if(b===0)
        throw new DivideByZeroError();
    else
        return a / b;
}


class NotMutableError extends Error {

    constructor(message) {
        super("Not a mutable object!")
        this.name = "NotMutableError";
        this.promptoName = "NOT_MUTABLE";
    }

    toString() {
        return this.message;
    }

    getText() {
        return this.message;
    }
}

// to ease implementation
function patchObject() {
    Object.prototype.declare = function (transpiler) {
        throw new Error("declare missing for " + this.__proto__.constructor.name);
    };
    Object.prototype.transpile = function (transpiler) {
        throw new Error("transpile missing for " + this.__proto__.constructor.name);
    };
}

function unpatchObject() {
    delete Object.prototype.declare;
    delete Object.prototype.transpile;
}

function newTranspiler(context) {
    const transpiler = new Transpiler(context);
    transpiler.require(equalObjects);
    transpiler.require(print);
    transpiler.require(divide);
    transpiler.require(DivideByZeroError);
    transpiler.require(NotMutableError);
    transpiler.require(translateError);
    transpiler.lines.push("TypeError.prototype.getText = function() { return 'Null reference!'; };");
    transpiler.lines.push("ReferenceError.prototype.getText = function() { return 'Null reference!'; };");
    transpiler.lines.push("RangeError.prototype.getText = function() { return 'Index out of range!'; };");
    transpiler.lines.push("if(!Object.values) { Object.values = " + transpiler.resolveImports(ObjectUtils.values.toString() + "; }"));
    transpiler.lines.push("Boolean.prototype.getText = Boolean.prototype.toString;");
    transpiler.lines.push("Boolean.prototype.toJson = function() { return JSON.stringify(this); };");
    transpiler.lines.push("Boolean.prototype.equals = function(value) { return this === value; };");
    transpiler.lines.push("Number.prototype.formatInteger = " + transpiler.resolveImports(ObjectUtils.formatInteger.toString() + ";"));
    transpiler.lines.push("Number.prototype.toDecimalString = " + transpiler.resolveImports(ObjectUtils.decimalToString.toString() + ";"));
    transpiler.lines.push("Number.prototype.getText = Number.prototype.toString;");
    transpiler.lines.push("Number.prototype.toJson = function() { return JSON.stringify(this); };");
    transpiler.lines.push("Number.prototype.equals = function(value) { return this === value; };");
    transpiler.lines.push("String.prototype.hasAll = " + transpiler.resolveImports(ObjectUtils.stringHasAll.toString() + ";"));
    transpiler.lines.push("String.prototype.hasAny = " + transpiler.resolveImports(ObjectUtils.stringHasAny.toString() + ";"));
    transpiler.lines.push("String.prototype.splitToList = " + transpiler.resolveImports(ObjectUtils.stringSplitToList.toString() + ";"));
    transpiler.lines.push("String.prototype.slice1Based = " + transpiler.resolveImports(ObjectUtils.stringSlice.toString() + ";"));
    transpiler.lines.push("String.prototype.getText = String.prototype.toString;");
    transpiler.lines.push("String.prototype.toJson = function() { return JSON.stringify(this); };");
    transpiler.lines.push("String.prototype.indexOf1Based = function(value, fromIndex) { return 1 + this.indexOf(value, fromIndex); };");
    transpiler.lines.push("String.prototype.contains = function(value) { return this.indexOf(value) >= 0; };");
    transpiler.lines.push("String.prototype.equals = function(value) { return this === value; };");
    transpiler.lines.push("String.prototype.iterator = function() { var s = this; return { idx: 0, hasNext: function() { return this.idx < s.length; }, next: function() { return s[this.idx++]; } }; };");
    transpiler.lines.push("var intrinsic = global.intrinsic = {};");
    return transpiler;
}


