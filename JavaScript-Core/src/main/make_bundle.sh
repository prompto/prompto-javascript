# call 'npm install webpack' to install webpack cmd in node_modules
./node_modules/.bin/webpack
# the below will gzip the output in prompto-platform/Server resources
SERVER_DIR=../../../../prompto-platform/Server/src/main/resources/js/lib
gzip -c $SERVER_DIR/prompto.core.bundle.js > $SERVER_DIR/prompto.core.bundle.js.gz