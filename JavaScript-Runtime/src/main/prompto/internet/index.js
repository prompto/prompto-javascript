exports.Html = require('./Html');
exports.Url = require('./Url').Url;
// the below is needed for webpack only, nodejs uses Html.js
exports.HtmlEncoder = require('./HtmlEncoder');
exports.htmlEncode = exports.HtmlEncoder.htmlEncode;
exports.htmlDecode = exports.HtmlEncoder.htmlDecode;
exports.Window = require('./Window');
exports.openWindow = exports.Window.openWindow;
var FileRefModule = require('./FileRef');
exports.FileRef = FileRefModule.FileRef;
exports.selectFileRef = FileRefModule.selectFileRef;
