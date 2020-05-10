var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

test('Blob', () => {
	compareResourceEME('documents/blob.pec');
});

test('DeepItem', () => {
	compareResourceEME('documents/deepItem.pec');
});

test('DeepMember', () => {
	compareResourceEME('documents/deepMember.pec');
});

test('Instance', () => {
	compareResourceEME('documents/instance.pec');
});

test('Item', () => {
	compareResourceEME('documents/item.pec');
});

test('Literal', () => {
	compareResourceEME('documents/literal.pec');
});

test('Member', () => {
	compareResourceEME('documents/member.pec');
});

test('NamedItem', () => {
	compareResourceEME('documents/namedItem.pec');
});

