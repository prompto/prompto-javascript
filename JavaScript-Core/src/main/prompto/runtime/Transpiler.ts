/* eslint-disable @typescript-eslint/ban-types */
// noinspection TypeScriptUnresolvedVariable

import {CategoryDeclaration} from '../declaration'
import { StrictSet, List } from '../intrinsic';
import { equalObjects } from '../utils'
import {Context} from "./Context";
import {Type} from "../type";
import Transpilable from './Transpilable';

const coreNodeClasses = new Set<string>(["Socket"]);

export default class Transpiler {

    parent: Transpiler | null;
    context: Context;
    declared: Set<Transpilable>;
    required: Set<Function>;
    registered: Set<Function>;
    escapeMode: number;
    lines: string[];
    initializers: string[];
    line: string;
    indents: string;
    getterName?: string;
    setterName?: string;

    constructor(context: Context) {
        this.context = context;
        this.declared = new Set<Transpilable>();
        this.required = new Set<Function>();
        this.registered = new Set<Function>();
        this.escapeMode = 0;
        this.lines = [];
        this.initializers = [];
        this.line = "";
        this.indents = "";
    }

    toString(): string {
        this.appendAllRequired();
        this.appendAllRegistered();
        this.appendAllDeclared();
        this.appendAllInitializers();
        return this.lines.join("\n");
    }

