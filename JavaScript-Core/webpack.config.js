var path = require('path');
var target_dir = path.resolve(__dirname, "../../prompto-factory/CodeFactory/CodeFactory/src/main/resources/js/lib/")

module.exports = {
    entry: './src/main/prompto/index.js',
    output: {
        path: target_dir,
        filename: 'prompto.core.bundle.js'
    },
    node: {
        module: "empty",
        net: "empty",
        fs: "empty"
    },
    mode: "production",
    performance: {
        hints: false
    }
};