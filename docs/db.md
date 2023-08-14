`notion-cli db`
===============

Create a database

* [`notion-cli db c PAGE_ID`](#notion-cli-db-c-page_id)
* [`notion-cli db create PAGE_ID`](#notion-cli-db-create-page_id)
* [`notion-cli db q [DATABASE_ID]`](#notion-cli-db-q-database_id)
* [`notion-cli db query [DATABASE_ID]`](#notion-cli-db-query-database_id)
* [`notion-cli db r [DATABASE_ID]`](#notion-cli-db-r-database_id)
* [`notion-cli db retrieve [DATABASE_ID]`](#notion-cli-db-retrieve-database_id)
* [`notion-cli db u [DATABASE_ID]`](#notion-cli-db-u-database_id)
* [`notion-cli db update [DATABASE_ID]`](#notion-cli-db-update-database_id)

## `notion-cli db c PAGE_ID`

Create a database

```
USAGE
  $ notion-cli db c PAGE_ID [-t <value>]

FLAGS
  -t, --title=<value>

DESCRIPTION
  Create a database

ALIASES
  $ notion-cli db c

EXAMPLES
  Create a database via interactive mode

    $ notion-cli db create

  Create a database with a specific page_id

    $ notion-cli db create f929e92f257c4d8bb9d0c176ce24814d
```

## `notion-cli db create PAGE_ID`

Create a database

```
USAGE
  $ notion-cli db create PAGE_ID [-t <value>]

FLAGS
  -t, --title=<value>

DESCRIPTION
  Create a database

ALIASES
  $ notion-cli db c

EXAMPLES
  Create a database via interactive mode

    $ notion-cli db create

  Create a database with a specific page_id

    $ notion-cli db create f929e92f257c4d8bb9d0c176ce24814d
```



## `notion-cli db q [DATABASE_ID]`

Query a database

```
USAGE
  $ notion-cli db q [DATABASE_ID] [-r <value>] [-f <value>] [-o csv|json]

FLAGS
  -f, --fileFilter=<value>  JSON filter file path
  -o, --output=<option>     [default: json] Output format
                            <options: csv|json>
  -r, --rowFilter=<value>   JSON stringified filter string

DESCRIPTION
  Query a database

ALIASES
  $ notion-cli db q

EXAMPLES
  Query a db via interactive mode

    $ notion-cli db query

  Query a db via interactive mode with a specific database_id

    $ notion-cli db query DATABASE_ID

  Query a db with a specific database_id and row filter string

    $ notion-cli db query -r='{"and": ...}' DATABASE_ID

  Query a db with a specific database_id and filter file

    $ notion-cli db query -f ./path/to/filter.json DATABASE_ID

  Query a db with a specific database_id and output format

    $ notion-cli db query -o csv DATABASE_ID
```

## `notion-cli db query [DATABASE_ID]`

Query a database

```
USAGE
  $ notion-cli db query [DATABASE_ID] [-r <value>] [-f <value>] [-o csv|json]

FLAGS
  -f, --fileFilter=<value>  JSON filter file path
  -o, --output=<option>     [default: json] Output format
                            <options: csv|json>
  -r, --rowFilter=<value>   JSON stringified filter string

DESCRIPTION
  Query a database

ALIASES
  $ notion-cli db q

EXAMPLES
  Query a db via interactive mode

    $ notion-cli db query

  Query a db via interactive mode with a specific database_id

    $ notion-cli db query DATABASE_ID

  Query a db with a specific database_id and row filter string

    $ notion-cli db query -r='{"and": ...}' DATABASE_ID

  Query a db with a specific database_id and filter file

    $ notion-cli db query -f ./path/to/filter.json DATABASE_ID

  Query a db with a specific database_id and output format

    $ notion-cli db query -o csv DATABASE_ID
```



## `notion-cli db r [DATABASE_ID]`

Retrieve a database

```
USAGE
  $ notion-cli db r [DATABASE_ID]

DESCRIPTION
  Retrieve a database

ALIASES
  $ notion-cli db r

EXAMPLES
  Retrieve a database via interactive mode

    $ notion-cli db retrieve

  Retrieve a database via database_id

    $ notion-cli db retrieve f929e92f257c4d8bb9d0c176ce24814d
```

## `notion-cli db retrieve [DATABASE_ID]`

Retrieve a database

```
USAGE
  $ notion-cli db retrieve [DATABASE_ID]

DESCRIPTION
  Retrieve a database

ALIASES
  $ notion-cli db r

EXAMPLES
  Retrieve a database via interactive mode

    $ notion-cli db retrieve

  Retrieve a database via database_id

    $ notion-cli db retrieve f929e92f257c4d8bb9d0c176ce24814d
```



## `notion-cli db u [DATABASE_ID]`

Update a database

```
USAGE
  $ notion-cli db u [DATABASE_ID] [-t <value>]

FLAGS
  -t, --title=<value>  New database title

DESCRIPTION
  Update a database

ALIASES
  $ notion-cli db u

EXAMPLES
  Update a database via interactive mode

    $ notion-cli db update

  Update a database with a specific database_id

    $ notion-cli db update DATABASE_ID
```

## `notion-cli db update [DATABASE_ID]`

Update a database

```
USAGE
  $ notion-cli db update [DATABASE_ID] [-t <value>]

FLAGS
  -t, --title=<value>  New database title

DESCRIPTION
  Update a database

ALIASES
  $ notion-cli db u

EXAMPLES
  Update a database via interactive mode

    $ notion-cli db update

  Update a database with a specific database_id

    $ notion-cli db update DATABASE_ID
```


