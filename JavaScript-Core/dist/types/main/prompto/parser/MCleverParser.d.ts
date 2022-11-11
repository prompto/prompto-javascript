import { CharStream, Lexer, ParseTree } from 'antlr4';
import MParser from './MParser';
import { DeclarationList, IDeclaration } from "../declaration";
import { IType } from "../type";
import { IStatement } from "../statement";
declare type ReplLine = IStatement | IDeclaration;
export default class MCleverParser extends MParser {
    constructor(data?: string, stream?: CharStream, lexer?: Lexer, debug?: boolean);
    equalToken(): number;
    wsToken(): number;
    parse(): DeclarationList | null;
    parse_declaration_list(): DeclarationList | null;
    parse_repl_input(): ReplLine | null;
    parse_standalone_type(): IType | null;
    doParse<T>(rule: () => ParseTree, addLF: boolean): T;
}
export {};
