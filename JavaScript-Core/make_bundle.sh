# 'npm install webpack' will install webpack cmd in node_modules
yarn build
FACTORY_DIR=../../prompto-factory/CodeFactory/CodeFactory/src/main/resources/js/lib
gzip -c $FACTORY_DIR/prompto.core.bundle.js > $FACTORY_DIR/prompto.core.bundle.js.gz
DOCS_DIR=../../prompto-docs/WebSite/src/web/public/js/lib
cp -f $FACTORY_DIR/prompto.core.bundle.js $DOCS_DIR
cp -f $FACTORY_DIR/prompto.core.bundle.js.map $DOCS_DIR
cp -f $FACTORY_DIR/prompto.core.bundle.js.gz $DOCS_DIR

