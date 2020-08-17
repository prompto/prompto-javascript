
export default class ParameterList extends ObjectList {

    constructor() {
        super();
        for (let i=0; i < arguments.length; i++) {
            this.add(arguments[i]);
        }
    }

    register(context) {
        this.forEach(arg => {
            arg.register(context);
        });
    }

    check(context) {
        this.forEach(arg => {
            arg.check(context);
        });
    }

    declare(transpiler) {
        this.forEach(arg => {
            arg.declare(transpiler);
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
            this.forEach(arg => {
                arg.toDialect(writer);
                writer.append(", ");
            });
            writer.trimLast(2);
        }
    }

    toMDialect(writer) {
        this.toODialect(writer);
    }

    transpile(transpiler) {
        const args = this.filter(arg => !(arg instanceof CodeParameter));
        if(args.length>0) {
            args.forEach(arg => {
                arg.transpile(transpiler);
                transpiler.append(", ");
            });
            transpiler.trimLast(2);
        }
    }
}
