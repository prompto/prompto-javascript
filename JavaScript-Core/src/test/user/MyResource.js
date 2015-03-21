var content = null;

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
	return content;
};

MyResource.prototype.writeFully = function(data) {
	content = data;
};

exports.MyResource = MyResource;
exports.setContent = function(data) {
	content = data;
}