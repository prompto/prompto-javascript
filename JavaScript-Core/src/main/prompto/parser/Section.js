import { Location } from './index.js'

export default class Section {

    static merge(s1, s2) {
        const section = new Section();
        section.setSectionFrom(s1.path, Location.min(s1.startLocation, s2.startLocation), Location.max(s1.endLocation, s2.endLocation), s1.dialect);
        return section;
    }

    constructor(section) {
        this.path = "";
        this.startLocation = null;
        this.endLocation = null;
        this.dialect = null;
        this.isBreakpoint = null;
    }

    copySectionFrom(section) {
        this.path = section.path;
        this.startLocation = section.startLocation;
        this.endLocation = section.endLocation;
        this.dialect = section.dialect;
        this.isBreakpoint = section.isBreakpoint || null;
    }

    setSectionFrom(path, start, end, dialect) {
        this.path = path;
        this.startLocation = new Location(start);
        this.endLocation = new Location(end, true);
        this.dialect = dialect;
        this.isBreakpoint = false;
    }

    containsLine(line) {
        return this.startLocation.line <= line && this.endLocation.line >= line;
    }

    locateSectionAtLine(line) {
        return (this.startLocation.line <= line && this.endLocation.line >= line) ? this : null;
    }

    serialize() {
        // return an object that can pass through PostMessage and is aligned on server-side debugger Section definition
        return {
            type: "Section",
            value: {
                path: this.path,
                startLocation: this.startLocation.serialize(),
                endLocation: this.endLocation.serialize(),
                dialect: this.dialect.name,
                isBreakpoint: this.isBreakpoint
            }
        };
    }
}
