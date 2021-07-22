import CategoryDeclaration from './CategoryDeclaration.js'
import { SetterMethodDeclaration, GetterMethodDeclaration, EnumeratedNativeDeclaration, EnumeratedCategoryDeclaration } from './index.js'
import { MethodDeclarationMap } from '../runtime/index.js'
import { $Root } from '../intrinsic/index.js'
import { ConcreteInstance } from '../value/index.js'
import { CategoryType } from '../type/index.js'
import { $DataStore } from '../store/index.js'
import { equalArrays } from "../utils/index.js";

export default class ConcreteCategoryDeclaration extends CategoryDeclaration {

    constructor(id, attributes, derivedFrom, methods) {
        super(id, attributes);
        this.derivedFrom = derivedFrom || null;
        this.methodsMap = null;
        this.methods = methods || [];
    }

    isWidget(context) {
        if(this.derivedFrom==null || this.derivedFrom.length !== 1)
            return false;
        const derived = context.getRegisteredDeclaration(this.derivedFrom[0]);
        return derived && derived.isWidget(context);
    }

    toEDialect(writer) {
        const hasMethods = this.methods!=null && this.methods.length>0;
        this.protoToEDialect(writer, hasMethods, false); // no bindings
        if(hasMethods)
            this.methodsToEDialect(writer, this.methods);
    }

    categoryTypeToEDialect(writer) {
        if(this.derivedFrom==null)
            writer.append("category");
        else
            this.derivedFrom.toDialect(writer, true);
    }

    toODialect(writer) {
        const hasMethods = this.methods!=null && this.methods.length>0;
        this.allToODialect(writer, hasMethods);
    }

    categoryTypeToODialect(writer) {
        if(this.isWidget(writer.context))
            writer.append("widget");
        else
            writer.append("category");
    }

    categoryExtensionToODialect(writer) {
        if(this.derivedFrom!=null) {
            writer.append(" extends ");
            this.derivedFrom.toDialect(writer, true);
        }
    }

    bodyToODialect(writer) {
        this.methodsToODialect (writer, this.methods);
    }

    toMDialect(writer) {
        this.protoToMDialect(writer, this.derivedFrom);
        this.methodsToMDialect(writer);
    }

    categoryTypeToMDialect(writer) {
        writer.append("class");
    }

    methodsToMDialect(writer) {
        writer.indent();
        if(this.methods==null || this.methods.length === 0)
            writer.append("pass").newLine();
        else {
            writer.newLine();
            this.methods.forEach(method => {
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
                writer.newLine();
            });
        }
        writer.dedent();
    }

    hasAttribute(context, name) {
        if (super.hasAttribute(context, name)) {
            return true;
        } else {
            return this.hasDerivedAttribute(context, name);
        }
    }

    hasDerivedAttribute(context, name) {
        if(this.derivedFrom==null) {
            return false;
        }
        for(let i=0;i<this.derivedFrom.length;i++) {
            const ancestor = this.derivedFrom[i].name;
            if(ConcreteCategoryDeclaration.ancestorHasAttribute(ancestor, context, name)) {
                return true;
            }
        }
        return false;
    }

    static ancestorHasAttribute(ancestor, context, name) {
        const actual = context.getRegisteredDeclaration(ancestor);
        if(!(actual instanceof CategoryDeclaration)) {
            return false;
        }
        return actual.hasAttribute(context, name);
    }

    hasMethod(context, name) {
        this.registerMethods(context);
        const key = this.getMethodKey(name);
        if(this.methodsMap[key])
            return true;
        return this.hasDerivedMethod(context, name);
    }

    hasDerivedMethod(context, name) {
        if(this.derivedFrom==null) {
            return false;
        }
        for(let i=0;i<this.derivedFrom.length;i++) {
            const ancestor = this.derivedFrom[i].name;
            if(ConcreteCategoryDeclaration.ancestorHasMethod(ancestor, context, name)) {
                return true;
            }
        }
        return false;
    }

