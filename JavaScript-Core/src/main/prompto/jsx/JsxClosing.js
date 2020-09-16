// import Section from '../parser/Section.js'
const Section = await import('../parser/Section.js');

export default class JsxClosing extends Section {

    constructor(id, suite) {
        super();
        this.id = id;
        this.suite = suite;
    }

    check(context, opening) {
        if(this.id.name!=opening.id.name)
            context.problemListener.reportInvalidClosingTag(this.id, opening.id);
    }

    toDialect(writer) {
        writer.append("</").append(this.id.name).append(">");
        if(this.suite!=null)
            writer.appendRaw(this.suite);
    }
}
