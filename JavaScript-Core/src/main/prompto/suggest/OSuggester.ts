import BaseSuggester from "./BaseSuggester";
import { OLexer, OParser } from "../parser";
import {Context} from "../runtime";


export default class OSuggester extends BaseSuggester<OLexer> {

    static TYPE_IDENTIFIER_TOKENS = new Set<number>([
        OLexer.DBID,
        OLexer.ANY,
        OLexer.BOOLEAN,
        OLexer.BLOB,
        OLexer.CHARACTER,
        OLexer.CODE,
        OLexer.CSS,
        OLexer.CURSOR,
        OLexer.DATE,
        OLexer.DATETIME,
        OLexer.DECIMAL,
        OLexer.DOCUMENT,
        OLexer.HTML,
        OLexer.IMAGE,
        OLexer.INTEGER,
        OLexer.ITERATOR,
        OLexer.PERIOD,
        OLexer.TEXT,
        OLexer.TIME,
        OLexer.UUID,
        OLexer.VERSION,
        OLexer.TYPE
    ]);

    getStartState() {
        const startState = this.atn.ruleToStartState[OParser.RULE_declaration_list];
        return startState.stateNumber;
    }

    deduplicate_type(tokens: number[], context: Context) {
        if(tokens.indexOf(OLexer.TYPE_IDENTIFIER) >= 0)
            return tokens.filter(t => !OSuggester.TYPE_IDENTIFIER_TOKENS.has(t));
        else
            return tokens;
    }

}
