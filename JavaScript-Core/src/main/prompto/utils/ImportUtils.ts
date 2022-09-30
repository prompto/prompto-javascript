function isNodeJs() {
    return typeof window == 'undefined' && typeof importScripts == 'undefined';
}

function importPathIfNode(): typeof import("path") | null {
    if(isNodeJs()) {
        let path: typeof import("path") | null = null;
        import(/* webpackMode: "weak" */"path").then(module => path = module, reason => console.log(reason));
        return path;
    } else
        return null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function importFsIfNode(): typeof import("fs") | null {
    if(isNodeJs()) {
        let fs: typeof import("fs") | null = null;
        import(/* webpackMode: "weak" */"fs").then(module => fs = module, reason => console.log(reason));
        return fs;
    } else
        return null;
}

export { importPathIfNode, importFsIfNode }
