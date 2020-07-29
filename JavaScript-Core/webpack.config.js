var path = require('path');
var target_dir = path.resolve(__dirname, "../../prompto-factory/CodeFactory/CodeFactory/src/main/resources/js/lib/")

module.exports = {
    entry: './src/main/index-full.js',
    output: {
        globalObject: 'this',
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
                exclude: [/node_modules/,/antlr4/],
                use: ["eslint-loader"]
            }
        ]
    },
    externals: [
        "fibers",
    ],
    mode: "production",
    performance: {
        hints: false
    },
    devtool: "source-map"
};