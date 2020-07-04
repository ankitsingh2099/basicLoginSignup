# Basic Login Signup

#### Enter database related details in the following file
```
config/config.json
```

#### Create Database
```
node executables/createWhitepandaDatabase.js
```

#### Create Table
```
node_modules/.bin/sequelize db:migrate
```

#### Source environment variable
```
source set_env_var.sh
```

#### Start the server
```
node ./bin/www
```
