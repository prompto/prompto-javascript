var BaseStatement = require("./BaseStatement").BaseStatement;

class SimpleStatement extends BaseStatement {
    constructor() {
        super();
        return this;
    }

    isSimple() {
        return true;
    }
}


exports.SimpleStatement = SimpleStatement;
