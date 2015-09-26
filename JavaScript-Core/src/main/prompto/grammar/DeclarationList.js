var ObjectList = require("../utils/ObjectList").ObjectList;

function DeclarationList(items, item) {
	items = items || [];
	ObjectList.call(this, items);
	item = item || null;
	if(item!==null) {
		this.add(item);
	}
	return this;
}

DeclarationList.prototype = Object.create(ObjectList.prototype);
DeclarationList.prototype.constructor = DeclarationList;

DeclarationList.prototype.register = function(context) {
    this.map(function(decl) { decl.register(context); });
};

DeclarationList.prototype.unregister = function(context) {
    this.map(function(decl) { decl.unregister(context); });
};

DeclarationList.prototype.check = function(context) {
    this.map(function(decl) { decl.check(context); });
};

DeclarationList.prototype.toDialect = function(writer) {
    this.map(function(decl) {
        decl.toDialect(writer);
        writer.append("\n");
    });
};

/*

public ConcreteMethodDeclaration findMain() {
	for(IDeclaration declaration : this) {
		if(!(declaration instanceof ConcreteMethodDeclaration))
			continue;
		ConcreteMethodDeclaration method = (ConcreteMethodDeclaration)declaration;
		if(!(method.getName().equals("main")))
			continue;
		// TODO check proto
		return method;
	}
	return null;
}
	
*/

exports.DeclarationList = DeclarationList;