module.exports = {
    entry: './JavaScript-Core/src/main/index.js',
    output: {
        path: './',
        filename: 'prompto.bundle.js'
    },
    node: {
        module: "empty",
        net: "empty",
        fs: "empty"
    }
};