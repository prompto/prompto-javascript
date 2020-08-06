var ObjectList = require("../utils/ObjectList").ObjectList;
var AttributeDeclaration = require("./AttributeDeclaration").AttributeDeclaration;
var CategoryDeclaration = require("./CategoryDeclaration").CategoryDeclaration;
var EnumeratedNativeDeclaration = require("./EnumeratedNativeDeclaration").EnumeratedNativeDeclaration;
var BaseMethodDeclaration = require("./BaseMethodDeclaration").BaseMethodDeclaration;
var TestMethodDeclaration = require("./TestMethodDeclaration").TestMethodDeclaration;

class DeclarationList extends ObjectList {

    constructor(items, item) {
        items = items || [];
        super(items);
        item = item || null;
        if(item!==null) {
            this.add(item);
        }
    }

    register(context) {
        this.registerAttributes(context);
        this.registerCategories(context);
        this.registerEnumerated(context);
        this.registerMethods(context);
        this.registerTests(context);
    }

    registerAttributes(context) {
        this.forEach(decl => {
            if(decl instanceof AttributeDeclaration)
                decl.register(context);
        });
    }

    registerCategories(context) {
        this.forEach(decl => {
            if(decl instanceof CategoryDeclaration)
                decl.register(context);
        });
    }

    registerEnumerated(context) {
        this.forEach(decl => {
            if(decl instanceof EnumeratedNativeDeclaration)
                decl.register(context);
        });
    }

    registerMethods(context) {
        this.forEach(decl => {
            if(decl instanceof BaseMethodDeclaration)
                decl.register(context);
        });
    }

    registerTests(context) {
        this.forEach(decl => {
            if(decl instanceof TestMethodDeclaration)
                decl.register(context);
        });
    }

    unregister(context) {
        this.forEach(decl => {
            decl.unregister(context);
        });
    }

    check(context) {
        this.forEach(decl => {
            if(decl instanceof BaseMethodDeclaration)
                decl.check(context, true);
            else
                decl.check(context);
        });
    }

    toDialect(writer) {
        this.forEach(decl => {
            if(decl.comments) {
                decl.comments.forEach(cmt => {
                    cmt.toDialect(writer);
                });
            }
            if(decl.annotations) {
                decl.annotations.forEach(ann => {
                    ann.toDialect(writer);
                });
            }
            decl.toDialect(writer);
            writer.newLine();
        });
    }
}


exports.DeclarationList = DeclarationList;