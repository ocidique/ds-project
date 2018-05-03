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
