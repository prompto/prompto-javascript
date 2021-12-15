export default class QueryBuilder {

    verify(fieldName, matchOp, value) {
        throw new Error("Must override verify!");
    }

    and() {
        throw new Error("Must override and!");
    }

    or() {
        throw new Error("Must override or!");
    }

    not() {
        throw new Error("Must override not!");
    }

    build() {
        throw new Error("Must override build!");
    }

    setFirst(value) {
        throw new Error("Must override setFirst!");
    }

    setLast(value) {
        throw new Error("Must override setLast!");
    }

    project(projection) {
        throw new Error("Must override projection!");
    }

    addOrderByClause(field, descending) {
        throw new Error("Must override addOrderByClause!");
    }
}
