var Section = require("../parser/Section").Section;

function Identifier(name) {
    Section.call(this);
    this.name = name;
    return this;
}

Identifier.prototype = Object.create(Section.prototype);
Identifier.prototype.constructor = Identifier;

Identifier.prototype.toString = function() {
    return this.name;
};

exports.Identifier = Identifier;
