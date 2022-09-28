import JsxElementBase from './JsxElementBase'
import {JsxProperty} from "./index";
import {Identifier} from "../grammar";
import {CodeWriter} from "../utils";

export default class JsxSelfClosing extends JsxElementBase {

    nameSuite: string;
    elementSuite: string;

    constructor(id: Identifier, nameSuite: string, properties: JsxProperty[], elementSuite: string) {
        super(id, properties);
        this.nameSuite = nameSuite;
        this.elementSuite = elementSuite;
    }

    toDialect(writer: CodeWriter): void {
        writer.append("<").append(this.id.name);
        if(this.nameSuite!=null)
            writer.appendRaw(this.nameSuite);
        else if(this.properties.length > 0)
            writer.append(" ");
        this.properties.forEach(prop => {
            prop.toDialect(writer);
        });
        writer.append("/>");
        if(this.elementSuite!=null)
            writer.appendRaw(this.elementSuite);
    }
}

