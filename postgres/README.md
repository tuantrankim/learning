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

# Backup/restore Database

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
