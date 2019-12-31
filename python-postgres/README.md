# PostgreSQL Python: Connect To PostgreSQL Database Server
```
http://www.postgresqltutorial.com/postgresql-python/connect/

```

#### Create Database

>CREATE DATABASE suppliers;

#### Connect to the database

>conn = psycopg2.connect("dbname=suppliers user=postgres password=postgres")

Or

>conn = psycopg2.connect(host="localhost",database="suppliers", user="postgres", password="postgres")

### Add configuration file name 'database.ini'

```
[postgresql]
host=localhost
database=suppliers
user=postgres
password=postgres
```

### Implement config.py

```
#!/usr/bin/python
from configparser import ConfigParser
 
 
def config(filename='database.ini', section='postgresql'):
    # create a parser
    parser = ConfigParser()
    # read config file
    parser.read(filename)
 
    # get section, default to postgresql
    db = {}
    if parser.has_section(section):
        params = parser.items(section)
        for param in params:
            db[param[0]] = param[1]
    else:
        raise Exception('Section {0} not found in the {1} file'.format(section, filename))
 
    return db

```
    
#### Connect to the database
    
```
    #!/usr/bin/python
import psycopg2
from config import config
 
def connect():
    """ Connect to the PostgreSQL database server """
    conn = None
    try:
        # read connection parameters
        params = config()
 
        # connect to the PostgreSQL server
        print('Connecting to the PostgreSQL database...')
        conn = psycopg2.connect(**params)
      
        # create a cursor
        cur = conn.cursor()
        
   # execute a statement
        print('PostgreSQL database version:')
        cur.execute('SELECT version()')
 
        # display the PostgreSQL database server version
        db_version = cur.fetchone()
        print(db_version)
       
       # close the communication with the PostgreSQL
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()
            print('Database connection closed.')
 
 
if __name__ == '__main__':
    connect()

```
