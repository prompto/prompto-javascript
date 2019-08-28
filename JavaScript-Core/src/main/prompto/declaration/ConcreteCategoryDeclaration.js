var CategoryDeclaration = require("./CategoryDeclaration").CategoryDeclaration;
var SetterMethodDeclaration = require("./SetterMethodDeclaration").SetterMethodDeclaration;
var GetterMethodDeclaration = require("./GetterMethodDeclaration").GetterMethodDeclaration;
var MethodDeclarationMap = null;
var ConcreteInstance = require("../value/ConcreteInstance").ConcreteInstance;
var CategoryType = require("../type/CategoryType").CategoryType;
var $DataStore = require("../store/DataStore").$DataStore;
var $Root = require("../intrinsic/$Root").$Root;
var EnumeratedCategoryDeclaration = null;
var EnumeratedNativeDeclaration = null;

exports.resolve = function() {
    MethodDeclarationMap = require("../runtime/Context").MethodDeclarationMap;
    EnumeratedCategoryDeclaration = require("./EnumeratedCategoryDeclaration").EnumeratedCategoryDeclaration;
    EnumeratedNativeDeclaration = require("./EnumeratedNativeDeclaration").EnumeratedNativeDeclaration;
}

function ConcreteCategoryDeclaration(id, attributes, derivedFrom, methods) {
    CategoryDeclaration.call(this, id, attributes);
    this.derivedFrom = derivedFrom || null;
    this.methodsMap = null;
    this.methods = methods || [];
    return this;
}

ConcreteCategoryDeclaration.prototype = Object.create(CategoryDeclaration.prototype);
ConcreteCategoryDeclaration.prototype.constructor = ConcreteCategoryDeclaration;


ConcreteCategoryDeclaration.prototype.isWidget = function(context) {
    if(this.derivedFrom==null || this.derivedFrom.length!=1)
        return false;
    var derived = context.getRegisteredDeclaration(this.derivedFrom[0]);
    return derived.isWidget(context);
};

ConcreteCategoryDeclaration.prototype.toEDialect = function(writer) {
    var hasMethods = this.methods!=null && this.methods.length>0;
    this.protoToEDialect(writer, hasMethods, false); // no bindings
    if(hasMethods)
        this.methodsToEDialect(writer, this.methods);
}

ConcreteCategoryDeclaration.prototype.categoryTypeToEDialect = function(writer) {
    if(this.derivedFrom==null)
        writer.append("category");
    else
        this.derivedFrom.toDialect(writer, true);
};


ConcreteCategoryDeclaration.prototype.toODialect = function(writer) {
    var hasMethods = this.methods!=null && this.methods.length>0;
    this.allToODialect(writer, hasMethods);
};

ConcreteCategoryDeclaration.prototype.categoryTypeToODialect = function(writer) {
    if(this.isWidget(writer.context))
        writer.append("widget");
    else
        writer.append("category");
};


ConcreteCategoryDeclaration.prototype.categoryExtensionToODialect = function(writer) {
    if(this.derivedFrom!=null) {
        writer.append(" extends ");
        this.derivedFrom.toDialect(writer, true);
    }
};


ConcreteCategoryDeclaration.prototype.bodyToODialect = function(writer) {
    this.methodsToODialect (writer, this.methods);
};


ConcreteCategoryDeclaration.prototype.toMDialect = function(writer) {
    this.protoToMDialect(writer, this.derivedFrom);
    this.methodsToMDialect(writer);
};


ConcreteCategoryDeclaration.prototype.categoryTypeToMDialect = function(writer) {
    writer.append("class");
};


ConcreteCategoryDeclaration.prototype.methodsToMDialect = function(writer) {
    writer.indent();
    if(this.methods==null || this.methods.length==0)
        writer.append("pass").newLine();
    else {
        writer.newLine();
        this.methods.forEach(function(method) {
            if(method.comments) {
                method.comments.forEach(function (cmt) {
                    cmt.toDialect(writer);
                });
            }
            if(method.annotations) {
                method.annotations.forEach(function (ann) {
                    ann.toDialect(writer);
                });
            }
            var w = writer.newMemberWriter();
            method.toDialect(w);
            writer.newLine();
        });
    }
    writer.dedent();
};

ConcreteCategoryDeclaration.prototype.hasAttribute = function(context, name) {
    if (CategoryDeclaration.prototype.hasAttribute.call(this, context, name)) {
        return true;
    } else {
        return this.hasDerivedAttribute(context, name);
    }
};

