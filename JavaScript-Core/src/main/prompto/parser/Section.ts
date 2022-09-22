import { Dialect, Location } from '../parser'
import { Token } from 'antlr4';

export default class Section {

    static merge(s1: Section, s2: Section) {
        const section = new Section();
        section.setSectionFrom(s1.path, Location.min(s1.startLocation, s2.startLocation), Location.max(s1.endLocation, s2.endLocation), s1.dialect);
        return section;
    }

    path: string;
    startLocation: Location;
    endLocation: Location;
    dialect: Dialect;
    isBreakpoint: boolean;

    constructor() {
        // this.path = "";
        // this.startLocation = null;
        // this.endLocation = null;
        // this.dialect = null;
        // this.isBreakpoint = null;
    }

    copySectionFrom(section: Section) {
        this.path = section.path;
        this.startLocation = section.startLocation;
        this.endLocation = section.endLocation;
        this.dialect = section.dialect;
        this.isBreakpoint = section.isBreakpoint;
    }

    setSectionFrom(path: string, start: Token | Location, end: Token | Location, dialect: Dialect): void {
        this.path = path;
        this.startLocation = start instanceof Location ? start : new Location(start);
        this.endLocation = end instanceof Location ? end : new Location(end, true);
        this.dialect = dialect;
        this.isBreakpoint = false;
    }

    containsLine(line: number): boolean {
        return this.startLocation.line <= line && this.endLocation.line >= line;
    }

    locateSectionAtLine(line: number): Section | null {
        return (this.startLocation.line <= line && this.endLocation.line >= line) ? this : null;
    }

    serialize(): object {
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
