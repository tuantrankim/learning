# Update ubuntu packages
sudo apt-get update
# Install postgresql
sudo apt-get install postgresql
# OR install postgres with additional package
sudo apt-get install postgresql postgresql-contrib
# Main configuration file
ls /etc/postgresql/9.3/main/
file postgresql.conf
# Check status of postgresql
service postgresql
service postgresql status
port 5432 by default
# Default user for postgresql
- os user: postgres
- to login as postgres user
sudo su postgres
# Postgres IDE
psql

