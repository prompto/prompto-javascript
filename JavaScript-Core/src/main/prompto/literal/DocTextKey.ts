import {IValue, TextValue} from '../value'
import {Context, Transpiler} from "../runtime";
import DocKey from "./DocKey";

/*jshint evil:true*/
function unescape(text: string) {
    return eval(text) as string;
}

export default class DocTextKey extends DocKey {

    text: string;

    constructor(text: string) {
        super();
        this.text = text;
    }

    toString(): string {
        return this.text;
    }

    stringValue(): string {
        return unescape(this.text);
    }

    check(context: Context): void {
        // nothing to do
    }

    interpret(context: Context): IValue {
        return new TextValue(this.stringValue());
    }

    transpile(transpiler: Transpiler): void { 
        transpiler.append(this.text);
    }

 }
