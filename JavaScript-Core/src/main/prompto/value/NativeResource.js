import NativeInstance from './NativeInstance.js'

export default class NativeResource extends NativeInstance {
  
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

    writeFully(data, callback) {
        this.instance.writeFully(data, callback);
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

