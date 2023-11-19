FROM postgres:16

ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres

COPY ./schema.sql /docker-entrypoint-initdb.d/

