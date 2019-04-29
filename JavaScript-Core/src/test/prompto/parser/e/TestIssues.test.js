var Out = require("../../runtime/utils/Out").Out;
var interpretResource = require("../../parser/BaseEParserTest").interpretResource;

beforeEach(() => {
	Out.init();
});

afterEach(() => {
	Out.restore();
});

test('Minimal', () => {
	interpretResource("issues/minimal.pec","main",null);
});
