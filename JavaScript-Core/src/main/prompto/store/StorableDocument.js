var Document = require("../value/Document").Document;

function StorableDocument() {
    this.document = null;
    return this;
}

Object.defineProperty(StorableDocument.prototype, "dirty", {
    get : function() {
        return this.document != null;
    },
    set : function(value) {
        if (value) {
            if(!this.document)
                this.document = new Document();
        } else
            this.document = null;
    }
});


StorableDocument.prototype.asDocument = function () {
    return this.document;
};

StorableDocument.prototype.SetMember = function(context, name, value) {
    if (this.document == null)
        this.document = new Document();
    this.document.setMember(context, name, value);
};

exports.StorableDocument = StorableDocument;
