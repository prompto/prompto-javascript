import ObjectList from '../utils/ObjectList.js'
import { CodeParameter } from './index.js'

export default class ParameterList extends ObjectList {

    constructor() {
        super();
        for (let i=0; i < arguments.length; i++) {
            this.add(arguments[i]);
        }
    }

    register(context) {
        this.forEach(param => {
            param.register(context);
        });
    }

    check(context) {
        this.forEach(param => {
            param.check(context);
        });
    }

    declare(transpiler) {
        this.forEach(param => {
            param.declare(transpiler);
        });
    }

    find(name) {
        return this.filter(param => name === param.name)[0] || null;
    }

    toDialect(writer) {
        if(this.length==0)
            return;
        writer.toDialect(this);
    }

    toEDialect(writer) {
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

    toODialect(writer) {
        if(this.length>0) {
            this.forEach(param => {
                param.toDialect(writer);
                writer.append(", ");
            });
            writer.trimLast(2);
        }
    }

    toMDialect(writer) {
        this.toODialect(writer);
    }

    transpile(transpiler) {
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
