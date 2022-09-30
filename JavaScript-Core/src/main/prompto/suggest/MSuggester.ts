import BaseSuggester from "./BaseSuggester";
import {MLexer, MParser} from "../parser";
import {Context} from "../runtime";


export default class MSuggester extends BaseSuggester<MLexer> {

    static TYPE_IDENTIFIER_TOKENS = new Set([
        MLexer.DBID,
        MLexer.ANY,
        MLexer.BOOLEAN,
        MLexer.BLOB,
        MLexer.CHARACTER,
        MLexer.CODE,
        MLexer.CSS,
        MLexer.CURSOR,
        MLexer.DATE,
        MLexer.DATETIME,
        MLexer.DECIMAL,
        MLexer.DOCUMENT,
        MLexer.HTML,
        MLexer.IMAGE,
        MLexer.INTEGER,
        MLexer.ITERATOR,
        MLexer.PERIOD,
        MLexer.TEXT,
        MLexer.TIME,
        MLexer.UUID,
        MLexer.VERSION,
        MLexer.TYPE
    ]);

    getStartState() {
        const startState = this.atn.ruleToStartState[MParser.RULE_declaration_list];
        return startState.stateNumber;
    }

   deduplicate_type(tokens: number[], context: Context) {
        if(tokens.indexOf(MLexer.TYPE_IDENTIFIER) >= 0)
            return tokens.filter(t => !MSuggester.TYPE_IDENTIFIER_TOKENS.has(t));
        else
            return tokens;
    }

}
