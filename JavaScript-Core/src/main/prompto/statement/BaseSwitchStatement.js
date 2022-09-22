import BaseStatement from './BaseStatement.ts'
import { SwitchCaseList } from './index.ts'
import { VoidType, TypeMap } from '../type'

export default class BaseSwitchStatement extends BaseStatement {

    constructor(switchCases, defaultCase) {
        super();
        this.switchCases = switchCases || new SwitchCaseList();
        this.defaultCase = defaultCase || null;
    }

    check(context: Context): Type {
        this.checkSwitchCasesType(context);
        return this.checkReturnType(context);
    }

    checkSwitchCasesType(context) {
        const type = this.checkSwitchType(context);
        this.switchCases.forEach(switchCase => {
            switchCase.checkSwitchType(context, type);
        });
    }

    checkReturnType(context) {
        const types = new TypeMap();
        const section = this.collectReturnTypes(context, types);
        return types.inferType(context, section);
    }

    collectReturnTypes(context, types) {
        let section = null;
        this.switchCases.forEach(switchCase => {
            const type = switchCase.checkReturnType(context);
            if(type !== VoidType.instance) {
                section = switchCase;
                types.add(type);
            }
        });
        if(this.defaultCase!=null) {
            const type = this.defaultCase.check(context, null);
            if(type !== VoidType.instance) {
                section = this.defaultCase;
                types.add(type);
            }
        }
        return section;
    }

    interpretSwitch(context, switchValue, toThrow) {
        for(let i=0;i<this.switchCases.length;i++) {
            const sc = this.switchCases[i];
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

    toDialect(writer: CodeWriter): void {
        writer.toDialect(this);
    }

    canReturn() {
        return true;
    }

}



