
export default class Store {
  
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



