import { Dialect, Location } from '../parser';
import { Token } from 'antlr4';
export default class Section {
    static merge(s1: Section, s2: Section): Section;
    path: string;
    startLocation: Location;
    endLocation: Location;
    dialect: Dialect;
    isBreakpoint: boolean;
    constructor();
    copySectionFrom(section: Section): void;
    setSectionFrom(path: string, start: Token | Location, end: Token | Location, dialect: Dialect): void;
    containsLine(line: number): boolean;
    locateSectionAtLine(line: number): Section | null;
    serialize(): object;
}
