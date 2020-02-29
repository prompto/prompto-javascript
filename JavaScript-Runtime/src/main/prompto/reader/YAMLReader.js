var yaml = require("js-yaml");


exports.yamlRead = function (text) {
    return yaml.safeLoadAll(text);
};