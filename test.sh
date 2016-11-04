nodeunit Javascript-Core/src/test/prompto/runtime/context/
nodeunit Javascript-Core/src/test/prompto/runtime/e/
nodeunit Javascript-Core/src/test/prompto/runtime/o/
nodeunit Javascript-Core/src/test/prompto/parser/e/
nodeunit Javascript-Core/src/test/prompto/parser/o/
nodeunit Javascript-Core/src/test/prompto/translate/eoe/
nodeunit Javascript-Core/src/test/prompto/translate/ese/
nodeunit Javascript-Core/src/test/prompto/translate/oeo/
nodeunit Javascript-Core/src/test/prompto/translate/oso/
nodeunit Javascript-Runtime/src/test/library/e/
nodeunit Javascript-Runtime/src/test/library/reader/

# to debug a failing test:
# place a 'debugger' instruction where you want to break
# run the below in a shell
# cd $ROOT_DIR/Javascript-Core/src/test/prompto/runtime/e/
# node --debug-brk `which nodeunit` TestNative.js (or whatever)
# in another shell, run: node-inspector
# point a browser to http://127.0.0.1:8080/?port=5858
