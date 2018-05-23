var UnresolvedIdentifier = require("../expression/UnresolvedIdentifier").UnresolvedIdentifier;
var Identifier = require("../grammar/Identifier").Identifier;
var ArgumentAssignmentList = null;
var ArgumentAssignment = null;
var CategoryDeclaration = null;
var ConcreteCategoryDeclaration = null;
var SingletonCategoryDeclaration = null;
var EnumeratedNativeDeclaration = null;
var EnumeratedCategoryDeclaration = null;
var ExpressionValue = require("../value/ExpressionValue").ExpressionValue;
var Operator = require("../grammar/Operator").Operator;
var BaseType = require("./BaseType").BaseType;
var NullType = require("./NullType").NullType;
var TextType = require("./TextType").TextType;
var AnyType = require("./AnyType").AnyType;
var MissingType = require("./MissingType").MissingType;
var PromptoError = require("../error/PromptoError").PromptoError;
var SyntaxError = require("../error/SyntaxError").SyntaxError;
var MethodCall = require("../statement/MethodCall").MethodCall;
var MethodSelector = require("../expression/MethodSelector").MethodSelector;
var MethodFinder = require("../runtime/MethodFinder").MethodFinder;
var DataStore = require("../store/DataStore").DataStore;
var Variable = require("../runtime/Variable").Variable;
var Score = require("../runtime/Score").Score;

exports.resolve = function() {
	ArgumentAssignmentList = require("../grammar/ArgumentAssignmentList").ArgumentAssignmentList;
	ArgumentAssignment = require("../grammar/ArgumentAssignment").ArgumentAssignment;
    CategoryDeclaration = require("../declaration/CategoryDeclaration").CategoryDeclaration;
    ConcreteCategoryDeclaration = require("../declaration/ConcreteCategoryDeclaration").ConcreteCategoryDeclaration;
    SingletonCategoryDeclaration = require("../declaration/SingletonCategoryDeclaration").SingletonCategoryDeclaration;
    EnumeratedNativeDeclaration = require("../declaration/EnumeratedNativeDeclaration").EnumeratedNativeDeclaration;
    EnumeratedCategoryDeclaration = require("../declaration/EnumeratedCategoryDeclaration").EnumeratedCategoryDeclaration;
};


function CategoryType(id) {
	BaseType.call(this, id);
    this.mutable = false;
	return this;
}

CategoryType.prototype = Object.create(BaseType.prototype);
CategoryType.prototype.constructor =  CategoryType;

/*
	
	public Class<?> toJavaClass() {
		// TODO Auto-generated method stub
		return null;
	}
*/

CategoryType.prototype.toDialect = function(writer) {
    if (this.mutable)
        writer.append("mutable ");
    writer.append(this.name);
};


CategoryType.prototype.declare = function(transpiler) {
    var decl = this.getDeclaration(transpiler.context);
    decl.declare(transpiler);
};

CategoryType.prototype.transpile = function(transpiler) {
    transpiler.append(this.name);
};


CategoryType.prototype.transpileInstance = function(transpiler) {
    var decl = this.getDeclaration(transpiler.context);
    if(decl instanceof SingletonCategoryDeclaration)
        transpiler.append(this.name).append(".instance");
    else
        transpiler.append("this");
};

CategoryType.prototype.newInstanceFromStored = function(context, stored) {
    var decl = this.getDeclaration(context);
    var inst = decl.newInstanceFromStored(context, stored);
    inst.mutable = this.mutable;
    return inst;
};

CategoryType.prototype.equals = function(obj) {
	if(obj===this) {
		return true;
	}
	if(obj===null) {
		return false;
	}
	if(!(obj instanceof CategoryType)) {
		return false;
	}
	return this.name===obj.name;
};

CategoryType.prototype.checkUnique = function(context) {
	var actual = context.getRegisteredDeclaration(this.name) || null;
	if(actual!=null) {
		throw new SyntaxError("Duplicate name: \"" + this.name + "\"");
	}
};

CategoryType.prototype.getDeclaration = function(context) {
	var decl = context.getRegisteredDeclaration(this.name) || null;
	if(decl==null) {
        if(context.problemListener)
            context.problemListener.reportUnknownCategory(this.id);
        else
		    throw new SyntaxError("Unknown category: \"" + this.name + "\"");
	}
	return decl;
};


CategoryType.prototype.checkMultiply = function(context, other, tryReverse) {
    var type = this.checkOperator(context, other, tryReverse, Operator.MULTIPLY);
    if(type!=null)
        return type;
    else
        return BaseType.prototype.checkMultiply.call(this, context, other, tryReverse);
}


