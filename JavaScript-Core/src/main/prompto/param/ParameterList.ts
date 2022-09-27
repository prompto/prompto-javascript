import ObjectList from '../utils/ObjectList'
import { CodeParameter, IParameter} from './index'

export default class ParameterList extends ObjectList<IParameter> {

    constructor(...params: IParameter[]) {
        super();
        for (let i=0; i < params.length; i++) {
            this.add(params[i]);
        }
    }

    register(context: Context): void {
        this.forEach(param => {
            param.register(context);
        });
    }

    check(context: Context): IType {
        this.forEach(param => {
            param.check(context);
        });
    }

    declare(transpiler: Transpiler): void {
        this.forEach(param => {
            param.declare(transpiler);
        });
    }

    findByName(name) {
        return this.filter(param => name === param.name)[0] || null;
    }

    toDialect(writer: CodeWriter): void {
        if(this.length==0)
            return;
        writer.toDialect(this);
    }

    toEDialect(writer: CodeWriter): void {
        writer.append("receiving ");
        for(let i=0;i<this.length-1;i++) {
            this[i].toDialect(writer);
            writer.append(", ");
        }
        if(this.length>1) {
            writer.trimLast(2);
            writer.append(" and ");
        }
        this[this.length-1].toDialect(writer);
        writer.append(" ");
    }

    toODialect(writer: CodeWriter): void {
        if(this.length>0) {
            this.forEach(param => {
                param.toDialect(writer);
                writer.append(", ");
            });
            writer.trimLast(2);
        }
    }

    toMDialect(writer: CodeWriter): void {
        this.toODialect(writer);
    }

    transpile(transpiler: Transpiler): void {
        const params = this.filter(param => !(param instanceof CodeParameter));
        if(params.length>0) {
            params.forEach(param => {
                param.transpile(transpiler);
                transpiler.append(", ");
            });
            transpiler.trimLast(2);
        }
    }
}
