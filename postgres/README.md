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
>man psql
>psql

- list all the databases

>\l

- list all the users

>\du

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

