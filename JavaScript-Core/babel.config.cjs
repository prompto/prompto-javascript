// babel.config.js
module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: "> 0.25%, not dead"
            },
        ],
    ],
    plugins: ["@babel/plugin-proposal-class-properties", "@babel/plugin-transform-classes"],
    compact : true
};