ConcreteCategoryDeclaration.prototype.hasDerivedAttribute = function(context, name) {
    if(this.derivedFrom==null) {
        return false;
    }
    for(var i=0;i<this.derivedFrom.length;i++) {
        var ancestor = this.derivedFrom[i].name;
        if(ConcreteCategoryDeclaration.ancestorHasAttribute(ancestor, context, name)) {
            return true;
        }
    }
    return false;
};

ConcreteCategoryDeclaration.ancestorHasAttribute = function(ancestor, context, name) {
    var actual = context.getRegisteredDeclaration(ancestor);
    if(!(actual instanceof CategoryDeclaration)) {
        return false;
    }
    return actual.hasAttribute(context, name);
};


ConcreteCategoryDeclaration.prototype.hasMethod = function(context, name) {
    this.registerMethods(context);
    if(this.methodsMap[name])
        return true;
    if(this.hasDerivedMethod(context, name))
        return true;
    return false;
};

ConcreteCategoryDeclaration.prototype.hasDerivedMethod = function(context, name) {
    if(this.derivedFrom==null) {
        return false;
    }
    for(var i=0;i<this.derivedFrom.length;i++) {
        var ancestor = this.derivedFrom[i].name;
        if(ConcreteCategoryDeclaration.ancestorHasMethod(ancestor, context, name)) {
            return true;
        }
    }
    return false;
};

ConcreteCategoryDeclaration.ancestorHasMethod = function(ancestor, context, name) {
    var actual = context.getRegisteredDeclaration(ancestor);
    if(!(actual instanceof CategoryDeclaration)) {
        return false;
    }
    return actual.hasMethod(context, name);
};

ConcreteCategoryDeclaration.prototype.check = function(context, isStart) {
    context = context.newInstanceContext(null, this.getType(context), false);
    this.checkDerived(context);
    this.processAnnotations(context, true);
    this.checkMethods(context);
    return CategoryDeclaration.prototype.check.call(this, context, isStart);
}

ConcreteCategoryDeclaration.prototype.checkMethods = function(context) {
    this.registerMethods(context);
    for (var i = 0; i < this.methods.length; i++) {
        this.methods[i].checkChild(context);
    }
};

ConcreteCategoryDeclaration.prototype.registerMethods = function(context) {
    if(this.methodsMap==null) {
        this.methodsMap = {};
        this.methods.forEach(function(method) {
            method.memberOf = this;
            this.registerMethod(method, context);
        }, this);
    }
};


ConcreteCategoryDeclaration.prototype.registerMethod = function(method, context) {
    var actual;
    if(method instanceof SetterMethodDeclaration) {
        var key = "setter:" + method.name;
        actual = this.methodsMap[key] || null;
        if(actual!=null)
            context.problemListener.reportDuplicateSetter(method.id);
        this.methodsMap[key] = method;
    } else if(method instanceof GetterMethodDeclaration) {
        key = "getter:"+method.name;
        actual = this.methodsMap[key] || null;
        if(actual!=null)
            context.problemListener.reportDuplicateGetter(method.id);
        this.methodsMap[key] = method;
    } else {
        key = method.name;
        actual = this.methodsMap[key] || null;
        if(actual==null) {
            actual = new MethodDeclarationMap(method.name);
            this.methodsMap[key] = actual;
        }
        actual.register(method, context.problemListener);
    }
};

ConcreteCategoryDeclaration.prototype.checkDerived = function(context) {
    if(this.derivedFrom!=null) {
        this.derivedFrom.map( function(id) {
            var cd = context.getRegisteredDeclaration(id.name) || null;
            if (cd == null)
                context.problemListener.reportUnknownCategory(id);
            else if(!(cd instanceof CategoryDeclaration))
                context.problemListener.reportInvalidCategory(id);
        });
    }
};

ConcreteCategoryDeclaration.prototype.isDerivedFrom = function(context, categoryType) {
    if(this.derivedFrom==null) {
        return false;
    }
    for(var i=0;i<this.derivedFrom.length;i++) {
        var ancestor = this.derivedFrom[i].name;
        if(ancestor==categoryType.name) {
            return true;
        }
        if(ConcreteCategoryDeclaration.isAncestorDerivedFrom(ancestor,context,categoryType)) {
            return true;
        }
    }
    return false;
};

ConcreteCategoryDeclaration.isAncestorDerivedFrom = function(ancestor, context, categoryType) {
    var actual = context.getRegisteredDeclaration(ancestor);
    if(!(actual instanceof CategoryDeclaration)) {
        return false;
    }
    return actual.isDerivedFrom(context, categoryType);
};

