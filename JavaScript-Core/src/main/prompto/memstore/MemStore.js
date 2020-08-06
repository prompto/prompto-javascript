const Store = require("../store/Store").Store;
const MemQueryBuilder = require("./MemQueryBuilder").MemQueryBuilder;
let StorableDocument = null;
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
        const value = (this.sequences[name] || 0) + 1;
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
                const data = doc.document;
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
        for (const dbId in this.iterDocuments) {
            const doc = this.iterDocuments[dbId];
            if(doc.matches(query.predicate))
                return doc;
        }
        return null;
    }

    fetchOneAsync(query, andThen) {
        const record = this.fetchOne(query);
        andThen(record);
    }

    fetchMany(query, mutable) {
        let docs = this.fetchMatching(query);
        const totalCount = docs.length;
        docs = this.sort(query, docs);
        docs = this.slice(query, docs);
        const iterable = new StoredIterable(docs, totalCount);
        return new exports.Cursor(mutable, iterable)
    }

    fetchManyAsync(query, mutable, andThen) {
        const cursor = this.fetchMany(query, mutable);
        andThen(cursor);
    }

    slice(query, docs) {
        if(docs.length==0 || (query.first==null && query.last==null))
            return docs;
        let firstValue = query.first;
        if(firstValue==null || firstValue<1)
            firstValue = 1;
        let lastValue = query.last;
        if(lastValue==null || lastValue>docs.length)
            lastValue = docs.length;
        if(firstValue>docs.length || firstValue > lastValue)
            return [];
        return docs.slice(firstValue - 1, lastValue);
    }

    sort(query, docs) {
        if(!query.orderBys || docs.length<2)
            return docs;
        const self = this;
        docs.sort( (doc1, doc2) => {
            const tuple1 = self.readTuple(doc1, query.orderBys);
            const tuple2 = self.readTuple(doc2, query.orderBys);
            return self.compareTuples(tuple1, tuple2, query.orderBys);
        });
        return docs;
    }

    compareTuples(tuple1, tuple2, orderBys) {
        for(let i=0;i<tuple1.length;i++) {
            const descending = i<orderBys.length ? orderBys[i].descending : false;
            if(i>=tuple2.length)
                return descending ? -1 : 1;
            const val1 = tuple1[i];
            const val2 = tuple2[i];
            if(val1==null && val2==null)
                continue;
            else if(val1==null)
                return descending ? 1 : -1;
            else if(val2==null)
                return descending ? -1 : 1;
            const res = val1 < val2 ? -1 : val2 < val1 ? 1 : 0;
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
        const docs = [];
        for (const dbId in this.iterDocuments) {
            const doc = this.iterDocuments[dbId];
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
    this.count = () => docs.length;
    this.totalCount = () => totalCount;
    this.iterator = () => {
        let index = 0;
        return {
            hasNext: function() { return index < docs.length; },
            next: function() { return docs[index++]; }
        };
    }
    return this;
}




exports.MemStore = MemStore;