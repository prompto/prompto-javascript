import BaseStatement from './BaseStatement'
import {StatementList, SwitchCaseList} from './index'
import {VoidType, TypeMap, IType} from '../type'
import {Context, Transpiler} from "../runtime";
import {CodeWriter, IWritable} from "../utils";
import {Section} from "../parser";
import {IValue} from "../value";

export default abstract class BaseSwitchStatement extends BaseStatement implements IWritable {

    switchCases: SwitchCaseList;
    defaultCase: StatementList | null;

    constructor(switchCases: SwitchCaseList, defaultCase: StatementList | null) {
        super();
        this.switchCases = switchCases || new SwitchCaseList();
        this.defaultCase = defaultCase || null;
    }

    abstract toEDialect(writer: CodeWriter): void;
    abstract toODialect(writer: CodeWriter): void;
    abstract toMDialect(writer: CodeWriter): void;

    check(context: Context): IType {
        this.checkSwitchCasesType(context);
        return this.checkReturnType(context);
    }

    abstract checkSwitchType(context: Context): IType;

    checkSwitchCasesType(context: Context) {
        const type = this.checkSwitchType(context);
        this.switchCases.forEach(switchCase => {
            switchCase.checkSwitchType(context, type);
        });
    }

    checkReturnType(context: Context) {
        const types = new TypeMap();
        const section = this.collectReturnTypes(context, types);
        return types.inferType(context, section);
    }

    collectReturnTypes(context: Context, types: TypeMap) {
        let section = this as Section;
        this.switchCases.forEach(switchCase => {
            const type = switchCase.checkReturnType(context);
            if(type && type !== VoidType.instance) {
                section = switchCase;
                types.add(type);
            }
        });
        if(this.defaultCase) {
            const type = this.defaultCase.check(context, null);
            if(type && type!=VoidType.instance) {
                section = this.defaultCase.asSection()!;
                types.add(type);
            }
        }
        return section;
    }

    interpretSwitch(context: Context, switchValue: IValue, toThrow: any) {
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

    declareSwitch(transpiler: Transpiler) {
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



