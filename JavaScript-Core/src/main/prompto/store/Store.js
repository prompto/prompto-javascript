
class Store {
  
    nextSequenceValue(name) {
        throw new Error("Must override nextSequenceValue!");
    }

    newQueryBuilder() {
        throw new Error("Must override newQueryBuilder!");
    }

    newStorableDocument() {
        throw new Error("Must override newStorableDocument!");
    }

    store(add, del) {
        throw new Error("Must override store!");
    }

    fetchUnique(dbId) {
        throw new Error("Must override fetchUnique!");
    }

    fetchOne(query) {
        throw new Error("Must override fetchOne!");
    }

    fetchMany(query) {
        throw new Error("Must override fetchMany!");
    }
}

class QueryBuilder {
    constructor() {
        return this;
    }

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

    addOrderByClause(field, descending) {
        throw new Error("Must override addOrderByClause!");
    }
}

exports.Store = Store;
exports.QueryBuilder = QueryBuilder;

