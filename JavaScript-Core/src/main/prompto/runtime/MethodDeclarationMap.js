export default class MethodDeclarationMap {

    constructor(name) {
        this.name = name;
        this.protos = {};
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

    registerIfMissing(declaration) {
        const proto = declaration.getProto();
        if (!(proto in this.protos)) {
            this.protos[proto] = declaration;
        }
    }

    getFirst() {
        for (const proto in this.protos) {
            return this.protos[proto];
        }
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