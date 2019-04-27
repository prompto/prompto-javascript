var CategoryType = null;
var ContextualExpression = require("../value/ContextualExpression").ContextualExpression;
var NotStorableError = require("../error/NotStorableError").NotStorableError;
var NotMutableError = require("../error/NotMutableError").NotMutableError;
var StorableDocument = require("../memstore/StorableDocument").StorableDocument;
var ValueExpression = require("../expression/ValueExpression").ValueExpression;
var DecimalType = require("../type/DecimalType").DecimalType;
var Variable = require("../runtime/Variable").Variable;
var Identifier = require("../grammar/Identifier").Identifier;
var Operator = require("../grammar/Operator").Operator;
var NullValue = require("./NullValue").NullValue;
var DecimalValue = require("./DecimalValue").DecimalValue;
var IntegerValue = require("./IntegerValue").IntegerValue;
var TextValue = require("./TextValue").TextValue;
var Instance = require("./Value").Instance;
var DataStore = require("../store/DataStore").DataStore;
var TypeUtils = require("../utils/TypeUtils");
var EnumeratedNativeDeclaration = null;
var EnumeratedCategoryDeclaration = null;

exports.resolve = function() {
	CategoryType = require("../type/CategoryType").CategoryType;
    EnumeratedNativeDeclaration = require("../declaration/EnumeratedNativeDeclaration").EnumeratedNativeDeclaration;
    EnumeratedCategoryDeclaration = require("../declaration/EnumeratedCategoryDeclaration").EnumeratedCategoryDeclaration;
};

function ConcreteInstance(context, declaration) {
    Instance.call(this, new CategoryType(declaration.id));
	this.declaration = declaration;
    this.storable = null;
    if(declaration.storable) {
        var categories = declaration.collectCategories(context);
        this.storable = DataStore.instance.newStorableDocument(categories);
    }
    this.mutable = false;
	this.values = {};
	return this;
}

ConcreteInstance.prototype = Object.create(Instance.prototype);
ConcreteInstance.prototype.constructor = ConcreteInstance;

ConcreteInstance.prototype.toMutable = function() {
    var result = Object.create(this);
    result.type = new CategoryType(this.type.id, true);
    result.mutable = true;
    return result;
};

ConcreteInstance.prototype.getType = function() {
	return this.type;
};

ConcreteInstance.prototype.convertToJavaScript = function() {
    return this; // TODO, until we have a translator
};

ConcreteInstance.prototype.getDbId = function() {
    var dbId = this.values["dbId"] || null;
    return dbId == null ? null : dbId.getStorableData();
};


ConcreteInstance.prototype.getOrCreateDbId = function() {
    var dbId = this.getDbId();
    if(dbId==null) {
        dbId = this.storable.getOrCreateDbId();
        var value = TypeUtils.convertFromJavaScript(dbId);
        this.values["dbId"] = value;
    }
    return dbId;
};


ConcreteInstance.prototype.getStorableData = function() {
    // this is called when storing the instance as a field value
    // if this is an enum then we simply store the symbol name
    if(this.declaration instanceof EnumeratedNativeDeclaration || this.declaration instanceof EnumeratedCategoryDeclaration)
        return this.values["name"].getStorableData()
    // otherwise we just return the dbId, the instance data itself will be collected as part of collectStorables
    if (this.storable == null)
        throw new NotStorableError();
    else
        return this.getOrCreateDbId();
};

ConcreteInstance.prototype.getMemberNames = function() {
	return Object.getOwnPropertyNames(this.values);
};

ConcreteInstance.prototype.collectStorables = function(set) {
    if(this.declaration instanceof EnumeratedNativeDeclaration || this.declaration instanceof EnumeratedCategoryDeclaration)
        return;
    if (this.storable==null)
        throw new NotStorableError();
    if (this.storable.isDirty()) {
        this.getOrCreateDbId();
        set.add(this.storable);
    }
    for(var field in this.values) {
        this.values[field].collectStorables(set);
    }
};

// don't call getters from getters, so register them
// TODO: thread local storage

var activeGetters = {};

function getActiveGetters() {
	return activeGetters;
}

ConcreteInstance.prototype.getMemberValue = function(context, attrName) {
    /* if(typeof(attrName) != typeof(""))
        throw "What?"; */
	var stacked = getActiveGetters()[attrName] || null;
    var first = stacked==null;
    if(first)
        getActiveGetters()[attrName] = context;
	try {
		return this.doGetMember(context, attrName, first);
	} finally {
		if(first) {
			delete getActiveGetters()[attrName];
		}
	}
};

ConcreteInstance.prototype.doGetMember = function(context, attrName, allowGetter) {
    var getter = allowGetter ? this.declaration.findGetter(context, attrName) : null;
    if (getter != null) {
        context = context.newInstanceContext(this, null).newChildContext();
        return getter.interpret(context);
    } else if (this.declaration.hasAttribute(context, attrName) || "dbId" == attrName) {
        return this.values[attrName] || NullValue.instance;
    } else if ("text" == attrName) {
        return new TextValue(this.toString());
    } else
        return NullValue.instance;
};