ConcreteCategoryDeclaration.prototype.newInstance = function(context) {
    return new ConcreteInstance(context, this);
};

ConcreteCategoryDeclaration.prototype.getAllAttributes = function(context) {
    var local = CategoryDeclaration.prototype.getAllAttributes.call(this, context) || new Set();
    if(this.derivedFrom!=null) {
        this.derivedFrom.forEach(function (id) {
            var derived = this.getAncestorAttributes(context, id);
            if (derived != null)
                derived.forEach(function(attr) { local.add(attr); }, this);
        }, this);
    }
    return local.size > 0  ? local : null;
};

ConcreteCategoryDeclaration.prototype.getAncestorAttributes = function(context, id) {
    var decl = context.getRegisteredDeclaration(id.name);
    if(decl==null)
        return null;
    else
        return decl.getAllAttributes(context);
};


ConcreteCategoryDeclaration.prototype.findGetter = function(context, attrName) {
    if(this.methodsMap==null) {
        return null;
    }
    var method = this.methodsMap["getter:" + attrName] || null;
    if(method instanceof GetterMethodDeclaration) {
        return method;
    }
    if(method!=null)
        context.problemListener.reportBadGetter(method.id);
    return this.findDerivedGetter(context, attrName);
};

ConcreteCategoryDeclaration.prototype.findDerivedGetter = function(context, attrName) {
    if(this.derivedFrom==null) {
        return null;
    }
    for(var i=0;i<this.derivedFrom;i++) {
        var method = ConcreteCategoryDeclaration.findAncestorGetter(this.derivedFrom[i],context,attrName);
        if(method!=null) {
            return method;
        }
    }
    return null;
}

ConcreteCategoryDeclaration.findAncestorGetter = function(ancestor, context, attrName) {
    var actual = context.getRegisteredDeclaration(ancestor);
    if(!(actual instanceof ConcreteCategoryDeclaration)) {
        return null;
    }
    return actual.findGetter(context, attrName);
};

ConcreteCategoryDeclaration.prototype.findSetter = function(context, attrName) {
    if(this.methodsMap==null) {
        return null;
    }
    var method = this.methodsMap["setter:" + attrName] || null;
    if(method instanceof SetterMethodDeclaration) {
        return method;
    }
    if(method!=null)
        context.problemListener.reportBadSetter(method.id);
    return this.findDerivedSetter(context,attrName);
};

ConcreteCategoryDeclaration.prototype.findDerivedSetter = function(context, attrName) {
    if(this.derivedFrom==null) {
        return null;
    }
    for(var i=0;i<this.derivedFrom;i++) {
        var method = ConcreteCategoryDeclaration.findAncestorSetter(this.derivedFrom[i],context,attrName);
        if(method!=null) {
            return method;
        }
    }
    return null;
};

ConcreteCategoryDeclaration.findAncestorSetter = function(ancestor, context, attrName) {
    var actual = context.getRegisteredDeclaration(ancestor);
    if(!(actual instanceof ConcreteCategoryDeclaration)) {
        return null;
    }
    return actual.findSetter(context, attrName);
};


ConcreteCategoryDeclaration.prototype.getMemberMethodsMap = function(context, name) {
    var methodsMap = new MethodDeclarationMap(name);
    this.registerMemberMethods(context, methodsMap);
    return methodsMap;
};


ConcreteCategoryDeclaration.prototype.registerMemberMethods = function(context, result) {
    this.registerMethods(context);
    this.registerThisMemberMethods(context,result);
    this.registerDerivedMemberMethods(context,result);
};


ConcreteCategoryDeclaration.prototype.registerThisMemberMethods = function(context, result) {
    if(this.methodsMap==null) {
        return;
    }
    var actual = this.methodsMap[result.name] || null;
    if(actual==null) {
        return;
    }
    if(!(actual instanceof MethodDeclarationMap))
        context.problemListener.reportBadMember(actual.id);
    var protos = Object.getOwnPropertyNames(actual.protos);
    protos.forEach(function(proto) {
        var method = actual.protos[proto];
        result.registerIfMissing(method);
    });
};

ConcreteCategoryDeclaration.prototype.registerDerivedMemberMethods = function(context, result) {
    if(this.derivedFrom!=null)
        this.derivedFrom.forEach(function(ancestor) {
            this.registerAncestorMemberMethods(ancestor, context, result);
        }, this);
};

