FROM postgres:latest

ENV POSTGRES_DB=blog
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=JAPM102003

COPY schema.sql /docker-entrypoint-initdb.d/schema.sql