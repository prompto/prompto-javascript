var Document = require("../value/Document").Document;
var Store = require("./Store").Store;

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
            if(!this.document) {
                this.document = new Document();
                this.document.dbId = Store.instance.nextDbId++; // only MemStore supported for now

            }
        } else
            this.document = null;
    }
});


StorableDocument.prototype.asDocument = function () {
    return this.document;
};

StorableDocument.prototype.SetMember = function(context, name, value) {
    this.dirty = true;
    this.document.setMember(context, name, value);
};

exports.StorableDocument = StorableDocument;
