import prompto from "../../../main/prompto/index.js"

const code = "define name as Text attribute"
const parser = new prompto.parser.ECleverParser(code);
const lexer = parser.getTokenStream().tokenSource;
lexer.addLF = addLF;
