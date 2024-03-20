FROM postgres:latest

ENV POSTGRES_DB=blog
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=JAPM102003

COPY movies_schema.sql /docker-entrypoint-initdb.d/
COPY people_schema.sql /docker-entrypoint-initdb.d/
COPY colors_schema.sql /docker-entrypoint-initdb.d/
