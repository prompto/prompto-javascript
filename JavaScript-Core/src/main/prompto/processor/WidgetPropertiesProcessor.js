var AnnotationProcessor = require("./AnnotationProcessor").AnnotationProcessor;
var TypeLiteral = require("../literal/TypeLiteral").TypeLiteral;
var DocumentLiteral = require("../literal/DocumentLiteral").DocumentLiteral;
var Structure = require("../grammar/Structure").Structure;

function WidgetPropertiesProcessor() {
    AnnotationProcessor.call(this, "@WidgetProperties");
    return this;
}

WidgetPropertiesProcessor.prototype = Object.create(AnnotationProcessor.prototype);
WidgetPropertiesProcessor.prototype.constructor = WidgetPropertiesProcessor;


WidgetPropertiesProcessor.prototype.processCategory = function(annotation, context, declaration) {
    if(declaration.isWidget(context)) {
        this.doProcessCategory(annotation, context, declaration);
    } else {
        context.problemListener.reportIllegalAnnotation("WidgetField is only applicable to widgets", annotation);
    }
};


WidgetPropertiesProcessor.prototype.doProcessCategory = function(annotation, context, widget) {
    var types = annotation.getDefaultArgument();
    var structure = this.checkStructure(annotation, context, types);
    if (structure != null)
        widget.propertyTypes = structure;
};

WidgetPropertiesProcessor.prototype.checkStructure = function(annotation, context, types) {
    if (!(types instanceof DocumentLiteral)) {
        context.problemListener.reportIllegalAnnotation(annotation, "WidgetProperties expects a Document of types as unique parameter");
        return null;
    }
    return this.checkStructureEntries(annotation, context, types.entries);
};

WidgetPropertiesProcessor.prototype.checkStructureEntries = function(annotation, context, entries) {
    var structure = new Structure();
    for(var i=0; i<entries.items.length; i++) {
        var entry = entries.items[i];
        if(entry.value instanceof TypeLiteral)
            structure.set(entry.key.toString(), entry.value.value);
        else if(entry.value instanceof DocumentLiteral) {
            var embedded = this.checkStructureEntries(annotation, context, entry.value.entries);
            if(embedded==null)
                return null;
            else
                structure.set(entry.key.toString(), new StructureType(embedded)); // TODO not tested yet
        } else {
            context.getProblemListener().reportIllegalAnnotation(annotation, "WidgetProperties expects a Document of types as unique parameter");
            return null;
        }

    }
    return structure;
};

exports.WidgetPropertiesProcessor = WidgetPropertiesProcessor;