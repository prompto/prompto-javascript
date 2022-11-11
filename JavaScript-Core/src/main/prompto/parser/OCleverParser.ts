import {ParserRuleContext, ParseTree, ParseTreeWalker} from 'antlr4';
import { CharStream, Lexer } from 'antlr4';
import {IStatement} from "../statement";
import {DeclarationList, IDeclaration} from "../declaration";
import {ONamingLexer, OParser, OPromptoBuilder} from "./index";
import {createParserInput} from "./ParserUtils";
import {IType} from "../type";
import {DocumentLiteral} from "../literal";

type ReplLine = IStatement | IDeclaration;

export default class OCleverParser extends OParser {

	constructor(data?: string, stream?: CharStream, lexer?: Lexer, debug?: boolean) {
		super(createParserInput(data, stream, lexer, (stream: CharStream) => new ONamingLexer(stream)));
		if(debug)
			this._interp.debug = true;
	}

	equalToken(): number {
		return OParser.EQ2;
	}

	wsToken(): number {
		return OParser.WS;
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

	parse_document_literal(): DocumentLiteral | null {
		return this.doParse<DocumentLiteral>(() => this.document_literal(), false);
	}

	doParse<T>(rule: () => ParseTree, addLF: boolean) {
		const tree = (rule.bind(this) as () => ParserRuleContext)();
		const builder = new OPromptoBuilder(this);
		const walker = new ParseTreeWalker();
		walker.walk(builder, tree);
		return builder.getNodeValue<T>(tree);
	}

}