ConcreteCategoryDeclaration.prototype.registerAncestorMemberMethods = function(ancestor, context, result) {
    var actual = context.getRegisteredDeclaration(ancestor);
    if(!(actual instanceof ConcreteCategoryDeclaration)) {
        return;
    }
    actual.registerMemberMethods(context, result);
};


ConcreteCategoryDeclaration.prototype.getOperatorMethod = function(context, operator, type) {
    var methodName = "operator_" + operator.name;
    var methods = this.getMemberMethodsMap(context, methodName);
    if(methods==null)
        return null;
    // find best candidate
    var candidate = null;
    methods.getAll().forEach(function(method) {
        var potential = method.parameters[0].getType(context);
        if(!potential.isAssignableFrom(context, type))
            return;
        if(candidate==null)
            candidate = method;
        else {
            var currentBest = candidate.parameters[0].getType(context);
            if(potential.isAssignableFrom(context, currentBest))
                candidate = method;
        }
    });
    return candidate;
};

ConcreteCategoryDeclaration.prototype.collectCategories = function(context) {
    var cat_set = {};
    var cat_list = [];
    this.doCollectCategories(context, cat_set, cat_list);
    return cat_list;
};

ConcreteCategoryDeclaration.prototype.doCollectCategories = function(context, cat_set, cat_list) {
    if (this.derivedFrom != null) {
        this.derivedFrom.forEach(function (cat) {
            var decl = context.getRegisteredDeclaration(cat);
            decl.doCollectCategories(context, cat_set, cat_list);
        });
    }
    if(!(this.name in cat_set)) {
        cat_set[this.name] = this.name;
        cat_list.push(this.name);
    }
};

ConcreteCategoryDeclaration.prototype.declare = function(transpiler) {
    transpiler.declare(this);
    transpiler = transpiler.newInstanceTranspiler(this.getType(transpiler.context));
    this.processAnnotations(transpiler.context, true);
    if (this.derivedFrom != null) {
        this.derivedFrom.forEach(function (cat) {
            var decl = transpiler.context.getRegisteredDeclaration(cat);
            decl.declare(transpiler);
        });
    } else
        this.declareRoot(transpiler);
    if(this.storable)
        transpiler.require($DataStore);
    this.declareMethods(transpiler);
};


ConcreteCategoryDeclaration.prototype.declareMethods = function(transpiler) {
    this.methods.filter(function (decl) {
        return !(decl instanceof SetterMethodDeclaration || decl instanceof GetterMethodDeclaration);
    }).forEach(function (method) {
        var t = transpiler.newChildTranspiler();
        method.declare(t);
        t.flush();
    }, this);
};

ConcreteCategoryDeclaration.prototype.declareRoot = function(transpiler) {
    transpiler.require($Root);
};


ConcreteCategoryDeclaration.prototype.ensureDeclarationOrder = function(context, list, set) {
    if(set.has(this))
        return;
    if (this.derivedFrom != null) {
        this.derivedFrom.forEach(function (cat) {
            var decl = context.getRegisteredDeclaration(cat);
            decl.ensureDeclarationOrder(context, list, set);
        });
    }
    list.push(this);
    set.add(this);
};

ConcreteCategoryDeclaration.prototype.transpile = function(transpiler) {
    var parent = this.derivedFrom && this.derivedFrom.length ? this.derivedFrom[0] : null;
    transpiler.append("function ").append(this.name).append("(copyFrom, values, mutable) {");
    transpiler.indent();
    var categories = this.collectCategories(transpiler.context);
    if(this.storable)
        transpiler.append("this.storable = $DataStore.instance.newStorableDocument(['").append(categories.join("', '")).append("'],  this.dbIdListener.bind(this));").newLine();
    this.transpileGetterSetterAttributes(transpiler);
    this.transpileSuperConstructor(transpiler);
    transpiler.append("this.category = [").append(categories.join(', ')).append("];").newLine();
    this.transpileLocalAttributes(transpiler);
    transpiler.append("this.mutable = mutable;").newLine();
    transpiler.append("return this;");
    transpiler.dedent();
    transpiler.append("}");
    transpiler.newLine();
    if(parent)
        transpiler.append(this.name).append(".prototype = Object.create(").append(parent).append(".prototype);").newLine();
    else
        transpiler.append(this.name).append(".prototype = Object.create($Root.prototype);").newLine();
    transpiler.append(this.name).append(".prototype.constructor = ").append(this.name).append(";").newLine();
    transpiler = transpiler.newInstanceTranspiler(new CategoryType(this.id));
    this.processAnnotations(transpiler.context);
    this.transpileLoaders(transpiler);
    this.transpileMethods(transpiler);
    this.transpileGetterSetters(transpiler);
    transpiler.flush();
};

