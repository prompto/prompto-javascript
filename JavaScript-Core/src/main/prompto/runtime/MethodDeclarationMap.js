export default class MethodDeclarationMap {

    constructor(id) {
        this.id = id;
        this.protos = {};
    }

    registerOrReplace(declaration) {
        const proto = declaration.getProto();
        this.protos[proto] = declaration;
    }

    register(declaration, problemListener) {
        const proto = declaration.getProto();
        const current = this.protos[proto] || null;
        if (current !== null)
            problemListener.reportDuplicate(declaration.id);
        this.protos[proto] = declaration;
    }

    unregister(proto) {
        delete this.protos[proto];
        return Object.getOwnPropertyNames(this.protos).length === 0;
    }

    hasProto(proto) {
        return !!this.protos[proto];
    }

    registerIfMissing(method) {
        const proto = method.getProto();
        if (!(proto in this.protos)) {
            this.protos[proto] = method;
        }
    }

    getFirst() {
        const proto = Object.getOwnPropertyNames(this.protos)[0];
        return (proto || proto === "") ? this.protos[proto] : null;
    }

    getAll() {
        return Object.getOwnPropertyNames(this.protos).map(function (proto) {
            return this.protos[proto];
        }, this);
    }

    isEmpty() {
        return this.size() === 0;
    }

    size() {
        return Object.getOwnPropertyNames(this.protos).length;
    }
}
