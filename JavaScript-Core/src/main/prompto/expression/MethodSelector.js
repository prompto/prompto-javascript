var SingletonCategoryDeclaration = null;
var MethodType = require("../type/MethodType").MethodType;
var SyntaxError = require("../error/SyntaxError").SyntaxError;
var MemberSelector = require("./MemberSelector").MemberSelector;
var NullReferenceError = require("../error/NullReferenceError").NullReferenceError;
var Identifier = require("../grammar/Identifier").Identifier;
var NamedInstance = require("../grammar/NamedInstance").NamedInstance;
var UnresolvedIdentifier = null;
var InstanceExpression = require("./InstanceExpression").InstanceExpression;
var NullValue = require("../value/NullValue").NullValue;
var TypeValue = require("../value/TypeValue").TypeValue;
var ConcreteInstance = require("../value/ConcreteInstance").ConcreteInstance;
var NativeInstance = null;
var TypeType = require("../type/TypeType").TypeType;
var CategoryType = null;
var CategorySymbol = null;
var MethodDeclarationMap = null;


exports.resolve = function() {
	CategoryType = require("../type/CategoryType").CategoryType;
    CategorySymbol = require("./CategorySymbol").CategorySymbol;
    NativeInstance = require("../value/NativeInstance.js").NativeInstance;
    UnresolvedIdentifier = require("./UnresolvedIdentifier").UnresolvedIdentifier;
    SingletonCategoryDeclaration = require("../declaration/SingletonCategoryDeclaration.js").SingletonCategoryDeclaration;
    MethodDeclarationMap = require("../runtime/Context").MethodDeclarationMap;
};

class MethodSelector extends MemberSelector {
  
    constructor(parent, id) {
        super(parent, id);
    }

    toDialect(writer) {
        if(this.parent==null)
            writer.append(this.name);
        else
            super.parentAndMemberToDialect(writer);
    }

    newFullSelector(counter) {
        var name = this.id.name + "$" + counter;
        return new MethodSelector(this.parent, new Identifier(name));
    }

    transpile(transpiler) {
        if(this.parent!=null)
            super.transpile(transpiler);
        else
            transpiler.append(this.name);
    }

    toString() {
        if(this.parent==null) {
            return this.name;
        } else {
            return MemberSelector.prototype.toString.call(this) + "." + this.name;
        }
    }

    getCandidates(context, checkInstance) {
        var decl = this.getMethodInstance(context);
        if(decl!=null)
            return new Set([decl]);
        else if(this.parent===null)
            return this.getGlobalCandidates(context);
        else
            return this.getMemberCandidates(context, checkInstance);
    }

    getMethodInstance(context) {
        var named = context.getRegistered(this.id);
        if (named instanceof NamedInstance) {
            var type = named.getType(context);
            if (type != null) {
                type = type.resolve(context);
                if (type instanceof MethodType)
                    return type.method;
            }
        }
        return null;
    }

    getGlobalCandidates(context) {
        var result = new Set();
        // if called from a member method, could be a member method called without this/self
        var instance = context.getClosestInstanceContext();
        if(instance!=null) {
            var type = instance.instanceType;
            var cd = context.getRegisteredDeclaration(type.name);
            if(cd!=null) {
                var members = cd.getMemberMethodsMap(context, this.name);
                if(members!=null) {
                    members.getAll().forEach(function(method) {
                        result.add(method);
                    });
                }
            }
        }
        var methods = context.getRegisteredDeclaration(this.name);
        if(methods instanceof MethodDeclarationMap) {
            methods.getAll().forEach(function(method) {
                result.add(method);
            });
        }
        return result;
    }

    getMemberCandidates(context, checkInstance) {
        var parentType = this.checkParentType(context, checkInstance);
        var methods = parentType.getMemberMethods(context, this.name);
        return new Set(methods);
    }

    checkParentType(context, checkInstance) {
        if(checkInstance)
            return this.checkParentInstance(context);
        else
            return this.checkParent(context);
    }

    checkParentInstance(context) {
        var id = null;
        if(this.parent instanceof UnresolvedIdentifier)
            id = this.parent.id;
        else if(this.parent instanceof InstanceExpression)
            id = this.parent.id;
        if(id!=null) {
            // don't get Singleton values
            var first = id.name.substring(0, 1);
            if(first.toLowerCase()==first) {
                var value = context.getValue(id);
                if(value!=null && value!=NullValue.instance)
                    return value.type;
            }
        }
        // TODO check result instance
        return this.checkParent(context);
    }

    getCategoryCandidates(context) {
        var parentType = this.checkParent(context);
        if(!(parentType instanceof CategoryType)) {
            throw new SyntaxError(this.parent.toString() + " is not a category");
        }
        var cd = context.getRegisteredDeclaration(parentType.name);
        if(cd===null) {
            throw new SyntaxError("Unknown category:" + parentType.name);
        }
        return cd.getMemberMethods(context, this.name);
    }

    newLocalContext(context, declaration) {
        if(this.parent!=null) {
            return this.newInstanceContext(context);
        } else if(declaration.memberOf!=null) {
            return this.newLocalInstanceContext(context, declaration);
        } else {
            return context.newLocalContext();
        }
    }

    newLocalInstanceContext(context, declaration) {
        var instance = context.getClosestInstanceContext();
        if(instance!=null) {
            var required = declaration.memberOf.getType(context);
            var actual = instance.instanceType;
            if (!required.isAssignableFrom(context, actual))
                instance = null;
        }
        if(instance==null) {
            var declaring = declaration.memberOf.getType(context);
            instance = context.newInstanceContext(declaring, false);
        }
        return instance.newChildContext()
    }

    newLocalCheckContext(context, declaration) {
        if (this.parent != null) {
            return this.newInstanceCheckContext(context);
        } else if(declaration.memberOf!=null) {
            return this.newLocalInstanceContext(context, declaration);
        } else {
            return context.newLocalContext();
        }
    }

    newInstanceCheckContext(context) {
        var type = this.parent.check (context);
        // if calling singleton method, parent is the singleton type
        if(type instanceof TypeType) {
            var decl = context.getRegisteredDeclaration(type.type.id);
            if(decl instanceof SingletonCategoryDeclaration) {
                type = decl.getType(context);
            }
        }
        if (type instanceof CategoryType) {
            decl = context.getRegisteredDeclaration(type.name);
            context = context.newInstanceContext(null, type, decl instanceof SingletonCategoryDeclaration);
            return context.newChildContext();
        } else
            return context.newChildContext();
    }

    newInstanceContext(context) {
        var value = this.parent.interpret(context);
        if(value==null || value==NullValue.instance) {
            throw new NullReferenceError();
        }
        if(value instanceof TypeValue) {
            var type = value.value;
            if(type instanceof CategoryType) {
                var decl = type.getDeclaration(context);
                if(decl instanceof SingletonCategoryDeclaration) {
                    value = context.loadSingleton(value.value);
                }
            }
        }
        if(value instanceof CategorySymbol) {
            value = value.interpret(context);
        }
        if(value instanceof TypeValue) {
            return context.newChildContext();
        } else if(value instanceof ConcreteInstance || value instanceof NativeInstance) {
            context = context.newInstanceContext(value, null);
            return context.newChildContext();
        } else {
            context = context.newBuiltInContext(value);
            return context.newChildContext();
        }
    }
}



exports.MethodSelector = MethodSelector;

