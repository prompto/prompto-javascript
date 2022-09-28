import Section from '../parser/Section'
import {Identifier} from "../grammar";
import {Context} from "../runtime";
import {CodeWriter} from "../utils";
import {JsxElement} from "./index";

export default class JsxClosing extends Section {

    id: Identifier;
    suite: string;

    constructor(id: Identifier, suite: string) {
        super();
        this.id = id;
        this.suite = suite;
    }

    check(context: Context, opening: JsxElement) {
        if(this.id.name!=opening.id.name)
            context.problemListener.reportInvalidClosingTag(this, this.id.name, opening.id.name);
    }

    toDialect(writer: CodeWriter): void {
        writer.append("</").append(this.id.name).append(">");
        if(this.suite!=null)
            writer.appendRaw(this.suite);
    }
}
