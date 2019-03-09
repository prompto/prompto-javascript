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
	var section = this.collectReturnTypes(context, types);
	return types.inferType(context, section);
};

BaseSwitchStatement.prototype.collectReturnTypes = function(context, types) {
	var section = null;
    this.switchCases.forEach(function(switchCase) {
		var type = switchCase.checkReturnType(context);
		if(type!=VoidType.instance) {
            section = switchCase;
			types[type.name] = type;
		}
	});
	if(this.defaultCase!=null) {
		var type = this.defaultCase.check(context, null);
		if(type!=VoidType.instance) {
            section = switchCase;
			types[type.name] = type;
		}
	}
	return section;
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

BaseSwitchStatement.prototype.declareSwitch = function(transpiler) {
    this.switchCases.forEach(function(kase) {
        kase.declare(transpiler);
    });
    if(this.defaultCase!=null) {
        this.defaultCase.declare(transpiler);
    }
}


BaseSwitchStatement.prototype.toDialect = function(writer) {
    writer.toDialect(this);
};


BaseSwitchStatement.prototype.canReturn = function() {
    return true;
};


BaseSwitchStatement.prototype.locateSectionAtLine = function(line) {
    return this.switchCases.locateSectionAtLine(line) || (this.defaultCase ? this.defaultCase.locateSectionAtLine(line) : null) || this;
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


SwitchCaseList.prototype.locateSectionAtLine = function(line) {
    for(var i=0; i< this.length; i++) {
        const switchCase = this[i];
        const section = switchCase.locateSectionAtLine(line);
        if(section)
            return section;
    }
    return null;
};


exports.SwitchCaseList = SwitchCaseList;
