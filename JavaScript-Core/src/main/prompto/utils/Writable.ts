import CodeWriter from "./CodeWriter";

export default interface Writable {

    toEDialect(writer: CodeWriter): void;
    toODialect(writer: CodeWriter): void;
    toMDialect(writer: CodeWriter): void;

}
