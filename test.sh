nodeunit JavaScript-Core/src/test/prompto/runtime/context/
nodeunit JavaScript-Core/src/test/prompto/runtime/e/
nodeunit JavaScript-Core/src/test/prompto/runtime/o/
nodeunit JavaScript-Core/src/test/prompto/parser/e/
nodeunit JavaScript-Core/src/test/prompto/parser/o/
nodeunit JavaScript-Core/src/test/prompto/translate/eoe/
nodeunit JavaScript-Core/src/test/prompto/translate/ese/
nodeunit JavaScript-Core/src/test/prompto/translate/oeo/
nodeunit JavaScript-Core/src/test/prompto/translate/oso/
nodeunit JavaScript-Runtime/src/test/library/e/
nodeunit JavaScript-Runtime/src/test/library/reader/

# to debug a failing test:
# place a 'debugger' instruction where you want to break
# run the below in a shell
# cd $ROOT_DIR/JavaScript-Core/src/test/prompto/runtime/e/
# node --debug-brk `which nodeunit` TestNative.js (or whatever)
# in another shell, run: node-inspector
# point a browser to http://127.0.0.1:8080/?port=5858
