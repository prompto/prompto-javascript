import { TextValue } from '../value'
import DocKey from "./DocKey";
import {Context, Transpiler} from "../runtime";

/*jshint evil:true*/
function unescape(text: string) {
    return eval(text) as string;
}

export default class DocTextKey implements DocKey {

    text: string;

    constructor(text: string) {
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

    interpret(context: Context): void {
        return new TextValue(this.stringValue());
    }

    transpile(transpiler: Transpiler): void { 
        transpiler.append(this.text);
    }

 }
