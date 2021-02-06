export default class Specificity {

    constructor(ordinal, name) {
        this.ordinal = ordinal;
        this.name = name;
    }

    moreSpecificThan(other) {
        // DERIVED, EXACT, INHERITED, IMPLICIT
        return this.ordinal > other.ordinal;
    }

    toString() {
        return this.name;
    }
}

Specificity.INCOMPATIBLE = new Specificity(0, "INCOMPATIBLE");
Specificity.INHERITED = new Specificity(1, "INHERITED");
Specificity.EXACT = new Specificity(2, "EXACT");
Specificity.DERIVED = new Specificity(3, "DERIVED");
