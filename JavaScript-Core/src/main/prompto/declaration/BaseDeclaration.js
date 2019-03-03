var Section = require("../parser/Section").Section;

function BaseDeclaration(id) {
	Section.call(this);
	this.id = id;
    this.comments = null;
    this.annotations = null;
    this.declaring = false;
	return this;
}

BaseDeclaration.prototype = Object.create(Section.prototype);
BaseDeclaration.prototype.constructor = BaseDeclaration;

Object.defineProperty(BaseDeclaration.prototype, "name", {
    get : function() {
        return this.id.name;
    }
});

BaseDeclaration.prototype.unregister = function(context) {
    context.unregisterDeclaration (this);
};

BaseDeclaration.prototype.toDialect = function(writer) {
    writer.toDialect(this);
};

BaseDeclaration.prototype.fetchBody = function(parser) {
    var section = null;
    if(section==null && this.comments && this.comments.length > 0)
        section = this.comments[0];
    if(section==null && this.annotations && this.annotations.length > 0)
        section = this.annotations[0];
    if(section==null)
        section = this;
    return parser.getTokenStream().getText({ start: section.start.tokenIndex, stop: this.end.tokenIndex + 1 });
};


BaseDeclaration.prototype.locateSectionAtLine = function(line) {
    return null;
};

exports.BaseDeclaration = BaseDeclaration;
