var AlwaysValidator = require("./AlwaysValidator").AlwaysValidator;

function Property() {
    this.name = null;
    this.help = null;
    this._validator = AlwaysValidator.instance;
    return this;
}

Object.defineProperty(Property.prototype, "validator", {
    get : function() {
        return this._validator;
    },
    set : function(validator) {
        if(this._validator.isRequired())
            this._validator = validator.required();
        else
            this._validator = validator.optional();
    }
});


Property.prototype.validate = function(context, jsxProperty) {
    this._validator.validate(context, jsxProperty);
};


Property.prototype.isRequired = function() {
    return this._validator.isRequired();
};


Property.prototype.setRequired = function(set) {
    this._validator = set ? this._validator.required() : this._validator.optional();
};

exports.Property = Property;