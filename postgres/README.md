# Update ubuntu packages
>sudo apt-get update

# Install postgresql
>sudo apt-get install postgresql

#### OR install postgres with additional package
>sudo apt-get install postgresql postgresql-contrib

#### Main configuration file
>ls /etc/postgresql/9.3/main/

>file postgresql.conf

#### Check status of postgresql
-port 5432 by default

>service postgresql

>service postgresql status

#### Default user for postgresql
- os user: postgres
- to login as postgres user

>sudo su postgres

# Postgres IDE
```
>man psql
>psql

list all the databases

>\l

- list all the users

>\du
```

#### Change password of default user - don't forget ';'

>ALTER USER postgres WITH PASSWORD 'test123';

- Create a new user

>CREATE USER user_1 WITH PASSWORD 'test123';
>\du

- Make the user a super user

>ALTER USER user_1 WITH SUPERUSER;

- Create another user
>CREATE USER user_2 WITH PASSWORD 'test123';

>\du

- Drop the user

>DROPT USER user_2

Grant all persmission on a specific database
```
The user needs access to the database, obviously:

GRANT CONNECT ON DATABASE my_db TO my_user;
And (at least) the USAGE privilege on the schema:

GRANT USAGE ON SCHEMA public TO my_user;
Then, all permissions for all tables (requires Postgres 9.0 or later):

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO my_user;
And don't forget sequences (if any):

GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO my_user;

connect to database

psql -U my_user -h 127.0.0.1 -d database_name

```
# Reset Forgotten Password For postgres User 

http://www.postgresqltutorial.com/postgresql-reset-password/

```
PostgreSQL uses the  pg_hba.conf configuration file that is stored in the database data 
directory to control the client authentication. HBA means host-based authentication. 
To reset the password for the postgres user, 
you need to modify some parameters in this configuration file.

Step 1. Backup the pg_dba.conf

Step 2. This step ensures that you can log into PostgreSQL database server without using the password.
Edit the pg_dba.conf file by adding the following line as the first line after the comment lines. 
The comment line starts with the # sign.

local  all   all   trust

PostgreSQL on Windows OS

host    all              postgres           127.0.0.1/32            trust

Step 3. Restart PostgreSQL server e.g., in Linux, you use the following command:
>sudo /etc/init.d/postgresql restart

Step 4. Connect to PostgreSQL database server and change the password of the postgres user.
>ALTER USER postgres with password 'very_secure_password';

Step 5. Restore the pg_db.conf file and restart the server, and connect to the PostgreSQL database server with new password.
>sudo /etc/init.d/postgresql restart

```
## pgAdmin 3 (default superuser/password)
```
Name: localhost
Host: 127.0.0.1
Port: 5432
Maintenance DB: postgres
Username: postgres
Password: postgres
```

## ROLE -http://www.postgresqltutorial.com/postgresql-roles/
```
CREATE ROLE role_name;

SELECT
   rolname
FROM
   pg_roles;
```

#### The following statement creates a role that has login privilege, password, and valid date.

>CREATE ROLE doe WITH PASSWORD 'pgSecpas1970' VALID UNTIL '2020-01-01';

#### The following statement creates a role that has superuser status, which means this role can bypass all authorization checks:

>CREATE ROLE bigboss SUPERUSER;

#### If you want a role to have database creation privilege, you use the following statement:

>CREATE ROLE admin CREATEDB;

#### Use the following statement to create a role that has creation privilege:

>CREATE ROLE security CREATEROLE;

#### Group role

```
-By convention, a group role does not have LOGIN privilege.

-To create a group role, you use the CREATE ROLE statement as follows:

>CREATE ROLE group_role;

For example, the following statement creates sales group role:

>CREATE ROLE sales;
Now, you can add a user role to a group role by using the GRANT statement:

>GRANT group_role to user_role;
For example, to add the doe user role to the sales group role, you use the following statement:

>GRANT sales TO doe;
To remove a user role from a group role, you use REVOKE statement:

>REVOKE group_role FROM user_role;
For example, to remove doe user role from the sales group role, you use the following statement:

>REVOKE sales FROM doe;
```

#### See the following example:
```
CREATE ROLE doe LOGIN INHERIT;
CREATE ROLE sales NOINHERIT;
CREATE ROLE marketing NOINHERIT;
GRANT sales to doe;
GRANT marketing to sales;

After executing the following statement:

>SET ROLE sales;

You will have only privileges granted to sales, not the ones that granted to doe.

And after executing the following statement:

>SET ROLE marketing;

You only have privileges granted to marketing, not the ones that granted to admin and doe.

To restore the original privilege, you can use the following statement:

>RESET ROLE;

Notice that only privileges on the database object are inheritable. The LOGIN, SUPERUSER, CREATEROLE, and CREATEDB are the special role that cannot be inherited as an ordinary privilege.

Removing roles

You can use the DROP ROLE statement to remove a group role or user role.

>DROP ROLE role_name;

```

# Backup Database

>pg_dump -U username -W -F t database_name > c:\backup_file.tar

