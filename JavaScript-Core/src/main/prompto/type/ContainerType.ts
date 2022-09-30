import IterableType from './IterableType'
import { BooleanType, IntegerType } from './index'
import {Context, Transpiler, Variable} from '../runtime'
import IType from "./IType";
import {Section} from "../parser";
import {Identifier} from "../grammar";
import {TypeFamily} from "../store";
import {IExpression} from "../expression";

export default abstract class ContainerType extends IterableType {

    constructor(id: Identifier, family: TypeFamily, itemType: IType) {
        super(id, family, itemType);
    }

    checkContains(context: Context, section: Section, other: IType): IType {
        if(other.isAssignableFrom(context, this.itemType)) {
            return BooleanType.instance;
        } else {
            return  super.checkContains(context, section, other);
        }
    }

    checkMember(context: Context, section: Section, member: Identifier): IType {
        if ("count" == member.name) {
            return IntegerType.instance;
        } else {
            return  super.checkMember(context, section, member);
        }
    }

    declareMember(transpiler: Transpiler, member: Identifier): void {
        if(member.name != "count")
           super.declareMember(transpiler, member);
    }

    transpileMember(transpiler: Transpiler, member: Identifier): void {
        if ("count" == member.name) {
            transpiler.append("length");
        } else {
            return super.transpileMember(transpiler, member);
        }
    }

    declareIterator(transpiler: Transpiler, name: Identifier, expression: IExpression) {
        transpiler = transpiler.newChildTranspiler();
        transpiler.context.registerInstance(new Variable(name, this.itemType), true);
        expression.declare(transpiler);
    }

    transpileIterator(transpiler: Transpiler, name: Identifier, expression: IExpression){
        transpiler.append(".iterate(function(").append(name.name).append(") { return ");
        transpiler = transpiler.newChildTranspiler();
        transpiler.context.registerInstance(new Variable(name, this.itemType), true);
        expression.transpile(transpiler);
        transpiler.append("; }, this)");
        transpiler.flush();
    }
}
