var BaseStatement = require("./BaseStatement").BaseStatement;
var ObjectList = require("../utils/ObjectList").ObjectList;
var TypeMap = require("../type/TypeMap").TypeMap;
var VoidType = require("../type/VoidType").VoidType;

class BaseSwitchStatement extends BaseStatement {
    constructor(switchCases, defaultCase) {
        super();
        this.switchCases = switchCases || new SwitchCaseList();
        this.defaultCase = defaultCase || null;
        return this;
    }

    /*

    public void addSwitchCase(SwitchCase switchCase) {
        switchCases.add(switchCase);
    }

    public void setDefaultCase(StatementList defaultCase) {
        this.defaultCase = defaultCase;
    }

    */

    check(context) {
        this.checkSwitchCasesType(context);
        return this.checkReturnType(context);
    }

    checkSwitchCasesType(context) {
        var type = this.checkSwitchType(context);
        this.switchCases.forEach(switchCase => {
            switchCase.checkSwitchType(context, type);
        });
    }

    checkReturnType(context) {
        var types = new TypeMap();
        var section = this.collectReturnTypes(context, types);
        return types.inferType(context, section);
    }

    collectReturnTypes(context, types) {
        var section = null;
        this.switchCases.forEach(switchCase => {
            var type = switchCase.checkReturnType(context);
            if(type!=VoidType.instance) {
                section = switchCase;
                types[type.name] = type;
            }
        });
        if(this.defaultCase!=null) {
            var type = this.defaultCase.check(context, null);
            if(type!=VoidType.instance) {
                section = this.defaultCase;
                types[type.name] = type;
            }
        }
        return section;
    }

    interpretSwitch(context, switchValue, toThrow) {
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

    declareSwitch(transpiler) {
        this.switchCases.forEach(kase => {
            kase.declare(transpiler);
        });
        if(this.defaultCase!=null) {
            this.defaultCase.declare(transpiler);
        }
    }

    toDialect(writer) {
        writer.toDialect(this);
    }

    canReturn() {
        return true;
    }

    locateSectionAtLine(line) {
        return this.switchCases.locateSectionAtLine(line) || (this.defaultCase ? this.defaultCase.locateSectionAtLine(line) : null) || this;
    }
}


exports.BaseSwitchStatement = BaseSwitchStatement;

class SwitchCaseList extends ObjectList {
    constructor(item) {
        super();
        item = item || null;
        if(item!=null) {
            this.add(item);
        }
        return this;
    }

    locateSectionAtLine(line) {
        for(var i=0; i< this.length; i++) {
            const switchCase = this[i];
            const section = switchCase.locateSectionAtLine(line);
            if(section)
                return section;
        }
        return null;
    }
}


exports.SwitchCaseList = SwitchCaseList;
