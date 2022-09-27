import {IDeclaration, IMethodDeclaration} from "../declaration";
import {Annotation, Identifier} from "../grammar";
import {CommentStatement} from "../statement";
import {Context} from "./Context";
import {IType} from "../type";
import {IDeclarationInfo} from "./Catalog";
import {CodeWriter} from "../utils";
import {Transpiler} from "./index";
import {ProblemListener} from "../problem";

export default class MethodDeclarationMap implements IDeclaration {

    annotations: Annotation[] | null;
    comments: CommentStatement[] | null;
    id: Identifier;
    protos = new Map<string, IMethodDeclaration>();

    constructor(id: Identifier) {
        this.id = id;
    }

    get name() {
        return this.id.name;
    }

    getDeclarationType(): string {
        return "";
    }

    declare(transpiler: Transpiler): void {
        throw new Error("Should never get there!");
    }

    getType(context: Context): IType {
        throw new Error("Should never get there!");
    }

    toDeclarationInfo(): IDeclarationInfo {
        throw new Error("Should never get there!");
    }

    toEDialect(writer: CodeWriter): void {
        throw new Error("Should never get there!");
    }

    toMDialect(writer: CodeWriter): void {
        throw new Error("Should never get there!");
    }

    toODialect(writer: CodeWriter): void {
        throw new Error("Should never get there!");
    }

    transpile(transpiler: Transpiler): void {
        throw new Error("Should never get there!");
    }

    registerOrReplace(method: IMethodDeclaration): void {
        const proto = method.getProto();
        this.protos.set(proto, method);
    }

    register(method: IMethodDeclaration, problemListener: ProblemListener, override: boolean): void {
        const proto = method.getProto();
        const current = this.protos.get(proto) || null;
        if (current !== null && !override)
            problemListener.reportDuplicate(method.id, method.id);
        this.protos.set(proto, method);
    }

    unregister(proto: string): boolean {
        this.protos.delete(proto);
        return this.protos.size == 0;
    }

    hasProto(proto: string): boolean {
        return this.protos.has(proto);
    }

    registerIfMissing(method: IMethodDeclaration) {
        const proto = method.getProto();
        if (!this.protos.has(proto)) {
            this.protos.set(proto, method);
        }
    }

    getFirst(): IMethodDeclaration | null {
        return this.protos.size == 0 ? null : this.protos.get(this.protos.keys().next().value as string)!;
    }

    getAll(): IMethodDeclaration[] {
        return Array.from(this.protos.values());
    }

    isEmpty(): boolean {
        return this.protos.size == 0;
    }

    size() {
        return this.protos.size;
    }

}
