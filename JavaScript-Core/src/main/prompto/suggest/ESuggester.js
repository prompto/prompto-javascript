import BaseSuggester from "./BaseSuggester.js";
import { ELexer } from "../parser/index.js";


export default class ESuggester extends BaseSuggester {

    getStartState() {
        return 160; // first state in EParser.declaration_list()
    }

    suggestionsAt(caret, context) {
        const node = this.locateNodeBefore(caret);
        const intervalSet = this.expectedTokenIntervalsAfter(node);
        const tokens = this.flattenTokenIntervals(intervalSet.intervals);
        const deduped = this.deduplicate(tokens, context);
        const visible = deduped.filter(this.filterVisible, this);
        const stringified = visible.map(this.stringify, this);
        const enriched = this.enrich(stringified, context);
        enriched.sort(this.caselessCompare);
        return enriched;
    }

    deduplicate(tokens, context) {
        tokens = this.deduplicate_type(tokens, context);
        return tokens;
    }

    static TYPE_IDENTIFIER_TOKENS = new Set([
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

    deduplicate_type(tokens, context) {
        if(tokens.indexOf(ELexer.TYPE_IDENTIFIER) >= 0)
            return tokens.filter(t => !ESuggester.TYPE_IDENTIFIER_TOKENS.has(t));
        else
            return tokens;
    }

    enrich(names, context) {
        names = this.enrichAnnotations(names);
        return names;
    }

}