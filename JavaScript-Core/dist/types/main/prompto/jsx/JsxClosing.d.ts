import Section from '../parser/Section';
import { Identifier } from "../grammar";
import { Context } from "../runtime";
import { CodeWriter } from "../utils";
import { JsxElement } from "./index";
export default class JsxClosing extends Section {
    id: Identifier;
    suite: string;
    constructor(id: Identifier, suite: string);
    check(context: Context, opening: JsxElement): void;
    toDialect(writer: CodeWriter): void;
}
