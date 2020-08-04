var Store = require("../store/Store").Store;
var MemQueryBuilder = require("./MemQueryBuilder").MemQueryBuilder;
var StorableDocument = null;
exports.Cursor = require("../intrinsic/Cursor").Cursor;

// a utility class for running unit tests only
class MemStore extends Store {

    constructor() {
        super();
        this.sequences = {};
        this.iterDocuments = {};
        this.nextDbId = 1;
    }

    nextSequenceValue(name) {
        var value = (this.sequences[name] || 0) + 1;
        this.sequences[name] = value;
        return value;
    }

    flush() {
        // nothing to do
    }

    isDbIdType(type) {
        return type==typeof(this.nextDbId);
    }

    store(todel, toadd, andThen) {
        if(todel) {
            todel.forEach(function(dbId) {
                delete this.iterDocuments[dbId];
            }, this);
        }
        if(toadd) {
            toadd.forEach(function(doc) {
                var data = doc.document;
                if(data.dbId)
                    this.iterDocuments[data.dbId] = data;
            }, this);
        }
        if(andThen)
            andThen();
    }

    fetchUnique(dbId) {
        return this.iterDocuments[dbId] || null;
    }

    fetchOne(query) {
        for (var dbId in this.iterDocuments) {
            var doc = this.iterDocuments[dbId];
            if(doc.matches(query.predicate))
                return doc;
        }
        return null;
    }

    fetchOneAsync(query, andThen) {
        var record = this.fetchOne(query);
        andThen(record);
    }

    fetchMany(query, mutable) {
        var docs = this.fetchMatching(query);
        var totalCount = docs.length;
        docs = this.sort(query, docs);
        docs = this.slice(query, docs);
        var iterable = new StoredIterable(docs, totalCount);
        return new exports.Cursor(mutable, iterable)
    }

    fetchManyAsync(query, mutable, andThen) {
        var cursor = this.fetchMany(query, mutable);
        andThen(cursor);
    }

    slice(query, docs) {
        if(docs.length==0 || (query.first==null && query.last==null))
            return docs;
        var firstValue = query.first;
        if(firstValue==null || firstValue<1)
            firstValue = 1;
        var lastValue = query.last;
        if(lastValue==null || lastValue>docs.length)
            lastValue = docs.length;
        if(firstValue>docs.length || firstValue > lastValue)
            return [];
        return docs.slice(firstValue - 1, lastValue);
    }

    sort(query, docs) {
        if(!query.orderBys || docs.length<2)
            return docs;
        var self = this;
        docs.sort( function(doc1, doc2) {
            var tuple1 = self.readTuple(doc1, query.orderBys);
            var tuple2 = self.readTuple(doc2, query.orderBys);
            return self.compareTuples(tuple1, tuple2, query.orderBys);
        });
        return docs;
    }

    compareTuples(tuple1, tuple2, orderBys) {
        for(var i=0;i<tuple1.length;i++) {
            var descending = i<orderBys.length ? orderBys[i].descending : false;
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
            var res = val1 < val2 ? -1 : val2 < val1 ? 1 : 0;
            if(res)
                return descending ? -res : res;
        }
        return 0;
    }

    readTuple(doc, orderBys) {
        return orderBys.map(function(ob) {
            return this.readValue(doc, ob);
        }, this);
    }

    readValue(doc, orderBy) {
        // TODO drill-down
        return doc[orderBy.info.name];
    }

    fetchMatching(query) {
        var docs = [];
        for (var dbId in this.iterDocuments) {
            var doc = this.iterDocuments[dbId];
            if(doc.matches(query.predicate))
                docs.push(doc);
        }
        return docs;
    }

    newQueryBuilder() {
        return new MemQueryBuilder();
    }

    newStorableDocument(categories, dbIdListener) {
        if(!StorableDocument)
            StorableDocument = require("./StorableDocument").StorableDocument;
        return new StorableDocument(categories, dbIdListener);
    }
}


MemStore.prototype.storeAsync = MemStore.prototype.store;


function StoredIterable(docs, totalCount) {
    this.count = function() { return docs.length; };
    this.totalCount = function() { return totalCount; };
    this.iterator = function() {
        var index = 0;
        return {
            hasNext: function() { return index < docs.length; },
            next: function() { return docs[index++]; }
        };
    }
    return this;
}




exports.MemStore = MemStore;