CategoryType.prototype.declareMultiply = function(transpiler, other, tryReverse, left, right) {
    var type = this.checkOperator(transpiler.context, other, tryReverse, Operator.MULTIPLY);
    if(type!=null) {
        left.declare(transpiler);
        right.declare(transpiler);
        type.declare(transpiler);
    } else
        return NativeType.prototype.declareMultiply.call(this, transpiler, other, tryReverse, left, right);
};


CategoryType.prototype.transpileMultiply = function(transpiler, other, tryReverse, left, right) {
    var type = this.checkOperator(transpiler.context, other, tryReverse, Operator.MULTIPLY);
    if(type!=null) {
        left.transpile(transpiler);
        transpiler.append(".operator_MULTIPLY(");
        right.transpile(transpiler);
        transpiler.append(")");
    } else
        return NativeType.prototype.transpileMultiply.call(this, context, other, tryReverse, left, right);

};


CategoryType.prototype.checkDivide = function(context, other) {
    var type = this.checkOperator(context, other, false, Operator.DIVIDE);
    if(type!=null)
        return type;
    else
        return BaseType.prototype.checkDivide.call(this, context, other);
}


CategoryType.prototype.declareDivide = function(transpiler, other, left, right) {
    var type = this.checkOperator(transpiler.context, other, false, Operator.DIVIDE);
    if(type!=null) {
        left.declare(transpiler);
        right.declare(transpiler);
        type.declare(transpiler);
    } else
        return NativeType.prototype.declareDivide.call(this, context, other, left, right);
};


CategoryType.prototype.transpileDivide = function(transpiler, other, left, right) {
    left.transpile(transpiler);
    transpiler.append(".operator_DIVIDE(");
    right.transpile(transpiler);
    transpiler.append(")");
};



CategoryType.prototype.checkIntDivide = function(context, other) {
    var type = this.checkOperator(context, other, false, Operator.IDIVIDE);
    if(type!=null)
        return type;
    else
        return BaseType.prototype.checkIntDivide.call(this, context, other);
}

CategoryType.prototype.declareIntDivide = function(transpiler, other, left, right) {
    var type = this.checkOperator(transpiler.context, other, false, Operator.IDIVIDE);
    if(type!=null) {
        left.declare(transpiler);
        right.declare(transpiler);
        type.declare(transpiler);
    } else
        return NativeType.prototype.declareDivide.call(this, context, other, left, right);
};


CategoryType.prototype.transpileIntDivide = function(transpiler, other, left, right) {
    left.transpile(transpiler);
    transpiler.append(".operator_IDIVIDE(");
    right.transpile(transpiler);
    transpiler.append(")");
};


CategoryType.prototype.checkModulo = function(context, other) {
    var type = this.checkOperator(context, other, false, Operator.MODULO);
    if(type!=null)
        return type;
    else
        return BaseType.prototype.checkModulo.call(this, context, other);
}


CategoryType.prototype.declareModulo = function(transpiler, other, left, right) {
    var type = this.checkOperator(transpiler.context, other, false, Operator.MODULO);
    if(type!=null) {
        left.declare(transpiler);
        right.declare(transpiler);
        type.declare(transpiler);
    } else
        return NativeType.prototype.declareModulo.call(this, context, other, left, right);
};


CategoryType.prototype.transpileModulo = function(transpiler, other, left, right) {
    left.transpile(transpiler);
    transpiler.append(".operator_MODULO(");
    right.transpile(transpiler);
    transpiler.append(")");
};


CategoryType.prototype.checkAdd = function(context, other, tryReverse) {
    var type = this.checkOperator(context, other, tryReverse, Operator.PLUS);
    if(type!=null)
        return type;
    else
        return BaseType.prototype.checkAdd.call(this, context, other, tryReverse);
}


CategoryType.prototype.declareAdd = function(transpiler, other, tryReverse, left, right) {
    var type = this.checkOperator(transpiler.context, other, tryReverse, Operator.PLUS);
    if(type!=null) {
        left.declare(transpiler);
        right.declare(transpiler);
        type.declare(transpiler);
    } else
        return BaseType.prototype.declareAdd.call(this, transpiler, other, tryReverse, left, right);
};

CategoryType.prototype.transpileAdd = function(transpiler, other, tryReverse, left, right) {
    left.transpile(transpiler);
    transpiler.append(".operator_PLUS(");
    right.transpile(transpiler);
    transpiler.append(")");
};