    static ancestorHasMethod(ancestor, context, name) {
        const actual = context.getRegisteredDeclaration(ancestor);
        if(!(actual instanceof CategoryDeclaration)) {
            return false;
        }
        return actual.hasMethod(context, name);
    }

    check(context) {
        context = context.newInstanceContext(null, this.getType(context), false);
        this.checkDerived(context);
        this.checkMethods(context);
        return super.check(context);
    }

    checkMethods(context) {
        this.registerMethods(context);
        this.methods.forEach( m => m.checkChild(context) );
    }

    registerMethods(context) {
        if(this.methodsMap==null) {
            this.methodsMap = {};
            this.methods.forEach(function(method) {
                method.memberOf = this;
                this.registerMethod(method, context);
            }, this);
        }
    }

    registerMethod(method, context) {
        let actual;
        if(method instanceof SetterMethodDeclaration) {
            const key = "setter:" + method.name;
            actual = this.methodsMap[key] || null;
            if(actual!=null)
                context.problemListener.reportDuplicateSetter(method.id);
            this.methodsMap[key] = method;
        } else if(method instanceof GetterMethodDeclaration) {
            const key = "getter:" + method.name;
            actual = this.methodsMap[key] || null;
            if(actual!=null)
                context.problemListener.reportDuplicateGetter(method.id);
            this.methodsMap[key] = method;
        } else {
            const key = this.getMethodKey(method.name);
            actual = this.methodsMap[key] || null;
            if(actual==null) {
                actual = new MethodDeclarationMap(method.name);
                this.methodsMap[key] = actual;
            }
            actual.register(method, context.problemListener);
        }
    }

    getMethodKey(name) {
        return name === "constructor" ? "$constructor" : name;
    }

    getLocalMethods() {
        return this.methods;
    }

    checkDerived(context) {
        if(this.derivedFrom!=null) {
            this.derivedFrom.map( id => {
                const cd = context.getRegisteredDeclaration(id.name) || null;
                if (cd == null)
                    context.problemListener.reportUnknownCategory(id, id.name);
                else if(!(cd instanceof CategoryDeclaration))
                    context.problemListener.reportInvalidCategory(id);
            });
        }
    }

    isDerivedFrom(context, categoryType) {
        if(this.derivedFrom==null) {
            return false;
        }
        for(let i=0;i<this.derivedFrom.length;i++) {
            const ancestor = this.derivedFrom[i].name;
            if(ancestor === categoryType.name) {
                return true;
            }
            if(ConcreteCategoryDeclaration.isAncestorDerivedFrom(ancestor,context,categoryType)) {
                return true;
            }
        }
        return false;
    }

    static isAncestorDerivedFrom(ancestor, context, categoryType) {
        const actual = context.getRegisteredDeclaration(ancestor);
        if(!(actual instanceof CategoryDeclaration)) {
            return false;
        }
        return actual.isDerivedFrom(context, categoryType);
    }

    newInstance(context) {
        return new ConcreteInstance(context, this);
    }

    getAllAttributes(context) {
        const local = super.getAllAttributes(context) || new Set();
        if(this.derivedFrom!=null) {
            this.derivedFrom.forEach(function (id) {
                const derived = this.getAncestorAttributes(context, id);
                if (derived != null)
                    derived.forEach(attr => { local.add(attr); }, this);
            }, this);
        }
        return local.size > 0  ? local : null;
    }

    getAncestorAttributes(context, id) {
        const decl = context.getRegisteredDeclaration(id.name);
        if(decl==null)
            return null;
        else
            return decl.getAllAttributes(context);
    }

    findGetter(context, attrName) {
        if(this.methodsMap==null) {
            return null;
        }
        const method = this.methodsMap["getter:" + attrName] || null;
        if(method instanceof GetterMethodDeclaration) {
            return method;
        }
        if(method!=null)
            context.problemListener.reportBadGetter(method.id);
        return this.findDerivedGetter(context, attrName);
    }

