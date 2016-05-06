var contents = {};

function MyResource() {
	this.path = null;
	return this;
}

MyResource.prototype.isReadable = function() {
	return true;
};

MyResource.prototype.isWritable = function() {
	return true;
};

MyResource.prototype.close = function() {
};

MyResource.prototype.readFully = function() {
	return contents[this.path];
};

MyResource.prototype.writeFully = function(data) {
    contents[this.path] = data;
};


Object.defineProperty(MyResource.prototype, "content", {
    set: function(value) {
        contents[this.path] = value;
    }
});

exports.MyResource = MyResource;
