var Value = require("./Value").Value;
var TextValue = require("./TextValue").TextValue;
var UUIDType = require("../type/UUIDType").UUIDType;
var UUID = require("../intrinsic/UUID").UUID;
var InvalidDataError = require("../error/InvalidDataError").InvalidDataError;

class UUIDValue extends Value {
   
    constructor(value) {
        if(typeof(value) == 'string') {
            value = UUID.fromString(value);
        }
        if(!(value instanceof UUID))
            throw new InvalidDataError("Not a UUID: " + typeof(value));
        super(UUIDType.instance);
        this.value = value;
    }

    toString() {
        return this.value.toString();
    }

    getStorableData() {
        return this.value.toString();
    }

    equals(obj) {
        if (obj instanceof UUIDValue) {
            return this.value.equals(obj.value);
        } else {
            return false;
        }
    }

    toDocumentValue(context) {
        return new TextValue(this.toString());
    }
}


exports.UUIDValue = UUIDValue;


