#!/bin/bash

# FACTORY_DIR taken from webpack.config.cjs
FACTORY_DIR=../../prompto-factory/CodeFactory/CodeFactory/src/main/resources/js/lib
DOCS_DIR=../../prompto-docs/WebSite/src/web/public/js/lib
cp -f $FACTORY_DIR/prompto.core.bundle.js $DOCS_DIR
cp -f $FACTORY_DIR/prompto.core.bundle.js.gz $DOCS_DIR
cp -f $FACTORY_DIR/prompto.core.bundle.js.map $DOCS_DIR
cp -f $FACTORY_DIR/prompto.core.bundle.js.map.gz $DOCS_DIR
