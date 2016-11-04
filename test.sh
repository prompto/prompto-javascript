ls -all Javascript-Core/
ls -all Javascript-Core/src/
ls -all Javascript-Core/src/test/
ls -all Javascript-Core/src/test/prompto/
ls -all Javascript-Core/src/test/prompto/runtime/
ls -all Javascript-Core/src/test/prompto/runtime/context/

cd Javascript-Core/src/test/prompto/runtime/context/
nodeunit ./
cd $TRAVIS_BUILD_DIR
cd Javascript-Core/src/test/prompto/runtime/e/
nodeunit ./
cd $TRAVIS_BUILD_DIR
cd Javascript-Core/src/test/prompto/runtime/o/
nodeunit ./
cd $TRAVIS_BUILD_DIR
cd Javascript-Core/src/test/prompto/parser/e/
nodeunit ./
cd $TRAVIS_BUILD_DIR
cd Javascript-Core/src/test/prompto/parser/o/
nodeunit ./
cd $TRAVIS_BUILD_DIR
cd Javascript-Core/src/test/prompto/translate/eoe/
nodeunit ./
cd $TRAVIS_BUILD_DIR
cd Javascript-Core/src/test/prompto/translate/ese/
nodeunit ./
cd $TRAVIS_BUILD_DIR
cd Javascript-Core/src/test/prompto/translate/oeo/
nodeunit ./
cd $TRAVIS_BUILD_DIR
cd Javascript-Core/src/test/prompto/translate/oso/
nodeunit ./
cd $TRAVIS_BUILD_DIR
cd Javascript-Runtime/src/test/library/e/
nodeunit ./
cd $TRAVIS_BUILD_DIR
cd Javascript-Runtime/src/test/library/reader/
nodeunit ./
cd $TRAVIS_BUILD_DIR

# to debug a failing test:
# place a 'debugger' instruction where you want to break
# run the below in a shell
# cd $ROOT_DIR/Javascript-Core/src/test/prompto/runtime/e/
# node --debug-brk `which nodeunit` TestNative.js (or whatever)
# in another shell, run: node-inspector
# point a browser to http://127.0.0.1:8080/?port=5858
