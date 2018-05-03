# Distributed system project
## Kafka based distributed system PoC with KeystoneJS CMS and MongoDB Replica Set

### Dockerized

- [X] Nginx
- [X] KeystoneJS
- [ ] Consumer App
- [X] Zookeeper
- [X] Kafka
- [X] MongoDB
- [X] Kafka Connect

### Brief description

Basic idea is that KeystoneJS Apps will work as Kafka producers via Kafka Connect (MongDB Connector). Connector will read MongoDB Replica Set oplog (operations log); whenever something is written in MongoDB those will also be produced as Kafka Messages via MongoDB Connector, which any Consumer App would be able to consume. System implementation consists Nginx which works as load balancer to KeystoneJS instances.

### Usage
```
# Using Debezium 0.7 version, add export variable to bash profile
export DEBEZIUM_VERSION=0.7

# Run docker applications
docker-compose up

# Eventually we haven't yet initialized MongoDB Replica Set for Keystone instances so first docker-compose up will fail to start Keystone db connection

# Initialize next MongoDB Replica Set
docker-compose exec mongodb bash -c '/usr/local/bin/init-keystone.sh'

# If Keystones aren't able to start the db connection, restart docker applications

# After all docker applications are running start MongoDB Kafka connector
curl -i -X POST -H "Accept:application/json" -H  "Content-Type:application/json" http://localhost:8083/connectors/ -d @register-mongodb.json

# To test consuming messages from a Keystone topic, e.g. posts
docker-compose exec kafka /kafka/bin/kafka-console-consumer.sh \
    --bootstrap-server kafka:9092 \
    --from-beginning \
    --property print.key=true \
    --topic dbserver1.keystone.posts
    
# Shut down the cluster
docker-compose down
```
