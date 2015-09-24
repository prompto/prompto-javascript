var CategoryType = require("./CategoryType").CategoryType;


function EnumeratedCategoryType(id) {
	CategoryType.call(this, id);
	return this;
}

EnumeratedCategoryType.prototype = Object.create(CategoryType.prototype);
EnumeratedCategoryType.prototype.constructor =  EnumeratedCategoryType;

/*
	@Override
	public IType checkMember(Context context, String name) throws SyntaxError {
		if ("value".equals(name))
			return this;
		else if ("name".equals(name))
			return TextType.instance();
		else
			return super.checkMember(context, name);
	}

*/

exports.EnumeratedCategoryType = EnumeratedCategoryType;