e.g.:
```
C:\>cd C:\Program Files\PostgreSQL\9.2\bin
pg_dump -U postgres -W -F t dvdrental > c:\pgbackup\dvdrental.tar

-U postgres:  specifies the user to connect to PostgreSQL database server. We used postgres in this example.

-W:  forces pg_dump to prompt for the password before connecting to the PostgreSQL database server. After you hit enter, pg_dump will prompt for the password of postgres user.

-F : specifies the output file format that can be one of the following:

c: custom-format archive file format
d: directory-format archive
t:tar
p: plain text SQL script file).
Because we want the output file to be a tar-format archive file, we use  -F t in this example.

dvdrental: is the name of the database that we want to back

> c:\pgbackup\dvdrental.tar is the output backup file path.

```

#### How to backup all databases

```
>pg_dumpall -U postgres > c:\pgbackup\all.sql
```

#### How to backup database object definitions

```
To backup all objects in all databases, including roles, tablespaces, databases, schemas, tables, indexes, triggers, functions, constraints, views, ownerships and privileges, you use the following command:

>pg_dumpall --schema-only > c:\pgdump\definitiononly.sql

If you want to backup role definition only, use the following command:

>pg_dumpall --roles-only > c:\pgdump\allroles.sql

If you want to backup tablespaces definition, use the following command:

>pg_dumpall --tablespaces-only > c:\pgdump\allroles.sql
```

# Restore Database 

http://www.postgresqltutorial.com/postgresql-restore-database/

```
How to restore databases using psql
The psqlutility allows you to restore SQL script file generated by the pg_dump,  pg_dumpall 
or any other tools that generates compatible backed up files. By using the psql tool, 
you have to execute the entire script.

To restore a full backup and ignore any error occurred during the restoration process, 
you use the following command:

>psql -U username -f backupfile.sql

If you want to stop restoring database in case an error occurs, you use the following command:

>psql -U username --set ON_ERROR_STOP=on -f backupfile
Notice that we have added an additional option --set ON_ERROR_STOP=on

If you backup specific database objects in a particular database, 
you can restore them using the following command:

>psql -U username -d database_name -f objects.sql
```

#### How to restore databases using pg_restore
```
Besides psqltool, you can use  pg_restore program to restore databases backed up by the  pg_dump or pg_dumpalltools.
With  pg_restore program, you have various options for restoration databases, for example:

The  pg_restore allows you to perform parallel restores using the  -j option to specify the number of threads for restoration. Each thread restores a separate table simultaneously, which speeds up the process dramatically. Currently, the  pg_restore support this option for the only custom file format.
The  pg_restore enables you to restore specific database objects in a backup file that contains the full database.
The  pg_restore can take a database backed up in the older version and restore it in the newer version.
Let’s create a new database named newdvdrentalfor practicing with the pg_restore tool.

>CREATE DATABASE newdvdrental;

You can restore the dvdrentaldatabase in tarfile format generated by the  pg_dump tool in the PostgreSQL backup database tutorial using the following command:

>pg_restore --dbname=newdvdrental --verbose c:\pgbackup\dvdrental.tar

If you restore the database, which is the same as the one that you backed up, you can use the following command:

>pg_restore --dbname=dvdrental --create --verbose c:\pgbackup\dvdrental.tar

As PostgreSQL 9.2, you can use the  --section option to restore table structure only. This allows you to use the new database as the template for creating other databases.

First, you can create a new database named dvdrental_tpl.

>CREATE DATABASE dvdrental_tpl;

Second, we can restore table structure only from the dvdrental.tar backup file by using the following command:

>pg_restore --dbname=dvdrental_tpl --section=pre-data  c:\pgbackup\dvdrental.tar
```

# Important cheat sheet
```
http://www.postgresqltutorial.com/postgresql-cheat-sheet/
```

# Create/Drop database and execute script
```
-login as posgres
    psql posgres
    -create database
    CREATE DATABASE raovat;
    - or drop database
    DROP DATABASE raovat;
    - exit
    \q
    - connect to database raovat
    psql raovat
    - Execute a sql script test.sql
    \i ~\PATH\TO\test.sql
 ```
# PostgreSQL Cheat Sheet

