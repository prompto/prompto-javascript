var InternalError = require("../error/InternalError").InternalError;
var Integer = require("../value/Integer").Integer;
var Document = require("../value/Document").Document;
var Bool = require("../value/Bool").Bool;

// a utility class for running unit tests only
function MemStore(object) {
    this.documents = {};
    this.nextDbId = 1;
    return this;
}

MemStore.prototype.store = function(document) {
    if(document.dbId)
        return;
    document.dbId = this.nextDbId++;
    this.documents[document.dbId] = document;
};


MemStore.prototype.fetchOne = function(context, xfilter) {
    for (dbId in this.documents) {
        doc = this.documents[dbId];
        if(this.matches(context, doc, xfilter))
            return doc;
    }
    return null;
};

MemStore.prototype.matches = function(context, doc, xfilter) {
    if(!xfilter)
        return true;
    var local = context.newDocumentContext(doc);
    var test = xfilter.interpret(local);
    if (!(test instanceof Bool))
        throw new InternalError("Illegal test result: " + test);
    return test.value;
};

MemStore.prototype.fetchMany = function(context, start, end, xfilter, orderBy) {
    docs = this.fetchMatching(context, xfilter);
    docs = this.sort(context, docs, orderBy);
    docs = this.slice(context, docs, start, end);
    return new DocumentIterator(docs);
};

MemStore.prototype.slice = function(context, docs, start, end) {
    if(docs.length==0 || !start)
        return docs;
    var startValue = null;
    var endValue = null;
    if(start!=null) {
        var value = start.interpret(context);
        if(value==null)
            throw new NullReferenceError();
        else if(!(value instanceof Integer))
            throw new SyntaxError("Expecting an integer, got " + value.getType().getName().getName());
        startValue = value.IntegerValue();
    }
    if(end!=null) {
        var value = end.interpret(context);
        if(value==null)
            throw new NullReferenceError();
        else if(!(value instanceof Integer))
            throw new SyntaxError("Expecting an integer, got " + value.getType().getName().getName());
        endValue = value.IntegerValue();
    }
    if(startValue==null || startValue<1)
        startValue = 1;
    if(endValue==null || endValue>docs.length)
        endValue = docs.length;
    if(startValue>docs.length || startValue > endValue)
        return [];
    return docs.slice(startValue - 1, endValue);
};

MemStore.prototype.sort = function(context, docs, orderBy) {
    if(!orderBy)
        return docs;
    var self = this;
    docs.sort( function(doc1, doc2) {
        var tuple1 = self.readTuple(context, doc1, orderBy);
        var tuple2 = self.readTuple(context, doc2, orderBy);
        return self.compareValues(context, tuple1, tuple2, orderBy);
    });
    return docs;
};

MemStore.prototype.compareValues = function(context, tuple1, tuple2, orderBy) {
    for(var i=0;i<tuple1.length;i++) {
        var descending = i<orderBy.length ? orderBy[i].descending : false;
        if(i>=tuple2.length)
            return descending ? -1 : 1;
        var val1 = tuple1[i];
        var val2 = tuple2[i];
        if(val1==null && val2==null)
            continue;
        else if(val1==null)
            return descending ? 1 : -1;
        else if(val2==null)
            return descending ? -1 : 1;
        var res = val1.CompareTo(context, val2);
        if(res)
            return descending ? -res : res;
    }
    return 0;
};

MemStore.prototype.readTuple = function(context, doc, orderBy) {
    var tuple = [];
    for(var i=0;i<orderBy.length;i++) {
        var value = this.readValue(context, doc, orderBy[i]);
        tuple.push(value);
    }
    return tuple;
};

MemStore.prototype.readValue = function(context, doc, clause) {
    var source = doc;
    var value = null;
    for(var i=0;i<clause.names.length;i++) {
        if(!(source instanceof Document))
            return null;
        value = source.getMember(context, clause.names[i]);
        source = value;
    }
    return value;
}

MemStore.prototype.fetchMatching = function(context, xfilter) {
    var docs = [];
    for (dbId in this.documents) {
        doc = this.documents[dbId];
        if (this.matches(context, doc, xfilter))
            docs.push(doc);
    }
    return docs;
};

function DocumentIterator(docs) {
    this.index = 0;
    this.length = function() { return docs.length; };
    this.hasNext = function() { return this.index < docs.length; };
    this.next = function() { return docs[this.index++]; };
    return this;
}

exports.MemStore = MemStore;