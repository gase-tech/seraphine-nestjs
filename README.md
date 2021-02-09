# Seraphine

This project was generated using [Nx](https://nx.dev).

## Development

#### Requirements

- Mysql (for example docker command look below)
- Nodejs
- NX CLI (optional)

Before run the nestjs api, you must set up a mysql database and enter connection info to `.env` file in the root of the project.

Also if you want to use authentication features of the api you must enter a JWT Secret in `.env` file.

After entering all the required config, you can start the application with following commands below.

Run `nx serve api` for a nestjs application.

Run `nx serve web` for a angular application.

Example Docker command for mysql database:
 - `docker run --name seraphine-mysql -e MYSQL_ROOT_PASSWORD=admin -p 3306:3306 -d mysql`