```
PostgreSQL commands
Access the PostgreSQL server from psql with a specific user:

psql -U [username];
For example, the following command uses the postgres user to access the PostgreSQL database server:

psql -U postgres
Connect to a specific database:

\c database_name;
For example, the following command connects to the dvdrental database:

\c dvdrental;
You are now connected to database "dvdrental" as user "postgres".
To quit the psql:

\q
List all databases in the PostgreSQL database server

\l
List all schemas:

\dn
List all stored procedures and functions:

\df
List all views:

\dv
Lists all tables in a current database.

\dt
Or to get more information on tables in the current database:

\dt+
Get detailed information on a table.

\d+ table_name
Show a stored procedure or function code:

\df+ function_name
Show query output in the pretty-format:

\x
List all users:

\du
Create a new role:

CREATE ROLE role_name;
Create a new role with a username and password:

CREATE ROLE username NOINHERIT LOGIN PASSWORD password;
Change role for the current session to the new_role:

SET ROLE new_role;
Allow role_1 to set its role as role_2:

GRANT role_2 TO role_1;
Managing databases
Create a new database:

CREATE DATABASE [IF NOT EXISTS] db_name;
Delete a database permanently:

DROP DATABASE [IF EXISTS] db_name;
Managing tables
Create a new table or a temporary table

CREATE [TEMP] TABLE [IF NOT EXISTS] table_name(
   pk SERIAL PRIMARY KEY,
   c1 type(size) NOT NULL,
   c2 type(size) NULL,
   ...
);
Add a new column to a table:

ALTER TABLE table_name ADD COLUMN new_column_name TYPE;
Drop a column in a table:

ALTER TABLE table_name DROP COLUMN column_name;
Rename a column:

ALTER TABLE table_name RENAME column_name TO new_column_name;
Set or remove a default value for a column:

ALTER TABLE table_name ALTER COLUMN [SET DEFAULT value | DROP DEFAULT]
Add a primary key to a table.

ALTER TABLE table_name ADD PRIMARY KEY (column,...);
Remove the primary key from a table.

ALTER TABLE table_name 
DROP CONSTRAINT primary_key_constraint_name;
Rename a table.

ALTER TABLE table_name RENAME TO new_table_name;
Drop a table and its dependent objects:

 DROP TABLE [IF EXISTS] table_name CASCADE;
Managing views
Create a view:

CREATE OR REPLACE view_name AS
query;
Create a recursive view:

CREATE RECURSIVE VIEW view_name(columns) AS
SELECT columns;
Create a materialized view:

CREATE MATERIALIZED VIEW view_name
AS
query
WITH [NO] DATA;
Refresh a materialized view:

REFRESH MATERIALIZED VIEW CONCURRENTLY view_name;
Drop a view:

DROP VIEW [ IF EXISTS ] view_name;
Drop a materialized view:

DROP MATERIALIZED VIEW view_name;
Rename a view:

ALTER VIEW view_name RENAME TO new_name;
Managing indexes
Creating an index with the specified name on a table

CREATE [UNIQUE] INDEX index_name
ON table (column,...)
Removing a specified index from a table

DROP INDEX index_name;
Querying data from tables
Query all data from a table:

SELECT * FROM table_name;
Query data from specified columns of all rows in a table:

SELECT column, column2….
FROM table;
Query data and select only unique rows:

SELECT DISTINCT (column)
FROM table;
Query data from a table with a filter:

SELECT *
FROM table
WHERE condition;
Assign an alias to a column in the result set:

SELECT column_1 AS new_column_1, ...
FROM table;
Query data using the LIKE operator:

SELECT * FROM table_name
WHERE column LIKE '%value%'
Query data using the BETWEEN operator:

SELECT * FROM table_name
WHERE column BETWEEN low AND high;
Query data using the IN operator:

SELECT * FROM table_name
WHERE column IN (value1, value2,...);
Constrain the returned rows with the LIMIT clause:

SELECT * FROM table_name
LIMIT limit OFFSET offset
ORDER BY column_name;
Query data from multiple using the inner join, left join, full outer join, cross join and natural join:

SELECT * 
FROM table1
INNER JOIN table2 ON conditions
SELECT * 
FROM table1
LEFT JOIN table2 ON conditions
SELECT * 
FROM table1
FULL OUTER JOIN table2 ON conditions
SELECT * 
FROM table1
CROSS JOIN table2;
SELECT * 
FROM table1
NATURAL JOIN table2;
Return the number of rows of a table.

SELECT COUNT (*)
FROM table_name;
Sort rows in ascending or descending order

SELECT column, column2, ...
FROM table
ORDER BY column ASC [DESC], column2 ASC [DESC],...;
Group rows using GROUP BY clause.

SELECT *
FROM table
GROUP BY column_1, column_2, ...;
Filter groups using the HAVING clause.

SELECT *
FROM table
GROUP BY column_1
HAVING condition;
Set operations
Combine the result set of two or more queries with UNION operator:

SELECT * FROM table1
UNION
SELECT * FROM table2;
Minus a result set using EXCEPT operator:

SELECT * FROM table1
EXCEPT
SELECT * FROM table2;
Get intersection of the result sets of two queries:

SELECT * FROM table1
INTERSECT
SELECT * FROM table2;
Modifying data
Insert a new row into a table:

INSERT INTO table(column1,column2,...)
VALUES(value_1,value_2,...);
Insert multiple rows into a table:

INSERT INTO table_name(column1,column2,...)
VALUES(value_1,value_2,...),
      (value_1,value_2,...),
      (value_1,value_2,...)...
Update data for all rows:

UPDATE table_name
SET column_1 = value_1,
    ...;
Update data for a set of rows specified by a condition in the WHERE clause.

UPDATE table
SET column_1 = value_1,
    ...
WHERE condition;
Delete all rows of a table:

DELETE FROM table_name;
Delete specific rows based on a condition:

DELETE FROM table_name
WHERE condition;
Performance
Show the query plan for a query:

EXPLAIN query;
Show and execute the query plan for a query:

EXPLAIN ANALYZE query;
Collect statistics:

ANALYZE table_name;
```
