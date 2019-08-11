exports.AttributeParameter = require("./AttributeParameter").AttributeParameter;
exports.CategoryParameter = require("./CategoryParameter").CategoryParameter;
exports.ExtendedParameter = require("./ExtendedParameter").ExtendedParameter;
exports.CodeParameter = require("./CodeParameter").CodeParameter;
exports.UnresolvedParameter = require("./UnresolvedParameter").UnresolvedParameter;
exports.ParameterList = require("./ParameterList").ParameterList;

require("./ExtendedParameter").resolve();