    findDerivedGetter(context, attrName) {
        if(this.derivedFrom==null) {
            return null;
        }
        for(let i=0;i<this.derivedFrom;i++) {
            const method = ConcreteCategoryDeclaration.findAncestorGetter(this.derivedFrom[i],context,attrName);
            if(method!=null) {
                return method;
            }
        }
        return null;
    }

    static findAncestorGetter(ancestor, context, attrName) {
        const actual = context.getRegisteredDeclaration(ancestor);
        if(!(actual instanceof ConcreteCategoryDeclaration)) {
            return null;
        }
        return actual.findGetter(context, attrName);
    }

    findSetter(context, attrName) {
        if(this.methodsMap==null) {
            return null;
        }
        const method = this.methodsMap["setter:" + attrName] || null;
        if(method instanceof SetterMethodDeclaration) {
            return method;
        }
        if(method!=null)
            context.problemListener.reportBadSetter(method.id);
        return this.findDerivedSetter(context,attrName);
    }

    findDerivedSetter(context, attrName) {
        if(this.derivedFrom==null) {
            return null;
        }
        for(let i=0;i<this.derivedFrom;i++) {
            const method = ConcreteCategoryDeclaration.findAncestorSetter(this.derivedFrom[i],context,attrName);
            if(method!=null) {
                return method;
            }
        }
        return null;
    }

    static findAncestorSetter(ancestor, context, attrName) {
        const actual = context.getRegisteredDeclaration(ancestor);
        if(!(actual instanceof ConcreteCategoryDeclaration)) {
            return null;
        }
        return actual.findSetter(context, attrName);
    }

    getMemberMethodsMap(context, name) {
        const methodsMap = new MethodDeclarationMap(name);
        this.registerMemberMethods(context, methodsMap);
        return methodsMap;
    }

    registerMemberMethods(context, result) {
        this.registerMethods(context);
        this.registerThisMemberMethods(context,result);
        this.registerDerivedMemberMethods(context,result);
    }

    registerThisMemberMethods(context, result) {
        if(this.methodsMap==null) {
            return;
        }
        const key = this.getMethodKey(result.name);
        const actual = this.methodsMap[key] || null;
        if(actual==null) {
            return;
        }
        if(!(actual instanceof MethodDeclarationMap))
            context.problemListener.reportBadMember(actual.id);
        const protos = Object.getOwnPropertyNames(actual.protos);
        protos.forEach(proto => {
            const method = actual.protos[proto];
            result.registerIfMissing(method);
        });
    }

    registerDerivedMemberMethods(context, result) {
        if(this.derivedFrom!=null)
            this.derivedFrom.forEach(function(ancestor) {
                this.registerAncestorMemberMethods(ancestor, context, result);
            }, this);
    }

    registerAncestorMemberMethods(ancestor, context, result) {
        const actual = context.getRegisteredDeclaration(ancestor);
        if(!(actual instanceof ConcreteCategoryDeclaration)) {
            return;
        }
        actual.registerMemberMethods(context, result);
    }

    getOperatorMethod(context, operator, type) {
        const methodName = "operator_" + operator.name;
        const methods = this.getMemberMethodsMap(context, methodName);
        if(methods==null)
            return null;
        // find best candidate
        let candidate = null;
        methods.getAll().forEach(method => {
            const potential = method.parameters[0].getType(context);
            if(!potential.isAssignableFrom(context, type))
                return;
            if(candidate==null)
                candidate = method;
            else {
                const currentBest = candidate.parameters[0].getType(context);
                if(potential.isAssignableFrom(context, currentBest))
                    candidate = method;
            }
        });
        return candidate;
    }

    collectCategories(context) {
        const cat_set = {};
        const cat_list = [];
        this.doCollectCategories(context, cat_set, cat_list);
        return cat_list;
    }

