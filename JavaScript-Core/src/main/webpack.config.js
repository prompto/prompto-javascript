var path = require('path');
var target_dir = path.resolve(__dirname, "../../../../prompto-platform/Server/src/main/resources/js/lib/")

module.exports = {
    entry: './index.js',
    output: {
        path: target_dir,
        filename: 'prompto.core.bundle.js'
    },
    node: {
        module: "empty",
        net: "empty",
        fs: "empty"
    }
};