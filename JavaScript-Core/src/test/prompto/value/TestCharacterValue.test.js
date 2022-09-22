var prompto = require("../../../main/prompto");

var CharacterValue = prompto.value.CharacterValue;

test('IsWhiteSpace', () => {
	expect(CharacterValue.isWhitespace(' ')).toBeTruthy();
	expect(CharacterValue.isWhitespace('\n')).toBeTruthy();
	expect(CharacterValue.isWhitespace('a')).toBeFalsy();
	expect(CharacterValue.isWhitespace('é')).toBeFalsy();
});
