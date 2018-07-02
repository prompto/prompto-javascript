var Section = require("../parser/Section").Section;

function BaseDeclaration(id) {
	Section.call(this);
	this.id = id;
    this.comments = null;
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


exports.BaseDeclaration = BaseDeclaration;
