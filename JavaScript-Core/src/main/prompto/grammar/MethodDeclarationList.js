const ObjectList = require("../utils/ObjectList").ObjectList;

class MethodDeclarationList extends ObjectList {
    constructor(method) {
        super(null, method);
        return this;
    }
}

exports.MethodDeclarationList = MethodDeclarationList;
