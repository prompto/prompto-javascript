function MyClass() {
	this._id = null;
	this._name = null;
	this.display = null;
	return this;
};

Object.defineProperty(MyClass.prototype, "id", {
	get : function() {
		return this._id;
	},
	set : function(value) {
		this._id = value;
		this.computeDisplay();
	}
});

Object.defineProperty(MyClass.prototype, "name", {
	get : function() {
		return this._name;
	},
	set : function(value) {
		this._name = value;
		this.computeDisplay();
	}
});

MyClass.prototype.computeDisplay = function() {
	this.display = "/id=" + this._id + "/name=" + this._name;
};

MyClass.prototype.printDisplay = function() {
	process.stdout.write(this.display);
};

MyClass.boolValue = function() {
	return true;
};

MyClass.intValue = function() {
	return 123;
};

MyClass.intObject = function() {
	return 123;
};

MyClass.longValue = function() {
	return 123;
};

MyClass.longObject = function() {
	return 123;
};

MyClass.characterValue = function() {
	return 'Z';
};

exports.MyClass = MyClass;

