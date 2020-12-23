import Expression from './Expression.js'

export default class PredicateExpression extends Expression {

    toArrowExpression() {
        throw new Error("Override!");
    }

    checkFilter(context, itemType) {
        throw new Error("Override!");
    }

    filteredToDialect(writer, source) {
        throw new Error("Override!");
    }

    containsToDialect(writer) {
        throw new Error("Override!");
    }

}