ConcreteCategoryDeclaration.prototype.transpileLoaders = function(transpiler) {
    var attributes = this.getLocalAttributes();
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
};

ConcreteCategoryDeclaration.prototype.isEnumeratedAttribute = function(context, attr) {
    var decl = context.getRegisteredDeclaration(attr.name);
    decl = context.getRegisteredDeclaration(decl.type.name);
    return  decl instanceof EnumeratedCategoryDeclaration || decl instanceof EnumeratedNativeDeclaration;
};

ConcreteCategoryDeclaration.prototype.transpileLocalAttributes = function(transpiler) {
    var attributes = this.getLocalAttributes();
    if (attributes) {
        transpiler.append("this.mutable = true;").newLine();
        transpiler.append("values = Object.assign({}, copyFrom, values);").newLine();
        attributes.forEach(function (attr) {
            var isEnum =  this.isEnumeratedAttribute(transpiler.context, attr);
            transpiler.append("this.setMember('").append(attr.name).append("', values.").append(attr.name).append(" || null, mutable, ").append(isEnum).append(");").newLine();
        }, this);
    }
};

ConcreteCategoryDeclaration.prototype.transpileSuperConstructor = function(transpiler) {
    if (this.derivedFrom && this.derivedFrom.length) {
        this.derivedFrom.forEach(function(derived) {
            transpiler.append(derived).append(".call(this, copyFrom, values, mutable);").newLine();
        });
    } else
        this.transpileRootConstructor(transpiler).newLine();
};


ConcreteCategoryDeclaration.prototype.transpileRootConstructor = function(transpiler) {
    return transpiler.append("$Root.call(this);").newLine();
};


ConcreteCategoryDeclaration.prototype.transpileGetterSetterAttributes = function(transpiler) {
    var allAttributes = this.getAllAttributes(transpiler.context);
    if(allAttributes) {
        allAttributes.forEach(function (attr) {
            if (this.findGetter(transpiler.context, attr.name) || this.findSetter(transpiler.context, attr.name))
                transpiler.append("this.$").append(attr.name).append(" = null;").newLine();
        }, this);
    }
};

ConcreteCategoryDeclaration.prototype.transpileMethods = function(transpiler) {
    this.methods.filter(function (decl) {
        return !(decl instanceof SetterMethodDeclaration || decl instanceof GetterMethodDeclaration);
    }).forEach(function (method) {
        var t = transpiler.newChildTranspiler();
        method.transpile(t);
        t.flush();
    }, this);
};

ConcreteCategoryDeclaration.prototype.transpileGetterSetters = function(transpiler) {
    var getterSetters = this.methods.filter(function (decl) {
        return (decl instanceof SetterMethodDeclaration || decl instanceof GetterMethodDeclaration);
    }, this);
    var names = new Set(getterSetters.map(function(decl) { return decl.id.name; }));
    names.forEach(function(name) { this.transpileGetterSetter(transpiler, name); }, this);
};

ConcreteCategoryDeclaration.prototype.transpileGetterSetter = function(transpiler, name) {
    var getter = this.findGetter(transpiler.context, name);
    var setter = this.findSetter(transpiler.context, name);
    transpiler.append("Object.defineProperty(").append(this.name).append(".prototype, '").append(name).append("', {").indent();
    transpiler.append("get: function() {").indent();
    if(getter) {
        var t = transpiler.newGetterTranspiler(name);
        getter.transpile(t);
        t.flush();
    } else
        transpiler.append("return this.$").append(name).append(";").newLine();
    transpiler.dedent().append("}");
    transpiler.append(",").newLine();
    transpiler.append("set: function(").append(name).append(") {").indent();
    if(setter) {
        t = transpiler.newSetterTranspiler(name);
        t.append(name).append(" = (function(").append(name).append(") {").indent();
        setter.transpile(t);
        t.append(";").dedent().append("})(name);").newLine();
        t.flush();
    }
    transpiler.append("this.$").append(name).append(" = ").append(name).append(";").newLine();
    transpiler.dedent().append("}");
    transpiler.dedent().append("});").newLine();
};

ConcreteCategoryDeclaration.prototype.locateSectionAtLine = function(line) {
    for(var i=0;i<this.methods.length;i++) {
        const s = this.methods[i].locateSectionAtLine(line);
        if(s)
            return s;
    }
    return null;
};

exports.ConcreteCategoryDeclaration = ConcreteCategoryDeclaration;
