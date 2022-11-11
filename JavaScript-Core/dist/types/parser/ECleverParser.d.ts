import { ParseTree } from 'antlr4';
import { CharStream, Lexer } from 'antlr4';
import EParser from './EParser';
import { IDeclaration, DeclarationList } from "../declaration";
import { IStatement } from "../statement";
import { IType } from "../type";
declare type ReplLine = IStatement | IDeclaration;
export default class ECleverParser extends EParser {
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
