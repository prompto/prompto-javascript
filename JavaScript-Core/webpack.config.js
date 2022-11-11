// import CompressionPlugin from 'compression-webpack-plugin';
// import TerserPlugin from 'terser-webpack-plugin';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// const target_dir = path.resolve(__dirname, "../../prompto-factory/CodeFactory/CodeFactory/src/main/resources/js/lib/")
import CopyPlugin from "copy-webpack-plugin";

const terser_options = {
    // do not generate LICENSE file
    extractComments: false,
    terserOptions: { mangle: { reserved: [ "LocalDate", "LocalTime", "DateTime", "Period", "UUID", "Version", "List", "Document", "StrictSet", "Dictionary" ] } }
};
// const terser_plugin = new TerserPlugin(terser_options);

const copy_options = {
    patterns: [
        { from: "src/main/prompto/intrinsic/*.d.ts", to: "types/intrinsic/[name][ext]" },
        { from: "src/main/prompto/error/*.d.ts", to: "types/error/[name][ext]" }
    ]
}

const config = {
    entry: './src/main/prompto/index.ts',
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: 'ts-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        //     path: target_dir,
        globalObject: 'this',
        filename: 'prompto.core.bundle.js',
        library: {
            type: "module"
        }
    },
    optimization: {
        // minimizer : [ terser_plugin ]
    },
    mode: "production",
    performance: {
        hints: false
    },
    plugins: [
        // new CompressionPlugin()
        new CopyPlugin(copy_options)
    ],
    devtool: "source-map",
    experiments: {
        outputModule: true
    },
    target: "node16"
};

export default config;