    doCollectCategories(context, cat_set, cat_list) {
        if (this.derivedFrom != null) {
            this.derivedFrom.forEach(cat => {
                const decl = context.getRegisteredDeclaration(cat);
                decl.doCollectCategories(context, cat_set, cat_list);
            });
        }
        if(!(this.name in cat_set)) {
            cat_set[this.name] = this.name;
            cat_list.push(this.name);
        }
    }

    declare(transpiler) {
        transpiler.require(equalArrays);
        transpiler.declare(this);
        transpiler = transpiler.newInstanceTranspiler(this.getType(transpiler.context));
        if (this.derivedFrom != null) {
            this.derivedFrom.forEach(cat => {
                const decl = transpiler.context.getRegisteredDeclaration(cat);
                decl.declare(transpiler);
            });
        } else
            this.declareRoot(transpiler);
        if(this.storable)
            transpiler.require($DataStore);
        this.declareMethods(transpiler);
    }

    declareMethods(transpiler) {
        this.methods.filter(decl => !(decl instanceof SetterMethodDeclaration || decl instanceof GetterMethodDeclaration)).forEach(method => {
            const t = transpiler.newChildTranspiler();
            method.declare(t, false);
            t.flush();
        }, this);
    }

    declareRoot(transpiler) {
        transpiler.require($Root);
    }

    ensureDeclarationOrder(context, list, set) {
        if(set.has(this))
            return;
        if (this.derivedFrom != null) {
            this.derivedFrom.forEach(cat => {
                const decl = context.getRegisteredDeclaration(cat);
                decl.ensureDeclarationOrder(context, list, set);
            });
        }
        list.push(this);
        set.add(this);
    }

    transpile(transpiler) {
        this.transpileConstructor(transpiler);
        transpiler = transpiler.newInstanceTranspiler(new CategoryType(this.id));
        this.transpileLoaders(transpiler);
        this.transpileMethods(transpiler);
        this.transpileGetterSetters(transpiler);
        transpiler.flush();
    }

    transpileConstructor(transpiler) {
        transpiler.append("function ").append(this.name).append("(copyFrom, values, mutable) {");
        transpiler.indent();
        const categories = this.collectCategories(transpiler.context);
        if(this.storable) {
            transpiler.append("if(!this.$storable) {").indent()
                .append("var dbIdFactory = { provider: this.getDbId.bind(this), listener: this.setDbId.bind(this) };").newLine()
                .append("this.$storable = $DataStore.instance.newStorableDocument(['").append(categories.join("', '")).append("'], dbIdFactory);").newLine()
                .dedent().append("}").newLine();
        }
        this.transpileGetterSetterAttributes(transpiler);
        this.transpileSuperConstructor(transpiler);
        transpiler.append("this.$categories = [").append(categories.join(', ')).append("];").newLine();
        this.transpileLocalAttributes(transpiler);
        transpiler.append("this.$mutable = mutable;").newLine();
        transpiler.append("return this;");
        transpiler.dedent();
        transpiler.append("}");
        transpiler.newLine();
        const parent = this.derivedFrom && this.derivedFrom.length ? this.derivedFrom[0] : null;
        if(parent)
            transpiler.append(this.name).append(".prototype = Object.create(").append(parent).append(".prototype);").newLine();
        else
            transpiler.append(this.name).append(".prototype = Object.create($Root.prototype);").newLine();
        transpiler.append(this.name).append(".prototype.constructor = ").append(this.name).append(";").newLine();
    }

    transpileLoaders(transpiler) {
        const attributes = this.getLocalAttributes();
        if (attributes) {
            attributes
                .filter(function (attr) {
                    return this.isEnumeratedAttribute(transpiler.context, attr);
                    }, this)
                .forEach(function (attr) {
                        transpiler.append(this.name).append(".prototype.load$").append(attr.name).append(" = function(name) {").indent();
                        transpiler.append("return eval(name);").dedent();
                        transpiler.append("};").newLine();
                    }, this);
            }
    }

