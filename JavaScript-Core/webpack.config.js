var path = require('path');
var target_dir = path.resolve(__dirname, "../../prompto-factory/CodeFactory/CodeFactory/src/main/resources/js/lib/")

module.exports = {
    entry: './src/main/index-full.js',
    output: {
        path: target_dir,
        filename: 'prompto.core.bundle.js'
    },
    node: {
        module: "empty",
        net: "empty",
        fs: "empty"
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ["eslint-loader"]
            }
        ]
    },
    mode: "production",
    performance: {
        hints: false
    },
    devtool: "source-map"
};