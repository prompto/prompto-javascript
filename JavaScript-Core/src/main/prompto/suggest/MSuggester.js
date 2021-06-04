import BaseSuggester from "./BaseSuggester.js";
import { AnnotationProcessors } from "../processor/index.js";
import { MLexer } from "../parser/index.js";


export default class MSuggester extends BaseSuggester {

    getStartState() {
        return 156; // first state in MParser.declaration_list()
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
        MLexer.VERSION
    ]);

    deduplicate_type(tokens, context) {
        if(tokens.indexOf(MLexer.TYPE_IDENTIFIER) >= 0)
            return tokens.filter(t => !MSuggester.TYPE_IDENTIFIER_TOKENS.has(t));
        else
            return tokens;
    }

    enrich(names, context) {
        names = this.enrichAnnotations(names);
        return names;
    }

}