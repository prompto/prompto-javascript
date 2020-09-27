function isNodeJs() {
    return typeof window === 'undefined' && typeof importScripts === 'undefined';
}

let path = null;
let fs = null;

if(isNodeJs()) {
    import("path").then(module => path = module);
    import("fs").then(module => fs = module);
}

function importPathIfNode() {
    return path;
}

function importFsIfNode() {
    return fs;
}

export { importPathIfNode, importFsIfNode }
export default { importPathIfNode, importFsIfNode }