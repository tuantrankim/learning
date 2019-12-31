# PostgreSQL Python: Connect To PostgreSQL Database Server
```
http://www.postgresqltutorial.com/postgresql-python/connect/

```

>CREATE DATABASE suppliers;

>conn = psycopg2.connect("dbname=suppliers user=postgres password=postgres")

Or

>conn = psycopg2.connect(host="localhost",database="suppliers", user="postgres", password="postgres")
