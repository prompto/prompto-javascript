export default class Version {
    major: number;
    minor: number;
    fix: number;

    cmp(value: Version): number;
    qualifierToString(): string;
}
