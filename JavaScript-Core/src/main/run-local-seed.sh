#!/usr/bin/env bash

#webpack prompto
cd /Users/ericvergnaud/Development/prompto/prompto-javascript/JavaScript-Core/src/main/
webpack

#bump core version
#cd /Users/ericvergnaud/Development/prompto/prompto-java
#mvn versions:set -DnewVersion=0.0.10 -DgenerateBackupPoms=false
#mvn install -DskipTests

#bump platform version
#cd /Users/ericvergnaud/Development/prompto/prompto-platform
#mvn versions:set -DnewVersion=0.0.10 -DgenerateBackupPoms=false
#mvn install -DskipTests

#bump server version
cd /Users/ericvergnaud/Development/prompto/prompto-platform/Server
mvn install -DskipTests
cp -f /Users/ericvergnaud/.m2/repository/org/prompto/Server/0.0.10/Server-0.0.10.jar /Users/ericvergnaud/Desktop/aws/v0.0.5/Server-0.0.10.jar

#bump dev-center version
cd /Users/ericvergnaud/Development/prompto/prompto-dev-center/DevCenter
mvn install -DskipTests
mvn dependency:copy-dependencies -f /Users/ericvergnaud/.m2/repository/org/prompto/DevCenter/0.0.1-SNAPSHOT/DevCenter-0.0.1-SNAPSHOT.pom -DoutputDirectory=/Users/ericvergnaud/Desktop/aws/v0.0.5/
cp -f /Users/ericvergnaud/.m2/repository/org/prompto/DevCenter/0.0.1-SNAPSHOT/DevCenter-0.0.1-SNAPSHOT.jar /Users/ericvergnaud/Desktop/aws/v0.0.5/DevCenter-0.0.5.jar

cd /Users/ericvergnaud/Desktop/aws/v0.0.5/
java -jar DevCenter-0.0.5.jar -yamlConfigFile ../config.yml

cd /Users/ericvergnaud/Development/prompto/prompto-javascript/JavaScript-Core/src/main/
