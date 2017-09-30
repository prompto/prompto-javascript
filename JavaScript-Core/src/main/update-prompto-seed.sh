#!/usr/bin/env bash

#webpack js runtime
#cd /Users/ericvergnaud/Development/prompto/prompto-javascript/JavaScript-Core/src/main/
#webpack

#copy latest Mongo
#cd /Users/ericvergnaud/Development/prompto/prompto-platform/MongoStore
#mvn install -DskipTests=true
#scp -i /Users/ericvergnaud/Development/prompto/prompto-keys/aws/prompto-admin.pem /Users/ericvergnaud/.m2/repository/org/prompto/MongoStore/0.0.1-SNAPSHOT/MongoStore-0.0.1-SNAPSHOT.jar root@eric.prompto.cloud:/v0.0.5/MongoStore-0.0.10.jar

#copy latest Server
#cd /Users/ericvergnaud/Development/prompto/prompto-platform/Server
#mvn install -DskipTests=true
#scp -i /Users/ericvergnaud/Development/prompto/prompto-keys/aws/prompto-admin.pem /Users/ericvergnaud/.m2/repository/org/prompto/Server/0.0.1-SNAPSHOT/Server-0.0.1-SNAPSHOT.jar root@eric.prompto.cloud:/v0.0.5/Server-0.0.10.jar


#copy latest DevCenter
#cd /Users/ericvergnaud/Development/prompto/prompto-dev-center/DevCenter
#mvn install -DskipTests=true
#scp -i /Users/ericvergnaud/Development/prompto/prompto-keys/aws/prompto-admin.pem /Users/ericvergnaud/.m2/repository/org/prompto/DevCenter/0.0.1-SNAPSHOT/DevCenter-0.0.1-SNAPSHOT.jar root@eric.prompto.cloud:/v0.0.5/DevCenter-0.0.5.jar

#copy all from local
scp -i /Users/ericvergnaud/Development/prompto/prompto-keys/aws/prompto-admin.pem -r /Users/ericvergnaud/Desktop/aws/v0.0.5/ root@eric.prompto.cloud:/

#copy config
#scp -i /Users/ericvergnaud/Development/prompto/prompto-keys/aws/prompto-admin.pem /Users/ericvergnaud/Development/prompto/prompto-deploy/aws/deploy-prompto-seed.yml root@eric.prompto.cloud:/config.yml


cd /Users/ericvergnaud/Development/prompto/prompto-javascript/JavaScript-Core/src/main/
