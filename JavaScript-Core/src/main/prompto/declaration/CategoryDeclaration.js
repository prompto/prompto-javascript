var AttributeDeclaration = require("./AttributeDeclaration").AttributeDeclaration;
var BaseDeclaration = require("./BaseDeclaration").BaseDeclaration;
var CategoryType = require("../type/CategoryType").CategoryType;
var TypeUtils = require("../utils/TypeUtils");
var NullValue = require("../value/NullValue").NullValue;

class CategoryDeclaration extends BaseDeclaration {
    constructor(id, attributes) {
        super(id);
        this.attributes = attributes || null;
        this.derivedFrom = null;
        this.storable = false;
        return this;
    }

    getDeclarationType() {
        return "Category";
    }

    isWidget(context) {
        return false;
    }

    isStorable(context) {
        return this.storable || this.isDerivedFromStorable(context);
    }

    isDerivedFromStorable(context) {
        if(this.derivedFrom == null)
            return false;
        else
            return this.derivedFrom.find(name=>{
                var decl = context.getRegisteredDeclaration(name);
                return decl && decl.isStorable(context);
            });
    }

    newInstanceFromStored(context, stored) {
        var instance = this.newInstance(context);
        instance.mutable = true;
        try {
            var dbId = stored.dbId;
            var value = TypeUtils.convertFromJavaScript(dbId);
            instance.setMember(context, "dbId", value);
            var allAttributes = this.getAllAttributes(context);
            allAttributes.forEach(name => {
                var decl = context.getRegisteredDeclaration(name);
                if (decl.storable) {
                    var data = stored.getData(name);
                    var value = data==null ? NullValue.instance : decl.getType(context).convertJavaScriptValueToPromptoValue(context, data, null)
                    instance.setMember(context, name, value);
                }
            }, this);
        } finally {
            instance.mutable = false;
        }
        return instance;
    }

    getLocalAttributes() {
        return this.attributes;
    }

    getAllAttributes(context) {
        var attributes = this.getLocalAttributes();
        if(attributes)
            return new Set(attributes);
        else
            return null;
    }

    register(context) {
        context.registerDeclaration(this);
        this.registerMethods(context);
    }

    check(context) {
        if(this.attributes!=null) {
            this.attributes.forEach(id => {
                var ad = context.getRegisteredDeclaration(id.name);
                if (ad == null)
                    context.problemListener.reportUnknownAttribute(id);
                else if (!(ad instanceof AttributeDeclaration))
                    context.problemListener.reportInvalidAttribute(id)
            });
        }
        return new CategoryType(this.id);
    }

    getType(context) {
        return new CategoryType(this.id);
    }

    hasAttribute(context, name) {
        if (name === "dbId")
            return this.storable;
        else if (this.attributes == null)
            return false;
        else {
            for (var i = 0; i < this.attributes.length; i++ ) {
                if (name === this.attributes[i].name)
                    return true;
            }
            return false;
        }
    }

    hasMethod(context, key) {
        return false;
    }

    isDerivedFrom(context, categoryType) {
        return false;
    }

    getAllAnnotations(context) {
        var annotations = [];
        if (this.derivedFrom) {
            this.derivedFrom.forEach(name => {
                var decl = context.getRegisteredDeclaration(name);
                if (decl instanceof CategoryDeclaration) {
                    annotations = annotations.concat(decl.getAllAnnotations(context));
                }
            }, this);
        }
        if(this.annotations)
            annotations = annotations.concat(this.annotations);
        return annotations;
    }

    processAnnotations(context, processDerivedFrom) {
        var annotations = processDerivedFrom ? this.getAllAnnotations(context) : (this.annotations || []);
        annotations.forEach(function (ann) {
            ann.processCategory(context, this);
        }, this);
    }

    checkConstructorContext(context) {
        // nothing to do
    }

    toDialect(writer) {
        var type = this.getType(writer.context);
        writer = writer.newInstanceWriter(type);
        writer.toDialect(this);
    }

    protoToEDialect(writer, hasMethods, hasBindings) {
        var hasAttributes = this.attributes!=null && this.attributes.length>0;
        writer.append("define ");
        writer.append(this.name);
        writer.append(" as ");
        if(this.storable)
            writer.append("storable ");
        this.categoryTypeToEDialect(writer);
        if(hasAttributes) {
            if(this.attributes.length==1)
                writer.append(" with attribute ");
            else
                writer.append(" with attributes ");
            this.attributes.toDialect(writer, true);
        }
        if(hasMethods) {
            if(hasAttributes)
                writer.append(", and methods:");
            else
                writer.append(" with methods:");
        } else if (hasBindings) {
            if(hasAttributes)
                writer.append(", and bindings:");
            else
                writer.append(" with bindings:");
        }
        writer.newLine();
    }

    methodsToEDialect(writer, methods) {
        writer.indent();
        methods.forEach(method => {
            writer.newLine();
            if(method.comments) {
                method.comments.forEach(cmt => {
                    cmt.toDialect(writer);
                });
            }
            if(method.annotations) {
                method.annotations.forEach(ann => {
                    ann.toDialect(writer);
                });
            }
            var w = writer.newMemberWriter();
            method.toDialect(w);
        });
        writer.dedent();
    }

    methodsToODialect(writer, methods) {
        methods.forEach(method => {
            if(method.comments) {
                method.comments.forEach(cmt => {
                    cmt.toDialect(writer);
                });
            }
            if(method.annotations) {
                method.annotations.forEach(ann => {
                    ann.toDialect(writer);
                });
            }
            var w = writer.newMemberWriter();
            method.toDialect(w);
            w.newLine();
        });
    }

    allToODialect(writer, hasBody) {
        if(this.storable)
            writer.append("storable ");
        this.categoryTypeToODialect(writer);
        writer.append(" ").append(this.name);
        if(this.attributes!=null) {
            writer.append('(');
            this.attributes.toDialect(writer, true);
            writer.append(')');
        }
        this.categoryExtensionToODialect(writer);
        if(hasBody) {
            writer.append(" {").newLine().newLine().indent();
            this.bodyToODialect(writer);
            writer.dedent().append('}').newLine();
        } else
            writer.append(';');
    }

    categoryExtensionToODialect(writer) {
        // by default no extension
    }

    protoToMDialect(writer, derivedFrom) {
        if(this.storable)
            writer.append("storable ");
        this.categoryTypeToMDialect(writer);
        writer.append(" ").append(this.name).append("(");
        if(this.derivedFrom!=null) {
            this.derivedFrom.toDialect(writer, false);
            if(this.attributes!=null)
                writer.append(", ");
        }
        if(this.attributes!=null)
            this.attributes.toDialect(writer, false);
        writer.append("):").newLine();
    }
}


exports.CategoryDeclaration = CategoryDeclaration;

