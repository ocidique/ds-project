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

### Motivation

Modern web services are getting larger and there's a need for modern solutions to ease development, delivery and integration. Kafka streaming platform works great as core system for exchanging messages between different web services. Docker helps to build, ship, and run distributed applications in modern way.

### Brief description

Basic idea is that KeystoneJS Apps will work as Kafka producers via Kafka Connect (MongDB Connector). Connector will read MongoDB Replica Set oplog (operations log); whenever something is written in MongoDB those will also be produced as Kafka Messages via MongoDB Connector, which any Consumer App would be able to consume. System implementation consists Nginx which works as load balancer to KeystoneJS instances.

### Usage, read through phases first
```
# Keystone CMS needs to have dotenv variables set
cp .env_example .env

# Create account for https://cloudinary.com/ which is required for Keystone to run and for CMS image hosting
# Add your Cloudinary credentials to your .env 

# Using Debezium 0.7 version for the project, add export variable, or to your bash profile and restart terminal window for bash profile reload
export DEBEZIUM_VERSION=0.7

# Run docker applications
docker-compose up

# Eventually we haven't yet initialized MongoDB Replica Set for Keystone instances so first docker-compose up will fail to start Keystone db connection

# Initialize next MongoDB Replica Set
docker-compose exec mongodb bash -c '/usr/local/bin/init-keystone.sh'

# If Keystones aren't able to start the db connection, restart docker applications

# After all docker applications are running start MongoDB Kafka connector
curl -i -X POST -H "Accept:application/json" -H  "Content-Type:application/json" http://localhost:8083/connectors/ -d @register-mongodb.json

# To test Keystone CMS, go to localhost:8000

# To test consuming messages from a Keystone topic, e.g. posts
docker-compose exec kafka /kafka/bin/kafka-console-consumer.sh \
    --bootstrap-server kafka:9092 \
    --from-beginning \
    --property print.key=true \
    --topic dbserver1.keystone.posts

# Shut down the cluster
docker-compose down
```
