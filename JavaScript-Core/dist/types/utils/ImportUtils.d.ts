declare function importPathIfNode(): typeof import("path") | null;
declare function importFsIfNode(): typeof import("fs") | null;
export { importPathIfNode, importFsIfNode };