// don't call setters from setters, so register them

var activeSetters = {};

function getActiveSetters() {
	return activeSetters;
}

ConcreteInstance.prototype.setMember = function(context, attrName, value) {
    /* if(typeof(attrName) != typeof(""))
        throw "What?"; */
    if(!this.mutable)
        throw new NotMutableError();
	var stacked = getActiveSetters()[attrName] || null;
    var first = stacked==null;
    if(first)
        getActiveSetters()[attrName] = context;
	try {
		this.doSetMember(context, attrName, value, first);
	} finally {
		if(first) {
			delete getActiveSetters()[attrName];
		}
	}
};

ConcreteInstance.prototype.doSetMember = function(context, attrName, value, allowSetter) {
    var decl = context.getRegisteredDeclaration(attrName);
	var setter = allowSetter ? this.declaration.findSetter(context,attrName) : null;
	if(setter!=null) {
		// use attribute name as parameter name for incoming value
		context = context.newInstanceContext(this, null).newChildContext();
        var id = new Identifier(attrName);
		context.registerValue(new Variable(id, decl.getType()));
		context.setValue(id, value);
		value = setter.interpret(context);
	}
    value = this.autocast(decl, value);
	this.values[attrName] = value;
    if (this.storable && decl.storable) // TODO convert object graph if(value instanceof IInstance)
        this.storable.setData(attrName, value.getStorableData(), this.getDbId());
};

ConcreteInstance.prototype.autocast = function(decl, value) {
    if(value instanceof IntegerValue && decl.getType()==DecimalType.instance)
        value = new DecimalValue(value.DecimalValue());
    return value;
};

ConcreteInstance.prototype.equals = function(obj) {
	if(obj==this) {
		return true;
	} else if(!(obj instanceof ConcreteInstance)) {
        return false;
    } else if(this.declaration!==obj.declaration) {
	    return false;
	} else {
		var names = Object.getOwnPropertyNames(this.values);
		var otherNames = Object.getOwnPropertyNames(obj.values);
		if(names.length!=otherNames.length) {
			return false;
		}
		for(var i=0;i<names.length;i++) {
			var v1 = this.values[names[i]] || null;
			var v2 = obj.values[names[i]];
			if(v1==v2) {
				continue;
			} else if(v1==null || v2==null) {
				return false;
			} else {
				if(v1.equals) {
					if(!v1.equals(v2)) {
						return false;
					}
				} else if(v2.equals) {
					if(!v2.equals(v1)) {
						return false;
					}
				} else {
					return false;
				}
			}
		}
		return true;
	}
};

ConcreteInstance.prototype.toString = function() {
	var props = [];
	for(p in this.values) {
        if("dbId"!=p)
		    props.push(p + ":" + this.values[p].toString())
	}
	return "{" + props.join(", ") + "}";
};



ConcreteInstance.prototype.Multiply = function(context, value) {
    try {
        return this.interpretOperator(context, value, Operator.MULTIPLY);
    } catch(e) {
        return Value.prototype.Multiply.call(this, context, value);
    }
};


ConcreteInstance.prototype.Divide = function(context, value) {
    try {
        return this.interpretOperator(context, value, Operator.DIVIDE);
    } catch(e) {
        return Value.prototype.Divide.call(this, context, value);
    }
};


ConcreteInstance.prototype.IntDivide = function(context, value) {
    try {
        return this.interpretOperator(context, value, Operator.IDIVIDE);
    } catch(e) {
        return Value.prototype.IntDivide.call(this, context, value);
    }
};


ConcreteInstance.prototype.Modulo = function(context, value) {
    try {
        return this.interpretOperator(context, value, Operator.MODULO);
    } catch(e) {
        return Value.prototype.Modulo.call(this, context, value);
    }
};


ConcreteInstance.prototype.Add = function(context, value) {
    try {
        return this.interpretOperator(context, value, Operator.PLUS);
    } catch(e) {
        return Value.prototype.Add.call(this, context, value);
    }
};


ConcreteInstance.prototype.Subtract = function(context, value) {
    try {
        return this.interpretOperator(context, value, Operator.MINUS);
    } catch(e) {
        return Value.prototype.Subtract.call(this, context, value);
    }
};


ConcreteInstance.prototype.interpretOperator = function(context, value, operator) {
    var decl = this.declaration.getOperatorMethod(context, operator, value.type);
    context = context.newInstanceContext(this);
    var local = context.newChildContext();
    decl.registerArguments(local);
    var arg = decl.args[0];
    local.setValue(arg.id, value);
    return decl.interpret(local);
};

exports.ConcreteInstance = ConcreteInstance;

