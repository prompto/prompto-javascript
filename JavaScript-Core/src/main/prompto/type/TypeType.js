var BaseType = require("./BaseType").BaseType;
var Identifier = require("../grammar/Identifier").Identifier;


function TypeType(type) {
    BaseType.call(this, new Identifier("Type"));
    this.type = type;
    return this;
}

TypeType.prototype = Object.create(BaseType.prototype);
TypeType.prototype.constructor = TypeType;


TypeType.prototype.checkMember = function(context, section, name) {
    return this.type.checkStaticMember(context, section, name);
};


TypeType.prototype.declareMember = function(transpiler, section, name) {
    this.type.declare(transpiler);
    this.type.declareStaticMember(transpiler, section, name);
};


TypeType.prototype.transpileMember = function(transpiler, name) {
    this.type.transpileStaticMember(transpiler, name);
};

TypeType.prototype.getMemberMethods = function(context, section, name) {
    return this.type.getStaticMemberMethods(context, section, name);
};

exports.TypeType = TypeType;
