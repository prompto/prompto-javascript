class Specificity {
    constructor(ordinal, name) {
        this.ordinal = ordinal;
        this.name = name;
        return this;
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
Specificity.IMPLICIT = new Specificity(1, "IMPLICIT");
Specificity.INHERITED = new Specificity(2, "INHERITED");
Specificity.EXACT = new Specificity(3, "EXACT");
Specificity.DERIVED = new Specificity(4, "DERIVED");

exports.Specificity = Specificity;