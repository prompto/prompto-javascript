declare -i RESULT=0

echo "Testing JavaScript-Core..."
cd JavaScript-Core
yarn install
yarn test
RESULT+=$?
cd ..

echo "Testing JavaScript-Core..."
cd JavaScript-Runtime
yarn install
yarn test
RESULT+=$?
cd ..

echo ""
exit $RESULT
