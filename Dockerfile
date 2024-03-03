FROM ubuntu:latest 

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
apt-get install -y postgresql

ENV POSTGRES_DB=blog

ENV POSTGRES_USER=postgres

ENV POSTGRES_PASSWORD=JAPM102003

COPY script/schema.sql /docker-entrypoint-initdb.d/schema.sql

EXPOSE 5432

CMD ["postgres"]
