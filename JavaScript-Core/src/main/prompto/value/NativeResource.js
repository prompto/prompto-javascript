var NativeInstance = require("./NativeInstance").NativeInstance;

function NativeResource(context, declaration) {
	NativeInstance.call(this, context, declaration);
	return this;
}

NativeResource.prototype = Object.create(NativeInstance.prototype);
NativeResource.prototype.constructor = NativeResource;

NativeResource.prototype.isReadable = function() {
	return this.instance.isReadable();
};

NativeResource.prototype.isWritable = function() {
	return this.instance.isWritable();
};

NativeResource.prototype.readBinary = function() {
	return this.instance.readBinary();
};

NativeResource.prototype.readFully = function() {
	return this.instance.readFully();
};

NativeResource.prototype.writeFully = function(data) {
	this.instance.writeFully(data);
};

NativeResource.prototype.readLine = function() {
    return this.instance.readLine();
};

NativeResource.prototype.writeLine = function(data) {
    this.instance.writeLine(data);
};

NativeResource.prototype.close = function() {
	this.instance.close();
};

exports.NativeResource = NativeResource;
