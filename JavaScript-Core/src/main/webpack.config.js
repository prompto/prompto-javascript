module.exports = {
    entry: './index.js',
    output: {
        path: './',
        filename: 'prompto.bundle.js'
    },
    node: {
        module: "empty",
        fs: "empty"
    }
};