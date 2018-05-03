FROM mongo:3.4

COPY init-keystone.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/init-keystone.sh

CMD ["mongod", "--replSet", "rs0", "--auth"]