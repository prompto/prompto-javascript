import antlr4 from 'antlr4';
import { CharStream, FileStream, CommonTokenStream, BufferedTokenStream, Lexer } from 'antlr4';
import EParser from './EParser';
import EIndentingLexer from './EIndentingLexer';
import EPromptoBuilder from '../parser/EPromptoBuilder';
import { fileExists } from '../utils';
import { IDeclaration, DeclarationList } from "../declaration";
import { IStatement } from "../statement";
import {IType} from "../type";

function createInput(data?: string, stream?: CharStream, lexer?: Lexer): CommonTokenStream {

	let tokenStream: CommonTokenStream | null = null;

	if(data) {
		if(fileExists(data)) {
			stream = new FileStream(data);
		} else {
			stream = new CharStream(data);
		}
	}
	if(stream instanceof CharStream) {
		lexer = new EIndentingLexer(stream);
	}
	if(lexer instanceof Lexer) {
		tokenStream = new CommonTokenStream(lexer);
	}

	if(tokenStream)
		return tokenStream;
	else
		throw new Error("Invalid source!");
}

type ReplLine = IStatement | IDeclaration;

export default class ECleverParser extends EParser {

	constructor(data?: string, stream?: CharStream, lexer?: Lexer, debug?: boolean) {
		super(createInput(data, stream, lexer));
	}

	equalToken(): number {
		return EParser.EQ2;
	}

	wsToken(): number {
		return EParser.WS;
	}

	parse(): DeclarationList | null {
		return this.parse_declaration_list();
	}

	parse_declaration_list(): DeclarationList | null {
		return this.doParse<DeclarationList>(() => this.declaration_list(), true);
	}

	parse_repl_input(): ReplLine | null {
		return this.doParse<ReplLine>(() => this.repl(), true);
	}

	parse_standalone_type(): IType | null {
		return this.doParse<IType>(() => this.category_or_any_type(), false);
	}

	doParse<T>(rule: () => antlr4.tree.ParseTree, addLF: boolean) {
		const stream = this.getTokenStream() as BufferedTokenStream;
		const lexer = stream.tokenSource as EIndentingLexer;
		lexer.addLF = addLF;
		const tree = (rule.bind(this) as () => antlr4.context.ParserRuleContext)();
		const builder = new EPromptoBuilder(this);
		const walker = new antlr4.tree.ParseTreeWalker();
		walker.walk(builder, tree);
		return builder.getNodeValue<T>(tree);
	}

}
