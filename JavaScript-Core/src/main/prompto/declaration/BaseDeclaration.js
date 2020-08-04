var Section = require("../parser/Section").Section;

class BaseDeclaration extends Section {

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
        var section = null;
        if(section==null && this.comments && this.comments.length > 0)
            section = this.comments[0];
        if(section==null && this.annotations && this.annotations.length > 0)
            section = this.annotations[0];
        if(section==null)
            section = this;
        return parser.getTokenStream().getText({ start: section.start.tokenIndex, stop: this.end.tokenIndex + 1 });
    }

    locateSectionAtLine(line) {
        return null;
    }
}

exports.BaseDeclaration = BaseDeclaration;
