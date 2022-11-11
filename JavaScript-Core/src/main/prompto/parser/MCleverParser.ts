import {BufferedTokenStream, CharStream, Lexer, ParserRuleContext, ParseTree, ParseTreeWalker} from 'antlr4';
import MParser from './MParser'
import MPromptoBuilder from './MPromptoBuilder'
import {createParserInput} from "./ParserUtils";
import {MIndentingLexer} from "./index";
import {DeclarationList, IDeclaration} from "../declaration";
import {IType} from "../type";
import {IStatement} from "../statement";

type ReplLine = IStatement | IDeclaration;

export default class MCleverParser extends MParser {

	constructor(data?: string, stream?: CharStream, lexer?: Lexer, debug?: boolean) {
		super(createParserInput(data, stream, lexer, (stream: CharStream) => new MIndentingLexer(stream)));
		if(debug)
			this._interp.debug = true;
	}

	equalToken(): number {
		return MParser.EQ2;
	}

	wsToken(): number {
		return MParser.WS;
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

	doParse<T>(rule: () => ParseTree, addLF: boolean) {
		const stream = this.getTokenStream() as BufferedTokenStream;
		const lexer = stream.tokenSource as MIndentingLexer;
		lexer.addLF = addLF;
		const tree = (rule.bind(this) as () => ParserRuleContext)();
		const builder = new MPromptoBuilder(this);
		const walker = new ParseTreeWalker();
		walker.walk(builder, tree);
		return builder.getNodeValue<T>(tree);
	}
}
