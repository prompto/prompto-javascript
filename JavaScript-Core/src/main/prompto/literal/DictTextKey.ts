import {IValue, TextValue} from '../value'
import DictKey from "./DictKey";
import {Context, Transpiler} from "../runtime";

/*jshint evil:true*/
function unescape(text: string): string {
    return eval(text) as string;
}

export default class DictTextKey extends DictKey {

    text: string;

    constructor(text: string) {
        super();
        this.text = text;
   }

    toString() {
        return this.text;
    }

    stringValue() {
        return unescape(this.text);
    }

    check(context: Context): void {
        // nothing to do
    }

    interpret(context: Context): IValue {
        return new TextValue(this.stringValue());
    }

    declare(transpiler: Transpiler): void {
        // nothing to do
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append(this.text);
    }


}
