import BaseSuggester from "./BaseSuggester";
import {ELexer, EParser} from "../parser";
import {Context} from "../runtime";


export default class ESuggester extends BaseSuggester<ELexer> {

    static TYPE_IDENTIFIER_TOKENS = new Set<number>([
        ELexer.DBID,
        ELexer.ANY,
        ELexer.BOOLEAN,
        ELexer.BLOB,
        ELexer.CHARACTER,
        ELexer.CODE,
        ELexer.CSS,
        ELexer.CURSOR,
        ELexer.DATE,
        ELexer.DATETIME,
        ELexer.DECIMAL,
        ELexer.DOCUMENT,
        ELexer.HTML,
        ELexer.IMAGE,
        ELexer.INTEGER,
        ELexer.ITERATOR,
        ELexer.PERIOD,
        ELexer.TEXT,
        ELexer.TIME,
        ELexer.UUID,
        ELexer.VERSION,
        ELexer.TYPE
    ]);

    getStartState() {
        const startState = this.atn.ruleToStartState[EParser.RULE_declaration_list];
        return startState.stateNumber;
    }

    deduplicate_type(tokens: number[], context: Context) {
        if(tokens.indexOf(ELexer.TYPE_IDENTIFIER) >= 0)
            return tokens.filter(t => !ESuggester.TYPE_IDENTIFIER_TOKENS.has(t));
        else
            return tokens;
    }

}