CategoryType.prototype.checkSubtract = function(context, other) {
    var type = this.checkOperator(context, other, false, Operator.MINUS);
    if(type!=null)
        return type;
    else
        return BaseType.prototype.checkSubtract.call(this, context, other);
}


CategoryType.prototype.declareSubtract = function(transpiler, other, left, right) {
    var type = this.checkOperator(transpiler.context, other, false, Operator.MINUS);
    if(type!=null) {
        left.declare(transpiler);
        right.declare(transpiler);
        type.declare(transpiler);
    } else
        return NativeType.prototype.declareDivide.call(this, context, other, left, right);
};


CategoryType.prototype.transpileSubtract = function(transpiler, other, left, right) {
    left.transpile(transpiler);
    transpiler.append(".operator_MINUS(");
    right.transpile(transpiler);
    transpiler.append(")");
};



CategoryType.prototype.checkOperator = function(context, other, tryReverse, operator) {
    var actual = this.getDeclaration(context);
    if(actual instanceof ConcreteCategoryDeclaration) try {
        var method = actual.getOperatorMethod(context, operator, other);
        if(method==null)
            return null;
        context = context.newInstanceContext(null, this);
        var local = context.newLocalContext();
        method.registerArguments(local);
        return method.check(local);
    } catch(e) {
        // ok to pass, will try reverse
    }
    if(tryReverse)
        return null;
    else
        throw new SyntaxError("Unsupported operation: " + this.name + " " + operator.token + " " + other.name);
};



CategoryType.prototype.checkExists = function(context) {
	this.getDeclaration(context);
};

CategoryType.prototype.checkMember = function(context, name) {
    var cd = context.getRegisteredDeclaration(this.name);
    if (cd == null) {
        throw new SyntaxError("Unknown category:" + this.name);
    }
    if (cd instanceof EnumeratedNativeDeclaration) {
        cd.getType(context).checkMember(context, name);
    } else if (cd instanceof CategoryDeclaration) {
        if (cd.hasAttribute(context, name)) {
            var ad = context.getRegisteredDeclaration(name);
            if (ad == null) {
                throw new SyntaxError("Unknown attribute:" + name);
            }
            return ad.getType(context);
        } else if ("text" == name.toString()) {
            return TextType.instance
        } else {
            throw new SyntaxError("No attribute:" + name + " in category:" + this.name);
        }
	} else {
        throw new SyntaxError("Not a category:" + this.name);
    }
};

CategoryType.prototype.declareMember = function(transpiler, name) {
    // TODO visit attributes
};


CategoryType.prototype.transpileMember = function(transpiler, name) {
    if ("text" == name)
        transpiler.append("toString()");
    else
        transpiler.append(name);
};

CategoryType.prototype.isAssignableFrom = function(context, other) {
    return BaseType.prototype.isAssignableFrom.call(this, context, other)
        || ((other instanceof CategoryType) && this.isAssignableFromCategory(context, other));
};



CategoryType.prototype.isAssignableFromCategory = function(context, other) {
    return other.isDerivedFrom(context, this)
        || other.isDerivedFromAnonymous(context, this);
};



CategoryType.prototype.isDerivedFrom = function(context, other) {
    try {
        var thisDecl = this.getDeclaration(context);
        if (thisDecl instanceof CategoryDeclaration)
            return this.isDerivedFromCategory(context, thisDecl, other);
    } catch (e) {
    }
    return false; // TODO
};



CategoryType.prototype.isDerivedFromCategory = function(context, decl, other) {
    if(decl.derivedFrom==null) {
        return false;
    }
    for(var i=0;i<decl.derivedFrom.length; i++) {
        var ct = new CategoryType(decl.derivedFrom[i]);
        if (ct.equals(other) || ct.isDerivedFrom(context, other)) {
            return true;
        }
    }
    return false;
};


CategoryType.prototype.isDerivedFromAnonymous = function(context, other) {
    if (!(other instanceof CategoryType) || !other.isAnonymous())
        return false;
    try {
        var thisDecl = this.getDeclaration(context);
        if (thisDecl instanceof CategoryDeclaration) {
            var otherDecl = other.getDeclaration(context);
            if (otherDecl instanceof CategoryDeclaration)
                return this.isDerivedFromAnonymousCategory(context, thisDecl, otherDecl);
        }
    } catch (e) {
        if (e instanceof SyntaxError) {
            return false;
        } else {
            throw e;
        }
    }
};