    isEnumeratedAttribute(context, attr) {
        let decl = context.getRegisteredDeclaration(attr.name);
        decl = context.getRegisteredDeclaration(decl.type.name);
        return  decl instanceof EnumeratedCategoryDeclaration || decl instanceof EnumeratedNativeDeclaration;
    }

    transpileLocalAttributes(transpiler) {
        const attributes = this.getLocalAttributes();
        if (attributes) {
            transpiler.append("this.$mutable = true;").newLine();
            transpiler.append("values = Object.assign({}, copyFrom, values);").newLine();
            attributes.forEach(function (attr) {
                const isEnum =  this.isEnumeratedAttribute(transpiler.context, attr);
                const decl = transpiler.context.getRegisteredDeclaration(attr.name);
                transpiler.append("this.setMember('")
                        .append(attr.name)
                        .append("', values.hasOwnProperty('")
                        .append(attr.name)
                        .append("') ? values.")
                        .append(attr.name)
                        .append(" : null")
                        .append(", ")
                        .append(decl.storable)
                        .append(", mutable")
                        .append(", ")
                        .append(isEnum)
                        .append(");").newLine();
            }, this);
        }
    }

    transpileSuperConstructor(transpiler) {
        if (this.derivedFrom && this.derivedFrom.length) {
            this.derivedFrom.forEach(derived => {
                transpiler.append(derived).append(".call(this, copyFrom, values, mutable);").newLine();
            });
        } else
            this.transpileRootConstructor(transpiler).newLine();
    }

    transpileRootConstructor(transpiler) {
        return transpiler.append("$Root.call(this);").newLine();
    }

    transpileGetterSetterAttributes(transpiler) {
        const allAttributes = this.getAllAttributes(transpiler.context);
        if(allAttributes) {
            allAttributes.forEach(function (attr) {
                if (this.findGetter(transpiler.context, attr.name) || this.findSetter(transpiler.context, attr.name))
                    transpiler.append("this.$").append(attr.name).append(" = null;").newLine();
            }, this);
        }
    }

    transpileMethods(transpiler) {
        this.methods.filter(decl => !(decl instanceof SetterMethodDeclaration || decl instanceof GetterMethodDeclaration)).forEach(method => {
            const t = transpiler.newChildTranspiler();
            method.transpile(t);
            t.flush();
        }, this);
    }

    transpileGetterSetters(transpiler) {
        const getterSetters = this.methods.filter(decl => decl instanceof SetterMethodDeclaration || decl instanceof GetterMethodDeclaration, this);
        const names = new Set(getterSetters.map(decl => decl.id.name));
        names.forEach(function(name) { this.transpileGetterSetter(transpiler, name); }, this);
    }

    transpileGetterSetter(transpiler, name) {
        const getter = this.findGetter(transpiler.context, name);
        const setter = this.findSetter(transpiler.context, name);
        transpiler.append("Object.defineProperty(").append(this.name).append(".prototype, '").append(name).append("', {").indent();
        transpiler.append("get: function() {").indent();
        if(getter) {
            const t = transpiler.newGetterTranspiler(name);
            getter.transpile(t);
            t.flush();
        } else
            transpiler.append("return this.$").append(name).append(";").newLine();
        transpiler.dedent().append("}");
        transpiler.append(",").newLine();
        transpiler.append("set: function(").append(name).append(") {").indent();
        if(setter) {
            const t = transpiler.newSetterTranspiler(name);
            t.append(name).append(" = (function(").append(name).append(") {").indent();
            setter.transpile(t);
            t.append(";").dedent().append("})(name);").newLine();
            t.flush();
        }
        transpiler.append("this.$").append(name).append(" = ").append(name).append(";").newLine();
        transpiler.dedent().append("}");
        transpiler.dedent().append("});").newLine();
    }

    locateSectionAtLine(line) {
        for(let i=0;i<this.methods.length;i++) {
            const section = this.methods[i].locateSectionAtLine(line);
            if(section !== null)
                return section;
        }
        return null;
    }
}
