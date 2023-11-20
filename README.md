# Gringotts

Starting the DB:

```
docker build -t db:1 .
docker run -p 5432:5432 db:1 -d postgres
```

Starting the API:

```
go run cmd/server/main.go
```
