export TESTS=Javascript-Core/src/test
export OUTPUT=Javascript-Core/test-results
export NODEUNIT="nodeunit --reporter junit --output"
$NODEUNIT $OUTPUT/runtime-context $TESTS/prompto/runtime/context/ || true
$NODEUNIT $OUTPUT/runtime-e $TESTS/prompto/runtime/e/ || true
$NODEUNIT $OUTPUT/runtime-o $TESTS/prompto/runtime/o/ || true
$NODEUNIT $OUTPUT/parser-e $TESTS/prompto/parser/e/ || true
$NODEUNIT $OUTPUT/parser-o $TESTS/prompto/parser/o/ || true
$NODEUNIT $OUTPUT/translate-eoe $TESTS/prompto/translate/eoe/ || true
$NODEUNIT $OUTPUT/translate-ese $TESTS/prompto/translate/ese/ || true
$NODEUNIT $OUTPUT/translate-oeo $TESTS/prompto/translate/oeo/ || true
$NODEUNIT $OUTPUT/translate-oso $TESTS/prompto/translate/oso/ || true
$NODEUNIT $OUTPUT/utils $TESTS/prompto/utils/ || true
$NODEUNIT $OUTPUT/value $TESTS/prompto/value/ || true
export TESTS=Javascript-Runtime/src/test
$NODEUNIT $OUTPUT/library-e $TESTS/library/e/ || true
$NODEUNIT $OUTPUT/reader $TESTS/reader || true
exit 1