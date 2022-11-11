import BaseSuggester from "./BaseSuggester";
import { MLexer } from "../parser";
import { Context } from "../runtime";
export default class MSuggester extends BaseSuggester<MLexer> {
    static TYPE_IDENTIFIER_TOKENS: Set<number>;
    getStartState(): number;
    deduplicate_type(tokens: number[], context: Context): number[];
}
