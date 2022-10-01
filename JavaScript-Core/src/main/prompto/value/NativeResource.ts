import NativeInstance from './NativeInstance'
import {Context} from "../runtime";
import {NativeResourceDeclaration} from "../declaration";
import {IResource} from "./index";

export default class NativeResource extends NativeInstance implements IResource {
  
    constructor(context: Context, declaration: NativeResourceDeclaration, instance?: any) {
        super(context, declaration, instance);
    }

    get resource(): IResource {
        return this.value as IResource;
    }

    isReadable() {
        return this.resource.isReadable();
    }

    isWritable() {
        return this.resource.isWritable();
    }

    readBinary() {
        return this.resource.readBinary();
    }

    readFully() {
        return this.resource.readFully();
    }

    writeFully(data: string, callback?: (s: string) => void) {
        this.resource.writeFully(data, callback);
    }

    readLine() {
        return this.resource.readLine();
    }

    writeLine(data: string) {
        this.resource.writeLine(data);
    }

    close() {
        this.resource.close();
    }
}

