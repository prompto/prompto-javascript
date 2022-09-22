import Declaration from "./Declaration";
import Section from '../parser/Section'
import { Annotation, Identifier } from "../grammar";
import { CommentStatement } from "../statement";
import { Context, Transpiler} from "../runtime";
import {CodeWriter} from "../utils";
import AbstractParser from "../parser/AbstractParser";
import {Type} from "../type";
import {DeclarationInfo} from "../runtime/Catalog";

export default abstract class BaseDeclaration extends Section implements Declaration {

    id: Identifier;
    declaring: boolean;
    comments: CommentStatement[] | null;
    annotations: Annotation[] | null;

    constructor(id: Identifier) {
        super();
        this.id = id;
        this.declaring = false;
        this.comments = null;
        this.annotations = null;
    }

    abstract getType(context: Context): Type;
    abstract getDeclarationType(): string;
    abstract declare(transpiler: Transpiler): void;
    abstract transpile(transpiler: Transpiler): void;

    getId(): Identifier {
        return this.id;
    }

    get name(): string {
        return this.id.name;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    locateSectionAtLine(line: number): Section | null {
        return null;
    }

    unregister(context: Context): void {
        context.unregisterDeclaration (this);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getAllAnnotations(context: Context): Annotation[] {
        return this.annotations || [];
    }

    toDialect(writer: CodeWriter) {
        writer.toDialect(this);
    }

    fetchBody(parser: AbstractParser) {
        let startLocation = this.startLocation;
        if(this.comments != null && this.comments.length > 0)
            startLocation = this.comments[0].startLocation;
        if(startLocation == null && this.annotations != null && this.annotations.length > 0)
            startLocation = this.annotations[0].startLocation;
        return parser.getTokenStream().getText({ start: startLocation.tokenIndex, stop: this.endLocation.tokenIndex + 1 });
    }

    abstract toEDialect(writer: CodeWriter): void;
    abstract toODialect(writer: CodeWriter): void;
    abstract toMDialect(writer: CodeWriter): void;
    abstract toDeclarationInfo(context: Context): DeclarationInfo;

}
