const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const target_dir = path.resolve(__dirname, "../../prompto-factory/CodeFactory/CodeFactory/src/main/resources/js/lib/")

const terser_options = {
    // do not generate LICENSE file
    extractComments: false,
    terserOptions: { mangle: { reserved: [ "LocalDate", "LocalTime", "DateTime", "Period", "UUID", "Version", "List", "Document", "StrictSet", "Dictionary" ] } }
};
const terser_plugin = new TerserPlugin(terser_options);

module.exports = {
    entry: './src/main/index.ts',
    output: {
        globalObject: 'this',
        path: target_dir,
        filename: 'prompto.core.bundle.js'
    },
    optimization: {
        minimizer : [ terser_plugin ]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /(node_modules | antlr4)/,
                use: [
                        'ts-loader'
                    ]
            }
        ]
    },
    mode: "production",
    performance: {
        hints: false
    },
    plugins: [
        new CompressionPlugin()
    ],
    devtool: "source-map"
};
