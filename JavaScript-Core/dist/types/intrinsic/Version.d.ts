export default class Version {

    static parse(s: string): Version;

    major: number;
    minor: number;
    fix: number;

    cmp(value: Version): number;
    qualifierToString(): string;
}
