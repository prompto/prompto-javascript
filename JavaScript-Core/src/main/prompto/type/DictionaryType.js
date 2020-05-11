var Identifier = require("../grammar/Identifier").Identifier;
var ContainerType = require("./ContainerType").ContainerType;
var BooleanType = require("./BooleanType").BooleanType;
var IntegerType = require("./IntegerType").IntegerType;
var TextType = require("./TextType").TextType;
var SetType = require("./SetType").SetType;
var ListType = require("./ListType").ListType;
var EntryType = require("./EntryType").EntryType;
var List = require("../intrinsic/List").List;
var StrictSet = require("../intrinsic/StrictSet").StrictSet;
var Dictionary = require("../intrinsic/Dictionary").Dictionary;
var BuiltInMethodDeclaration = null;

exports.resolve = function() {
    resolveBuiltInMethodDeclaration();
};

function DictionaryType(itemType) {
    ContainerType.call(this, new Identifier(itemType.name + "<:>"), itemType);
    this.itemType = itemType;
    return this;
}

DictionaryType.prototype = Object.create(ContainerType.prototype);
DictionaryType.prototype.constructor = DictionaryType;


DictionaryType.prototype.withItemType = function(itemType) {
    return new DictionaryType(itemType);
};


DictionaryType.prototype.getTranspiledName = function(context) {
    return this.itemType.getTranspiledName(context) + "_dict";
};


DictionaryType.prototype.declare = function(transpiler) {
    transpiler.require(Dictionary);
};

DictionaryType.prototype.isAssignableFrom = function(context, other) {
    return ContainerType.prototype.isAssignableFrom.call(this, context, other)
        || ((other instanceof DictionaryType) && this.itemType.isAssignableFrom(context, other.itemType));
};


DictionaryType.prototype.equals = function(obj) {
    if (obj == null) {
        return false;
    } else if (obj == this) {
        return true;
    } else if (!(obj instanceof DictionaryType)) {
        return false;
    } else {
        return this.itemType.equals(obj.itemType);
    }
};



DictionaryType.prototype.checkAdd = function(context, other, tryReverse) {
    if(other instanceof DictionaryType && this.itemType.equals(other.itemType)) {
        return this;
    } else {
        return ContainerType.prototype.checkAdd.call(this, context, other, tryReverse);
    }
};


DictionaryType.prototype.declareAdd = function(transpiler, other, tryReverse, left, right) {
    if(other instanceof DictionaryType && this.itemType.equals(other.itemType)) {
        left.declare(transpiler);
        right.declare(transpiler);
    } else {
        return ContainerType.prototype.declareAdd.call(this, transpiler, other, tryReverse, left, right);
    }
};


DictionaryType.prototype.transpileAdd = function(transpiler, other, tryReverse, left, right) {
    if(other instanceof DictionaryType && this.itemType.equals(other.itemType)) {
        left.transpile(transpiler);
        transpiler.append(".add(");
        right.transpile(transpiler);
        transpiler.append(")");
    } else {
        return ContainerType.prototype.transpileAdd.call(this, transpiler, other, tryReverse, left, right);
    }
};



DictionaryType.prototype.checkContains = function(context, section, other) {
    if(other==TextType.instance) {
        return BooleanType.instance;
    } else {
        return ContainerType.prototype.checkContains.call(this, context, other);
    }
};


DictionaryType.prototype.declareContains = function(transpiler, other, container, item) {
    transpiler.require(StrictSet);
    container.declare(transpiler);
    item.declare(transpiler);
};


DictionaryType.prototype.transpileContains = function(transpiler, other, container, item) {
    container.transpile(transpiler);
    transpiler.append(".has(");
    item.transpile(transpiler);
    transpiler.append(")");
};


DictionaryType.prototype.checkContainsAllOrAny = function(context, other) {
    return BooleanType.instance;
};


DictionaryType.prototype.declareContainsAllOrAny = function(transpiler, other, container, items) {
    transpiler.require(StrictSet);
    container.declare(transpiler);
    items.declare(transpiler);
};


DictionaryType.prototype.transpileContainsAll = function(transpiler, other, container, items) {
    container.transpile(transpiler);
    transpiler.append(".hasAll(");
    items.transpile(transpiler);
    transpiler.append(")");
};

DictionaryType.prototype.transpileContainsAny = function(transpiler, other, container, items) {
    container.transpile(transpiler);
    transpiler.append(".hasAny(");
    items.transpile(transpiler);
    transpiler.append(")");
};


DictionaryType.prototype.checkItem = function(context, other, expression) {
    if(other==TextType.instance) {
        return this.itemType;
    } else {
        return ContainerType.prototype.checkItem.call(this, context, other, expression);
    }
};

DictionaryType.prototype.declareItem = function(transpiler, itemType, item) {
    // nothing to do
};


DictionaryType.prototype.transpileItem = function(transpiler, itemType, item) {
    transpiler.append(".item(");
    item.transpile(transpiler);
    transpiler.append(")");
};


DictionaryType.prototype.transpileAssignItemValue = function(transpiler, item, expression) {
    transpiler.append(".setItem(");
    item.transpile(transpiler);
    transpiler.append(", ");
    expression.transpile(transpiler);
    transpiler.append(")");
};


DictionaryType.prototype.checkIterator = function(context, source) {
    return new EntryType(this.itemType);
};

DictionaryType.prototype.checkMember = function(context, section, name) {
    if ("count"==name) {
        return IntegerType.instance;
    } else if("keys"==name) {
        return new SetType(TextType.instance);
    } else if ("values"==name) {
        return new ListType(this.itemType);
    } else {
        return ContainerType.prototype.checkMember.call(this, context, section, name);
    }
};


DictionaryType.prototype.declareMember = function(transpiler, section, name) {
    if("keys"===name) {
        transpiler.require(StrictSet);
    } else if("values"==name) {
        transpiler.require(List);
    } else if ("count"!==name) {
        ContainerType.prototype.declareMember.call(this, transpiler, section, name);
    }
};


DictionaryType.prototype.transpileMember = function(transpiler, name) {
    if ("count"===name) {
        transpiler.append("length");
    } else if("keys"===name || "values"==name) {
        transpiler.append(name);
    } else {
        ContainerType.prototype.transpileMember.call(this, transpiler, name);
    }
};


DictionaryType.prototype.getMemberMethods = function(context, name) {
    if (name === "swap" )
        return [new SwapMethodDeclaration()];
     else
        return ContainerType.prototype.getMemberMethods.call(context, name);
};


function SwapMethodDeclaration() {
    BuiltInMethodDeclaration.call(this, "swap");
    return this;
}


function resolveBuiltInMethodDeclaration() {
    BuiltInMethodDeclaration = require("../declaration/BuiltInMethodDeclaration").BuiltInMethodDeclaration;

    SwapMethodDeclaration.prototype = Object.create(BuiltInMethodDeclaration.prototype);
    SwapMethodDeclaration.prototype.constructor = SwapMethodDeclaration;

    SwapMethodDeclaration.prototype.interpret = function (context) {
        var value = this.getValue(context);
        return value.swap(context);
    };

    SwapMethodDeclaration.prototype.check = function (context) {
        return new DictionaryType(TextType.instance);
    };

    SwapMethodDeclaration.prototype.transpileCall = function (transpiler, assignments) {
        transpiler.append("swap()");
    };
}

exports.DictionaryType = DictionaryType;
