import { Location } from "./index"

export default class Section {

    constructor(section) {
        section = section || { path : "", start : null, end : null, dialect : null, breakpoint : null };
        this.copySectionFrom(section);
    }

    copySectionFrom(section) {
        this.path = section.path;
        this.start = section.start;
        this.end = section.end;
        this.dialect = section.dialect;
        this.breakpoint = section.breakpoint;
    }

    setSectionFrom(path, start, end, dialect) {
        this.path = path;
        this.start = new Location(start);
        this.end = new Location(end, true);
        this.dialect = dialect;
        this.breakpoint = false;
    }

    containsLine(line) {
        return this.start.line <= line && this.end.line >= line;
    }

    asObject() {
        // return an object that can pass through PostMessage and is aligned on server-side debugger Section definition
        return { path : this.path, start : this.start.asObject(), end : this.end.asObject(), dialect : this.dialect.name, breakpoint : this.breakpoint };
    }
}
