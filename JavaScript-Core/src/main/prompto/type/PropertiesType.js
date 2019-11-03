var BaseType = require("./BaseType").BaseType;
var DocumentType = require("./DocumentType").DocumentType;
var Document = require("../intrinsic/Document").Document;
var List = require("../intrinsic/List").List;
var Identifier = require("../grammar/Identifier").Identifier;

/* transient type for holding child property structure */
function PropertiesType(properties) {
    BaseType.call(this, new Identifier("Properties"));
    this.properties = properties;
    return this;
}


PropertiesType.prototype = Object.create(BaseType.prototype);
PropertiesType.prototype.constructor = PropertiesType;

PropertiesType.prototype.isAssignableFrom = function(context, other) {
    if(other instanceof DocumentType)
        return true;
    else
        return BaseType.prototype.isAssignableFrom.call(this, context, other);
};

PropertiesType.prototype.getMemberMethods = function(context, name) {
    var prop = this.properties.get(name);
    return prop ? prop.validator.getMethodDeclarations(context) : BaseType.prototype.getMemberMethods.call(this, context, name);
};


PropertiesType.prototype.checkMember = function(context, section, name) {
    var prop = this.properties.get(name);
    return prop ? prop.validator.getType(context) : BaseType.prototype.checkMember.call(this, context, section, name);
};


PropertiesType.prototype.declare = function(transpiler) {
    transpiler.register(Document);
    transpiler.register(List);
};


PropertiesType.prototype.declareMember = function(transpiler, section, name) {
    var prop = this.properties.get(name);
    if(prop)
        prop.validator.getType(transpiler.context).declare(transpiler);
    else
        BaseType.prototype.declareMember.call(this, transpiler, section, name);
};


PropertiesType.prototype.transpileMember = function(transpiler, name) {
    if ("text"===name) {
        transpiler.append("getText()");
    } else {
        transpiler.append(name);
    }
};


exports.PropertiesType = PropertiesType;
