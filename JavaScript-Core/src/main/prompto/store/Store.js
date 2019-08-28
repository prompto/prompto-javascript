
function Store() {
    return this;
}

Store.prototype.newQueryBuilder = function() {
    throw new Error("Must override newQueryBuilder!");
};

Store.prototype.newStorableDocument = function() {
    throw new Error("Must override newStorableDocument!");
};


Store.prototype.store = function(add, del) {
    throw new Error("Must override store!");
};


Store.prototype.fetchUnique = function(dbId) {
    throw new Error("Must override fetchUnique!");
};


Store.prototype.fetchOne = function(query) {
    throw new Error("Must override fetchOne!");
};


Store.prototype.fetchMany = function(query) {
    throw new Error("Must override fetchMany!");
};

function QueryBuilder() {
    return this;
}

QueryBuilder.prototype.verify = function(fieldName, matchOp, value) {
    throw new Error("Must override verify!");
};

QueryBuilder.prototype.and = function() {
    throw new Error("Must override and!");
};

QueryBuilder.prototype.or = function() {
    throw new Error("Must override or!");
};

QueryBuilder.prototype.not = function() {
    throw new Error("Must override not!");
};

QueryBuilder.prototype.build = function() {
    throw new Error("Must override build!");
};

QueryBuilder.prototype.setFirst = function(value) {
    throw new Error("Must override setFirst!");
};

QueryBuilder.prototype.setLast = function(value) {
    throw new Error("Must override setLast!");
};

QueryBuilder.prototype.addOrderByClause = function(field, descending) {
    throw new Error("Must override addOrderByClause!");
};

exports.Store = Store;
exports.QueryBuilder = QueryBuilder;

