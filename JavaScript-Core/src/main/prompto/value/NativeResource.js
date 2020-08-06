const NativeInstance = require("./NativeInstance").NativeInstance;

class NativeResource extends NativeInstance {
  
    constructor(context, declaration) {
        super(context, declaration);
    }

    isReadable() {
        return this.instance.isReadable();
    }

    isWritable() {
        return this.instance.isWritable();
    }

    readBinary() {
        return this.instance.readBinary();
    }

    readFully() {
        return this.instance.readFully();
    }

    writeFully(data) {
        this.instance.writeFully(data);
    }

    readLine() {
        return this.instance.readLine();
    }

    writeLine(data) {
        this.instance.writeLine(data);
    }

    close() {
        this.instance.close();
    }
}

exports.NativeResource = NativeResource;
