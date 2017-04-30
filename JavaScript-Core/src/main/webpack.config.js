module.exports = {
    entry: './index.js',
    output: {
        path: '../../../../prompto-platform/Server/src/main/resources/js/lib/',
        filename: 'prompto.core.bundle.js'
    },
    node: {
        module: "empty",
        net: "empty",
        fs: "empty"
    }
};