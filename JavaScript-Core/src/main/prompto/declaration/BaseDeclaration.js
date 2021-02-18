import Section from '../parser/Section.js'

export default class BaseDeclaration extends Section {

    constructor(id) {
        super();
        this.id = id;
        this.comments = null;
        this.annotations = null;
        this.declaring = false;
     }

    get name() {
        return this.id.name;
    }

    locateSectionAtLine(line) {
        return null;
    }

    unregister(context) {
        context.unregisterDeclaration (this);
    }

    getAllAnnotations(context) {
        return this.annotations || [];
    }

    toDialect(writer) {
        writer.toDialect(this);
    }

    fetchBody(parser) {
        let section = null;
        if(/*section === null &&*/this.comments && this.comments.length > 0)
            section = this.comments[0];
        if(section==null && this.annotations && this.annotations.length > 0)
            section = this.annotations[0];
        if(section==null)
            section = this;
        return parser.getTokenStream().getText({ start: section.startLocation.tokenIndex, stop: this.endLocation.tokenIndex + 1 });
    }

}
