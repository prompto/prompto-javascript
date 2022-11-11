import Section from '../parser/Section';
export default class Identifier extends Section {
    static DB_ID: Identifier;
    name: string;
    constructor(name: string);
    toString(): string;
    equals(other: object): boolean;
}
