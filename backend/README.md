# Backend - Flask

## Rough Overview
* `main.py` is the entry point of the Flask application. Also contains configurations.
* `extensions.py` is just to avoid circular imports so that we can define models in future using SQLAlchemy easily
* `/controllers` will contain all the api routes that the front end requires.
* `/models` will contain the entity definitions (nothing yet)
* `/services` will contain the business logic (nothing yet)


## Useful Resources
* [Blueprints](https://www.youtube.com/watch?v=WteIH6J9v64)
* [Connecting to MySQL](https://www.youtube.com/watch?v=Tu4vRU4lt6k)
* [Python MySQL Driver Error](https://stackoverflow.com/questions/22252397/importerror-no-module-named-mysqldb)