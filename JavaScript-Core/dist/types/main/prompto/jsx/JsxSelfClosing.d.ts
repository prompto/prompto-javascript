import JsxElementBase from './JsxElementBase';
import { JsxProperty } from "./index";
import { Identifier } from "../grammar";
import { CodeWriter } from "../utils";
export default class JsxSelfClosing extends JsxElementBase {
    nameSuite: string;
    elementSuite: string;
    constructor(id: Identifier, nameSuite: string, properties: JsxProperty[], elementSuite: string);
    toDialect(writer: CodeWriter): void;
}
