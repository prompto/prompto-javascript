var BaseType = require("./BaseType").BaseType;
var DocumentType = require("./DocumentType").DocumentType;
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

exports.PropertiesType = PropertiesType;