CategoryType.prototype.isDerivedFromAnonymousCategory = function(context, thisDecl, otherDecl) {
    // an anonymous category extends 1 and only 1 category
    var baseId = otherDecl.derivedFrom[0];
    // check we derive from root category (if not extending 'Any')
    if("any"!=baseId.name && !thisDecl.isDerivedFrom(context,new CategoryType(baseId)))
        return false;
    var allAttributes = otherDecl.getAllAttributes(context);
    for(var attr of allAttributes) {
        if(!thisDecl.hasAttribute(context, attr.name)) {
            return false;
        }
    }
    return true;
};

CategoryType.prototype.isAnonymous = function() {
	return this.name[0]==this.name[0].toLowerCase(); // since it's the name of the argument
}

CategoryType.prototype.isMoreSpecificThan = function(context, other) {
    if(other instanceof NullType || other instanceof AnyType || other instanceof MissingType)
        return true;
	if(!(other instanceof CategoryType)) {
		return false;
	}
	if(other.isAnonymous()) {
		return true;
	}
	var thisDecl = context.getRegisteredDeclaration(this.name);
	if(thisDecl.isDerivedFrom(context, other)) {
		return true;
	} else {
		return false;
	}
};

CategoryType.prototype.scoreMostSpecific = function(context, t1, t2) {
	if(t1.equals(t2)) {
		return Score.SIMILAR;
	} else if(this.equals(t1)) {
		return Score.BETTER;
	} else  if(this.equals(t2)) {
		return Score.WORSE;
	}
	// since this derives from both t1 and t2, return the most specific of t1 and t2
	if(t1.isMoreSpecificThan(context,t2)) {
		return Score.BETTER;
	} else if(t2.isMoreSpecificThan(context,t1)) {
		return Score.WORSE;
	} else {
		return Score.SIMILAR;
	} // should never happen
};


CategoryType.prototype.newInstance = function(context) {
	var decl = context.getRegisteredDeclaration(this.name);
	return decl.newInstance(context);
};


CategoryType.prototype.sort = function(context, list, desc, key) {
	if (list.size() <= 1) {
		return list;
	}
	key = key || null;
	if (key == null) {
		key = new UnresolvedIdentifier(new Identifier("key"));
	}
	var keyname = key.toString();
	var decl = this.getDeclaration(context);
	if (decl.hasAttribute(context, keyname)) {
		return this.sortByAttribute(context, list, desc, keyname);
	} else if (decl.hasMethod(context, keyname, null)) {
		return this.sortByClassMethod(context, list, desc, keyname);
	} else {
		var method = this.findGlobalMethod(context, keyname);
		if(method!=null) {
			return this.sortByGlobalMethod(context, list, desc, method);
		} else {
			return this.sortByExpression(context, list, desc, key);
		}
	}
};

CategoryType.prototype.sortByExpression = function(context, list, desc, key) {

	function cmp(o1, o2) {
		var co = context.newInstanceContext(o1, null);
		var key1 = key.interpret(co);
		co = context.newInstanceContext(o2, null);
		var key2 = key.interpret(co);
		return compareKeys(key1, key2);
	}
	return BaseType.prototype.doSort(context, list, cmp, desc);
};

CategoryType.prototype.sortByAttribute = function(context, list, desc, name) {

	function cmp(o1, o2) {
		var key1 = o1.getMemberValue(context, name);
		var key2 = o2.getMemberValue(context, name);
		return compareKeys(key1,key2);
	}

	return BaseType.prototype.doSort(context, list, cmp, desc);
};



CategoryType.prototype.getMemberMethods = function(context, name) {
    var cd = this.getDeclaration(context);
    if (!(cd instanceof ConcreteCategoryDeclaration))
        throw new SyntaxError("Unknown category:" + this.name);
    else
        return cd.getMemberMethods(context, name)
};



/* look for a method which takes this category as sole parameter */
CategoryType.prototype.findGlobalMethod = function(context, name, returnDecl) {
	try {
		var exp = new ExpressionValue(this, this.newInstance(context));
		var arg = new ArgumentAssignment(null, exp);
		var args = new ArgumentAssignmentList(null, arg);
		var proto = new MethodCall(new MethodSelector(null, new Identifier(name)), args);
		var finder = new MethodFinder(context, proto);
		var decl = finder.findMethod(true);
		return decl==null ? null : returnDecl ? decl : proto;
	} catch (e) {
		if(e instanceof PromptoError) {
			return null;
		} else {
			throw e;
		}
	}
};