    copyTranspiler(context: Context): Transpiler {
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

    newLocalTranspiler(): Transpiler {
        const context = this.context.newLocalContext();
        return this.copyTranspiler(context);
    }

    newChildTranspiler(context?: Context): Transpiler {
        if(!context)
            context = this.context.newChildContext();
        return this.copyTranspiler(context);
    }

    newResourceTranspiler(): Transpiler {
        const context = this.context.newResourceContext();
        return this.copyTranspiler(context);
    }

    newGetterTranspiler(name: string): Transpiler {
        const transpiler = this.newChildTranspiler();
        transpiler.getterName = name;
        return transpiler;
    }

    newSetterTranspiler(name: string): Transpiler {
        const transpiler = this.newChildTranspiler();
        transpiler.setterName = name;
        return transpiler;
    }

    newInstanceTranspiler(type: Type): Transpiler {
        const context = this.context.newInstanceContext(null, type, true);
        return this.copyTranspiler(context);
    }

    newDocumentTranspiler(): Transpiler {
        const context = this.context.newDocumentContext(null, false);
        return this.copyTranspiler(context);
    }

    flush(): void {
        if(this.parent) {
            this.parent.line = this.line;
            this.parent.indents = this.indents;
            this.parent.escapeMode = this.escapeMode;
        }
    }

    declare(decl: Transpilable): void {
        this.declared.add(decl);
    }

    appendAllDeclared() {
        const list: Transpilable[] = [];
        const set = new Set<Transpilable>();
        this.declared.forEach( decl => {
            if(decl instanceof CategoryDeclaration)
                decl.ensureDeclarationOrder(this.context, list, set);
            else
                list.push(decl);
        }, this);
        list.forEach(decl => this.appendOneDeclared(decl) , this);
    }

    appendOneDeclared(decl: Transpilable): void {
        const transpiler = this.newLocalTranspiler();
        decl.transpile(transpiler);
        transpiler.flush();
        if(this.line!==this.indents) {
            this.lines.push(this.line);
            this.line = this.indents;
        }
        this.lines.push("");
    }

    require(fn: Function): void {
        this.required.add(fn);
    }

    appendAllRequired() {
        this.required.forEach( fn => this.appendOneRequired(fn) , this);
    }

    register(f: Function): void {
        this.required.add(f);
        this.registered.add(f);
    }

    appendAllRegistered() {
        this.registered.forEach( f => this.append("intrinsic." + f.name + " = " + f.name + ";").newLine() , this);
    }

    addInitializer(line: string): void {
        this.initializers.push(line);
    }

    appendAllInitializers() {
        if(this.initializers.length)
            this.lines = this.lines.concat(this.initializers);
    }

    getTranspiled(obj: object): string {
        if(obj===null)
            return "null";
        if("toTranspiled" in obj) {
            const toTranspiled = obj["toTranspiled" as keyof typeof obj] as ()=>string;
            return toTranspiled();
        } else
            return obj.toString();
    }

    appendOneRequired(fn: Function): void {
        if (coreNodeClasses.has(fn.name))
            return;
        this.appendOneRequired_main(fn);
        this.appendOneRequired_static(fn);
        this.appendOneRequired_ctor(fn);
        this.appendOneRequired_methods(fn);
        this.appendOneRequired_accessors(fn);
    }

    appendOneRequired_main(fn: Function): void {
        this.lines.push(this.resolveImports(fn.toString()));
    }

    appendOneRequired_static(fn: Function): void {
        const obj = fn as object;
        type ObjectKey = keyof typeof obj;
        Object.keys(obj).forEach(key => {
            const value = obj[key as ObjectKey];
            const transpiled = this.getTranspiled(value);
            this.lines.push(fn.name + "." + key + " = " + this.resolveImports(transpiled) + ";")
        }, this);
    }

    appendOneRequired_ctor(fn: Function): void {
        const prototype = fn.prototype as object;
        if ("__proto__" in prototype) {
            const proto = prototype['__proto__' as keyof typeof prototype] as object;
            if (proto.constructor.name != "Object")
                this.lines.push(fn.name + ".prototype.__proto__ = " + proto.constructor.name + ".prototype;");
        }
    }

    appendOneRequired_methods(fn: Function): void {
        const prototype = fn.prototype as object;
        Object.keys(prototype).filter(key => key !== "toTranspiled")
            .forEach(key => {
                let value = "";
                if(key == "constructor")
                    value = fn.name;
                else {
                    const entry = prototype[key as keyof typeof prototype] as object;
                    value =  this.resolveImports(entry.toString())
                }
                if (value.indexOf("native code") < 0)
                    this.lines.push(fn.name + ".prototype." + key + " = " + value + ";");
                else {
                    // for now assume this is a redirect on the same type
                    const entry = prototype[key as keyof typeof prototype] as Function;
                    this.lines.push(fn.name + ".prototype." + key + " = " + fn.name + ".prototype." + entry.name + ";");
                }
        }, this);
    }

    appendOneRequired_accessors(fn: Function): void {
        const prototype = fn.prototype as object;
        Object.getOwnPropertyNames(prototype).forEach( key => {
            const desc = Object.getOwnPropertyDescriptor(fn.prototype, key);
            if(desc && (desc.get || desc.set)) {
                this.lines.push("Object.defineProperty(" + fn.name + ".prototype, '" + key + "', {");
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

    resolveImports(body: string): string {
        body = this.resolveDefaultImports(body);
        body = this.resolveChildImports(body);
        return body;
    }

    resolveChildImports(body: string): string {
        body = this.resolveChildImport(body, "Utils");
        return body;
    }

    resolveChildImport(body: string, parent: string): string {
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

    resolveDefaultImports(body: string): string  {
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

    append(text: string): Transpiler {
        this.line += text;
        return this;
    }

    trimLast(count: number): Transpiler {
        this.line = this.line.substring(0, this.line.length - count);
        return this;
    }

    newLine(): Transpiler {
        this.lines.push(this.line);
        this.line = this.indents;
        return this;
    }

    escape(): Transpiler {
        this.escapeMode++;
        return this;
    }

    unescape(): Transpiler {
        this.escapeMode--;
        return this;
    }

    indent(indentOnly?: boolean): Transpiler {
        if(!indentOnly)
            this.lines.push(this.line);
        this.indents += '\t';
        this.line = this.indents;
        return this;
    }

    dedent(): Transpiler {
        if(this.line!==this.indents)
            this.lines.push(this.line);
        if(this.indents.length === 0) {
            throw new Error("Illegal dedent!");
        }
        this.indents = this.indents.slice(1);
        this.line = this.indents;
        return this;
    }

    static transpile(context: Context, thing: Transpilable): string {
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

    printTestName(testName: string): Transpiler {
        this.append("print('").append(testName).append(' test ');
        return this;
    }
}

function newTranspiler(context: Context): Transpiler {
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
// to ease implementation
function patchObject() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Object.prototype.declare = function (transpiler: Transpiler): void {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const name: string = Object.getPrototypeOf(this).constructor.name as string;
        throw new Error("declare missing for " + name);
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Object.prototype.transpile = function (transpiler: Transpiler): void {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const name: string = Object.getPrototypeOf(this).constructor.name as string;
        throw new Error("transpile missing for " + name);
    };
}

function unpatchObject() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete Object.prototype.declare;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete Object.prototype.transpile;
}


const ObjectUtils = {

    values: function(o: object): any[] {
        type ObjectKey = keyof typeof o;
        const values: any[] = [];
        for (const name in o) {
            values.push(o[name as ObjectKey]);
        }
        return values;
    },

    stringSplitToList: function(separator: string): List {
        return new List(false, (this as string).split(separator));
    },

    stringHasAll: function(items: any): boolean {
        if (typeof (StrictSet) !== 'undefined') {
            if (items instanceof StrictSet)
                items = items.toArray();
        }
        const elems = items as string[];
        for (let i = 0; i < elems.length; i++) {
            if (!(this as string).includes(elems[i]))
                return false;
        }
        return true;
    },


    stringHasAny: function(items: any): boolean {
        if (typeof (StrictSet) !== 'undefined') {
            if (items instanceof StrictSet)
                items = items.toArray();
        }
        const elems = items as string[];
        for (let i = 0; i < elems.length; i++) {
            if ((this as string).includes(elems[i]))
                return true;
        }
        return false;
    },

    stringSlice: function(start: number, last: number): string {
        if (start) {
            if (start < 1 || start > (this as string).length)
                throw new RangeError();
            start = start - 1;
        } else
            start = 0;
        if (!last)
            return (this as string).substring(start);
        if (last >= 0) {
            if (last < 1 || last > (this as string).length)
                throw new RangeError();
            return (this as string).substring(start, last);
        } else {
            if (last < -(this as string).length)
                throw new RangeError();
            return (this as string).substring(start, (this as string).length + 1 + last)
        }
    },

    formatInteger: function(format: string): string {
        const value = "000000000000" + (this as number).toString();
        return value.substring(value.length - format.length);
    },

    decimalToString: function(): string {
        // mimic 0.0######
        const s = (this as number).toString();
        let i = s.indexOf('.');
        if (i >= 0) {
            // fix IEEE issue
            i = s.indexOf('000000', i);
            if (i < 0)
                return s;
            else
                return s.substring(0, i);
        } else
            return s + ".0";
    }
}

function print(msg: string): void {
    const isNodeJs = typeof window === 'undefined' && typeof importScripts === 'undefined';
    if(isNodeJs)
        process.stdout.write(msg);
    else
        console.log(msg);
}

function translateError(e: Error): string {
    if(e instanceof PromptoError)
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

class PromptoError extends Error {

    promptoName: string;

}
class DivideByZeroError extends PromptoError {


    constructor(message?: string) {
        super(message || "Divide by zero!")
        this.name = "DivideByZeroError";
        this.promptoName = "DIVIDE_BY_ZERO";
    }

    toString(): string {
        return this.message;
    }


    getText(): string {
        return this.message;
    }

}

function divide(a: number, b: number ): number {
    if(b===0)
        throw new DivideByZeroError();
    else
        return a / b;
}


class NotMutableError extends PromptoError {

     constructor(message?: string) {
        super(message || "Not a mutable object!")
        this.name = "NotMutableError";
        this.promptoName = "NOT_MUTABLE";
    }

    toString(): string {
        return this.message;
    }

    getText(): string {
        return this.message;
    }
}

