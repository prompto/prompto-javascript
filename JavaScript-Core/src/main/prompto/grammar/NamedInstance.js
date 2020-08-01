var Section = require("../parser/Section").Section;

function NamedInstance() {
    Section.call(this);
    return this;
}

NamedInstance.prototype = Object.create(Section.prototype);
NamedInstance.prototype.constructor = NamedInstance;

exports.NamedInstance = NamedInstance;