CategoryType.prototype.sortByGlobalMethod = function(context, list, desc, method) {
	var type = this;
	function cmp(o1, o2) {
		var assignment = method.assignments[0];
		assignment._expression = new ExpressionValue(type, o1);
		var key1 = method.interpret(context);
		assignment._expression = new ExpressionValue(type, o2);
		var key2 = method.interpret(context);
		return compareKeys(key1, key2);
	}

	return BaseType.prototype.doSort(context, list, cmp, desc);
};


function compareKeys(key1, key2) {
	if(key1==null && key2==null) {
		return 0;
	} else if(key1==null) {
		return -1;
	} else if(key2==null) {
		return 1;
	} else if(key1.compareTo) {
		return key1.compareTo(key2);
	} else if(key2.compareTo) {
		return -key2.compareTo(key1);
	} else {
		var s1 = key1.toString();
		var s2 = key2.toString();
		return s1 > s2 ? 1 : s1 == s2 ? 0 : -1;
	}
};

CategoryType.prototype.convertJavaScriptValueToPromptoValue = function(context, value, returnType) {
    var decl = this.getDeclaration(context)
    if (decl == null)
        return BaseType.prototype.convertPythonValueToPromptoValue(context, value, returnType);
    if(decl instanceof EnumeratedNativeDeclaration || decl instanceof EnumeratedCategoryDeclaration)
        return this.loadEnumValue(context, decl, value);
    if (DataStore.instance.isDbIdType(typeof(value)))
        value = DataStore.instance.fetchUnique(value);
    return decl.newInstanceFromStored(context, value);
};


CategoryType.prototype.loadEnumValue = function(context, value, name) {
    return context.getRegisteredValue(name);
};


CategoryType.prototype.declareSorted = function(transpiler, key) {
    var keyname = key ? key.toString() : "key";
    var decl = this.getDeclaration(transpiler.context);
    if (decl.hasAttribute(transpiler.context, keyname) || decl.hasMethod(transpiler.context, keyname, null)) {
        return
    } else {
        var decl = this.findGlobalMethod(transpiler.context, keyname, true);
        if (decl != null) {
            decl.declare(transpiler);
        } else {
            key.declare(transpiler);
        }
    }
};

CategoryType.prototype.transpileSorted = function(transpiler, desc, key) {
    var keyname = key ? key.toString() : "key";
    var decl = this.getDeclaration(transpiler.context);
    if (decl.hasAttribute(transpiler.context, keyname)) {
        this.transpileSortedByAttribute(transpiler, desc, key);
    } else if (decl.hasMethod(transpiler.context, keyname, null)) {
        this.transpileSortedByClassMethod(transpiler, desc, key);
    } else {
        var decl = this.findGlobalMethod(transpiler.context, keyname);
        if (decl != null) {
            this.transpileSortedByGlobalMethod(transpiler, desc, keyname);
        } else {
            this.transpileSortedByExpression(transpiler, desc, key);
        }
    }
};


CategoryType.prototype.transpileSortedByExpression = function(transpiler, desc, key) {
    this.transpileSortedByAttribute(transpiler, desc, key);
};


CategoryType.prototype.transpileSortedByAttribute = function(transpiler, desc, key) {
    key = key || new Variable(new Identifier("key"), TextType.instance);
    transpiler.append("function(o1, o2) { return ");
    this.transpileEqualKeys(transpiler, key);
    transpiler.append(" ? 0 : ");
    this.transpileGreaterKeys(transpiler, key);
    transpiler.append(" ? ");
    if(desc)
        transpiler.append("-1 : 1; }");
    else
        transpiler.append("1 : -1; }");
};


CategoryType.prototype.transpileEqualKeys = function(transpiler, key) {
    transpiler.append("o1.");
    key.transpile(transpiler);
    transpiler.append(" === o2.");
    key.transpile(transpiler);
};


CategoryType.prototype.transpileGreaterKeys = function(transpiler, key) {
    transpiler.append("o1.");
    key.transpile(transpiler);
    transpiler.append(" > o2.");
    key.transpile(transpiler);
};


CategoryType.prototype.transpileSortedByGlobalMethod = function(transpiler, desc, name) {
    transpiler.append("function(o1, o2) { return ")
        .append(name).append("(o1) === ").append(name).append("(o2)").append(" ? 0 : ")
        .append(name).append("(o1) > ").append(name).append("(o2)").append(" ? ");
    if(desc)
        transpiler.append("-1 : 1; }");
    else
        transpiler.append("1 : -1; }");
};

CategoryType.prototype.transpileAssignMemberValue = function(transpiler, name, expression) {
    transpiler.append(".setMember('").append(name).append("', ");
    expression.transpile(transpiler);
    transpiler.append(")");
};


exports.CategoryType = CategoryType;