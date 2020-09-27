function isNodeJs() {
    return typeof window === 'undefined' && typeof importScripts === 'undefined';
}

function importPathIfNode() {
    return isNodeJs() ? import("path") : null;
}

function importFsIfNode() {
    return isNodeJs() ? import("fs") : null;
}

export { importPathIfNode, importFsIfNode }
export default { importPathIfNode, importFsIfNode }