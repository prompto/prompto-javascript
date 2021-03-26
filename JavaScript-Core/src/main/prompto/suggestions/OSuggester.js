export default class OSuggester {

    constructor(lexer, parser,  tree) {
        this.lexer = lexer;
        this.parser = parser;
        this.tree = tree;
    }

    suggestionsAt(insertionPoint, context) {
        return [];
    }

}