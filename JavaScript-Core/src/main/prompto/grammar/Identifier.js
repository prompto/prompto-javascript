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

Identifier.prototype.equals = function(other) {
    if(!other || !(other instanceof Identifier))
        return false;
    else
        return this.name==other.name;
};

exports.Identifier = Identifier;
