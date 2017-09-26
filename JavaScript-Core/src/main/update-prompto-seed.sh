#!/usr/bin/env bash
cd /Users/ericvergnaud/Development/prompto/prompto-javascript/JavaScript-Core/src/main/
#webpack

#cd /Users/ericvergnaud/Development/prompto/prompto-platform/Server
#mvn install -DskipTests=true
#scp -i /Users/ericvergnaud/Development/prompto/prompto-keys/aws/prompto-admin.pem /Users/ericvergnaud/.m2/repository/org/prompto/Server/0.0.1-SNAPSHOT/Server-0.0.1-SNAPSHOT.jar root@eric.prompto.cloud:/v0.0.5/Server-0.0.10.jar

#cd /Users/ericvergnaud/Development/prompto/prompto-dev-center/DevCenter
#mvn install -DskipTests=true
scp -i /Users/ericvergnaud/Development/prompto/prompto-keys/aws/prompto-admin.pem /Users/ericvergnaud/.m2/repository/org/prompto/DevCenter/0.0.1-SNAPSHOT/DevCenter-0.0.1-SNAPSHOT.jar root@eric.prompto.cloud:/v0.0.5/DevCenter-0.0.5.jar

cd /Users/ericvergnaud/Development/prompto/prompto-javascript/JavaScript-Core/src/main/
