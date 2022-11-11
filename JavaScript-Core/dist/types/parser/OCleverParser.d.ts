import { ParseTree } from 'antlr4';
import { CharStream, Lexer } from 'antlr4';
import { IStatement } from "../statement";
import { DeclarationList, IDeclaration } from "../declaration";
import { OParser } from "./index";
import { IType } from "../type";
import { DocumentLiteral } from "../literal";
declare type ReplLine = IStatement | IDeclaration;
export default class OCleverParser extends OParser {
    constructor(data?: string, stream?: CharStream, lexer?: Lexer, debug?: boolean);
    equalToken(): number;
    wsToken(): number;
    parse(): DeclarationList | null;
    parse_declaration_list(): DeclarationList | null;
    parse_repl_input(): ReplLine | null;
    parse_standalone_type(): IType | null;
    parse_document_literal(): DocumentLiteral | null;
    doParse<T>(rule: () => ParseTree, addLF: boolean): T;
}
export {};
