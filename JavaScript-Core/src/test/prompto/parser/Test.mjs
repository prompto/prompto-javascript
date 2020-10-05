import prompto from "../../../main/prompto/index.js"

for(let name in prompto) {
    console.log(name);
    for(let subname in prompto[name]) {
        console.log(name + "." + subname);
    }
}


const code = "define name as Text attribute"
const parser = new prompto.parser.ECleverParser(code);
const lexer = parser.getTokenStream().tokenSource;
lexer.addLF = true;
const decls = parser.parse();
const decl = decls[0];
console.log(decl.toString());