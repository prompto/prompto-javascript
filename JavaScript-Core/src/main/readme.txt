To keep things isolated, the javascript code is split into 3 directories:
 1) JavaScript-Core/src/generated: contains the antlr4 generated parser code
 2) JavaScript-Core/src/main: contains the interpreter code
 3) JavaScript-Runtime/src/main: contains the native javascript code for Prompto runtime library
Running Node tests across 3 directories is achieved using exploded.js, which given a set of roots is able to resolve required modules.
Webpack is achieved using in dir 2 softlinks to dir 1 or dir 3 files or dirs.
However, for webpack to succeed, npm dependencies need to be installed in the overarching dir:
 - cd to prompto-javascript
 - run npm install (requires sudo)
 - cd to JavaScript-Core/src/main
 - run webpack
