export default class AuditRecord {

    asDocument() {
        const doc = {};
        doc["dbId"] = this.dbId;
        doc["metadataDbId"] = this.metadataDbId;
        doc["utcTimeStamp"] = this.utcTimestamp;
        doc["instanceDbId"] = this.instanceDbId;
        doc["operation"] = this.operation;
        if(this.instance)
            doc["instance"] = this.convertInstance(this.instance.document);
        return doc
    }

    convertInstance(instance) {
        const doc = {};
        Object.getOwnPropertyNames(instance).forEach(name => doc[name] = this.convertValue(instance[name]), this);
        return doc
    }

    convertValue(value) {
        if (value === null)
            return null
        else
            return value; // TODO convert to Prompto native types if required
    }


    matches(auditPredicates, instancePredicates) {
        if ((auditPredicates ? Object.keys(auditPredicates).length : 0) + (instancePredicates ? Object.keys(instancePredicates).length : 0) === 0)
            return false;
        else
            return (auditPredicates ? this.auditMatchesAll(auditPredicates) : true) && (instancePredicates ? this.instanceMatchesAll(instancePredicates) : true);
    }

    auditMatchesAll(predicates) {
        return Object.keys(predicates).every( key => this.auditMatches(key, predicates[key]), this);
    }

    instanceMatchesAll(predicates) {
        return this.instance && Object.keys(predicates).every( key => this.instanceMatches(key, predicates[key]), this);
    }

    auditMatches(name, value) {
        return value && value.equals ? value.equals(this[name]) : value === this[name];
    }

    instanceMatches(name, value) {
        const actual = this.instance.document[name];
        return value && value.equals ? value.equals(actual) : value === actual;
    }
}