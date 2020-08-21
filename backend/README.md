# Backend - Flask

## Rough Overview
* `main.py` is the entry point of the Flask application. Also contains configurations.
* `extensions.py` is just to avoid circular imports so that we can define models in future using SQLAlchemy easily
* `api.py` file will contain all the routes that the front end requires.
* `/models` will contain the entity definitions
* `services` will contain the business logic


## Useful Resources
* [Blueprints](https://www.youtube.com/watch?v=WteIH6J9v64)
* [Connecting to MySQL](https://www.youtube.com/watch?v=Tu4vRU4lt6k)
* [Python MySQL Driver Error](https://stackoverflow.com/questions/22252397/importerror-no-module-named-mysqldb)