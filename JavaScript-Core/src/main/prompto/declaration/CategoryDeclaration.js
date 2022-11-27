import BaseDeclaration from './BaseDeclaration.js'
import { AttributeDeclaration } from './index.js'
import { CategoryType } from '../type/index.js'
import { MethodDeclarationMap } from "../runtime/index.js";
import {TextLiteral} from "../literal";

export default class CategoryDeclaration extends BaseDeclaration {

    constructor(id, attributes) {
        super(id);
        this.attributes = attributes || null;
        this.derivedFrom = null;
        this.storable = false;
    }

    getDeclarationType() {
        return "Category";
    }

    isWidget(context) {
        return false;
    }

    getPageWidgetOf() {
        if(this.annotations) {
            const annotations = this.annotations.filter(function(a) { return a.id.name==="@PageWidgetOf" });
            if(annotations.length > 0) {
                var expression = annotations[0].getDefaultArgument();
                if (expression instanceof TextLiteral) {
                    return expression.value.toString();
                }
            }
            return null;
        }
    }

    isStorable(context) {
        return this.storable || this.isDerivedFromStorable(context);
    }

    isDerivedFromStorable(context) {
        if(this.derivedFrom == null)
            return false;
        else
            return this.derivedFrom.find(name => {
                const decl = context.getRegisteredDeclaration(name);
                return decl && decl.isStorable(context);
            });
    }

    newInstanceFromStored(context, stored) {
        const instance = this.newInstance(context);
        instance.mutable = true;
        try {
            instance.setDbId(stored.dbId);
            const allAttributes = this.getAllAttributes(context);
            allAttributes.forEach(name => {
                const decl = context.getRegisteredDeclaration(name);
                if (decl.storable) {
                    if(stored.hasData(name)) {
                        const data = stored.getData(name);
                        const value = decl.getType(context).convertJavaScriptValueToPromptoValue(context, data, null);
                        instance.setMember(context, name, value);
                    }
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
        const attributes = this.getLocalAttributes();
        if(attributes)
            return new Set(attributes);
        else
            return null;
    }

    getLocalMethods() {
        throw new Error("Should never get there!");
    }

    getAllMethods(context, section) {
        const maps = new Map();
        this.collectAllMethods(context, section, maps);
        return maps;
    }

    collectAllMethods(context, section, maps) {
        this.collectInheritedMethods(context, section, maps);
        this.collectLocalMethods(context, maps);
    }

    collectInheritedMethods(context, section, maps) {
        if(this.derivedFrom)
            this.derivedFrom.forEach(name => {
                const decl = context.getRegisteredDeclaration(name);
                if(decl === null)
                    context.problemListener.reportInconsistentHierarchy(section, this.name, name);
                else
                    decl.collectAllMethods(context, section, maps);
            });
    }

    collectLocalMethods(context, maps) {
        this.getLocalMethods().forEach( method => {
            let localMap = maps.get(method.name);
            if(!localMap) {
                localMap = new MethodDeclarationMap(method.id);
                maps.set(method.name, localMap);
            }
            localMap.registerOrReplace(method);
        });
    }

    getAbstractMethods(context, section) {
        let abstract = [];
        this.getAllMethods(context, section).forEach((v,k) => {
            const toAdd = v.getAll().filter(m => m.isAbstract());
            abstract = abstract.concat(toAdd);
        });
        return abstract;
    }

    register(context) {
        context.registerDeclaration(this);
        this.registerMethods(context);
    }

    check(context) {
        if(this.attributes!=null) {
            this.attributes.forEach(id => {
                const ad = context.getRegisteredDeclaration(id);
                if (ad === null) {
                    if(id.name !== "text")
                        context.problemListener.reportUnknownAttribute(id, id.name);
                } else if (!(ad instanceof AttributeDeclaration))
                    context.problemListener.reportInvalidAttribute(id)
            });
        }
        return new CategoryType(this.id);
    }

    getType(context) {
        return new CategoryType(this.id);
    }

    hasAttribute(context, id) {
        if ("dbId" === id.name)
            return this.storable;
        else if (this.attributes == null)
            return false;
        else {
            const name = id.name;
            for (let i = 0; i < this.attributes.length; i++ ) {
                if ( name === this.attributes[i].name)
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
        let annotations = [];
        if (this.derivedFrom) {
            this.derivedFrom.forEach(name => {
                const decl = context.getTypedDeclaration(CategoryDeclaration, name);
                if (decl) {
                    annotations = annotations.concat(decl.getAllAnnotations(context));
                }
            }, this);
        }
        if(this.annotations)
            annotations = annotations.concat(this.annotations);
        return annotations;
    }

    processAnnotations(context, processDerivedFrom) {
        const annotations = processDerivedFrom ? this.getAllAnnotations(context) : (this.annotations || []);
        annotations.forEach(function (ann) {
            ann.processCategory(context, this);
        }, this);
    }

    checkConstructorContext(context) {
        // nothing to do
    }

    toDialect(writer) {
        const type = this.getType(writer.context);
        writer = writer.newInstanceWriter(type);
        writer.toDialect(this);
    }

    protoToEDialect(writer, hasMethods, hasBindings) {
        const hasAttributes = this.attributes!=null && this.attributes.length>0;
        writer.append("define ");
        writer.append(this.name);
        writer.append(" as ");
        if(this.storable)
            writer.append("storable ");
        this.categoryTypeToEDialect(writer);
        if(hasAttributes) {
            if(this.attributes.length===1)
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
            const w = writer.newMemberWriter();
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
            const w = writer.newMemberWriter();
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


