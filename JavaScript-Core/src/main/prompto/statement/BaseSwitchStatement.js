var BaseStatement = require("./BaseStatement").BaseStatement;
var ObjectList = require("../utils/ObjectList").ObjectList;
var TypeMap = require("../type/TypeMap").TypeMap;
var VoidType = require("../type/VoidType").VoidType;

function BaseSwitchStatement(switchCases, defaultCase) {
	BaseStatement.call(this);
	this.switchCases = switchCases || new SwitchCaseList();
	this.defaultCase = defaultCase || null;
	return this;
}

BaseSwitchStatement.prototype = Object.create(BaseStatement.prototype);
BaseSwitchStatement.prototype.constructor = BaseSwitchStatement;


/*

public void addSwitchCase(SwitchCase switchCase) {
	switchCases.add(switchCase);
}

public void setDefaultCase(StatementList defaultCase) {
	this.defaultCase = defaultCase;
}

*/

BaseSwitchStatement.prototype.check = function(context) {
	this.checkSwitchCasesType(context);
	return this.checkReturnType(context);
};

BaseSwitchStatement.prototype.checkSwitchCasesType = function(context) {
	var type = this.checkSwitchType(context);
	this.switchCases.forEach(function(switchCase) {
        switchCase.checkSwitchType(context, type);
	});
};

BaseSwitchStatement.prototype.checkReturnType = function(context) {
	var types = new TypeMap();
	this.collectReturnTypes(context, types);
	return types.inferType(context);
};

BaseSwitchStatement.prototype.collectReturnTypes = function(context, types) {
    this.switchCases.forEach(function(switchCase) {
		var type = switchCase.checkReturnType(context);
		if(type!=VoidType.instance) {
			types[type.name] = type;
		}
	});
	if(this.defaultCase!=null) {
		var type = this.defaultCase.check(context, null);
		if(type!=VoidType.instance) {
			types[type.name] = type;
		}
	}
};

BaseSwitchStatement.prototype.interpretSwitch = function(context, switchValue, toThrow) {
	for(var i=0;i<this.switchCases.length;i++) {
		var sc = this.switchCases[i];
		if(sc.matches(context, switchValue)) {
			return sc.interpret(context);
		}
	}
	if(this.defaultCase!=null) {
		return this.defaultCase.interpret(context);
	}
	if(toThrow!=null) {
		throw toThrow;
	}
	return null;
}

BaseSwitchStatement.prototype.toDialect = function(writer) {
    writer.toDialect(this);
};


BaseSwitchStatement.prototype.canReturn = function() {
    return true;
};

exports.BaseSwitchStatement = BaseSwitchStatement;

function SwitchCaseList(item) {
	ObjectList.call(this);
	item = item || null;
	if(item!=null) {
		this.add(item);
	}
	return this;
}

SwitchCaseList.prototype = Object.create(ObjectList.prototype);
SwitchCaseList.prototype.constructor = SwitchCaseList;

exports.SwitchCaseList = SwitchCaseList;
