import { importFsIfNode } from './ImportUtils';

let fileExists: (path: string) => boolean = () => false;

if(importFsIfNode != null) {
    const fs : typeof import("fs") = importFsIfNode as unknown as typeof import("fs");
    fileExists = fs.existsSync;
}

export { fileExists }
