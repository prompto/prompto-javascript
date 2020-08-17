
export default class MemberInstance {
   
    constructor(id) {
        this.parent = null;
        this.id = id;
    }

    get name() {
        return this.id.name;
    }

    toString() {
        return this.parent.toString() + "." + this.name;
    }

    toDialect(writer) {
        this.parent.toDialect(writer);
        writer.append(".");
        writer.append(this.name);
    }

    interpret(context) {
        const root = this.parent.interpret(context);
        return root.getMemberValue(context, this.name, true);
    }

    checkAssignValue(context, valueType, section) {
        return this.parent.checkAssignMember(context, this.id, valueType, section);
    }

    checkAssignMember(context, id, valueType, section) {
        this.parent.checkAssignMember(context, this.id, section);
        return valueType; // TODO
    }

    checkAssignItem(context, itemType, valueType, section) {
        return valueType; // TODO
    }

    assign(context, expression) {
        const root = this.parent.interpret(context);
        if(!root.mutable)
            throw new NotMutableError();
        const value = expression.interpret(context);
        root.setMember(context, this.name, value);
    }

    check(context) {
        const parentType = this.parent.check(context);
        return parentType.checkMember(context, this.id, this.name);
    }

    declare(transpiler) {
        this.parent.declare(transpiler);
    }

    transpile(transpiler) {
        this.parent.transpile(transpiler);
        transpiler.append(".").append(this.name);
    }

    declareAssign(transpiler, expression) {
        this.parent.declare(transpiler);
        expression.declare(transpiler);
    }

    transpileAssign(transpiler, expression) {
        const parentType = this.parent.check(transpiler.context);
        this.parent.transpileAssignParent(transpiler);
        parentType.transpileAssignMemberValue(transpiler, this.name, expression);
    }

    transpileAssignParent(transpiler) {
        const parentType = this.parent.check(transpiler.context);
        this.parent.transpileAssignParent(transpiler);
        parentType.transpileAssignMember(transpiler, this.name);
    }
}
