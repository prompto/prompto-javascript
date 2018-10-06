
function StoredDocument(categories, dbId) {
    // use reserved keyword explicitly
    this.category = categories;
    this.dbId = dbId;
    return this;
}


StoredDocument.prototype.getData = function(name) {
    return this[name] || null;
};

StoredDocument.prototype.matches = function(predicate) {
    if(predicate==null)
        return true;
    else
        return predicate.matches(this);
};

exports.StoredDocument = StoredDocument;
