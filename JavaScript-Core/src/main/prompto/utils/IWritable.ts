import CodeWriter from "./CodeWriter";

export default interface IWritable {

    toEDialect(writer: CodeWriter): void;
    toODialect(writer: CodeWriter): void;
    toMDialect(writer: CodeWriter): void;

}
