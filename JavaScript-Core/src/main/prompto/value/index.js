exports.Value = require('./Value').Value;
exports.Any = require('./Any').Any;
exports.Bool = require('./Bool').Bool;
exports.Blob = require('./Blob').Blob;
exports.Image = require('./Image').Image;
exports.Integer = require('./Integer').Integer;
exports.Decimal = require('./Decimal').Decimal;
exports.Character = require('./Character').Character;
exports.Text = require('./Text').Text;
exports.TupleValue = require('./TupleValue').TupleValue;
exports.ListValue = require('./ListValue').ListValue;
exports.SetValue = require('./SetValue').SetValue;
exports.Dictionary = require('./Dictionary').Dictionary;
exports.LocalDate = require('./LocalDate').LocalDate;
exports.Time = require('./Time').Time;
exports.Version = require('./Version').Version;
exports.Cursor = require('./Cursor').Cursor;
exports.DateTime = require('./DateTime').DateTime;
exports.Document = require('./Document').Document;
exports.TypeValue = require('./TypeValue').TypeValue;
exports.ClosureValue = require('./ClosureValue').ClosureValue;
exports.IteratorValue = require('./IteratorValue').IteratorValue;
exports.UUIDValue = require('./UUIDValue').UUIDValue;

require('./ConcreteInstance').resolve();
require('./CharacterRange').resolve();
require('./IntegerRange').resolve();
require('./DateRange').resolve();
require('./TimeRange').resolve();
require('./Character').resolve();
require('./Integer').resolve();
require('./Decimal').resolve();
require('./Version').resolve();
require('./DateTime').resolve();
require('./Time').resolve();
require('./ListValue').resolve();
require('./SetValue').resolve();
require('./TupleValue').resolve();
require('./LocalDate').resolve();
require('./Value').resolve();
