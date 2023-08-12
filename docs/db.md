`notion-cli db`
===============

Create a database

* [`notion-cli db create PAGE_ID`](#notion-cli-db-create-page_id)
* [`notion-cli db query [DATABASE_ID]`](#notion-cli-db-query-database_id)
* [`notion-cli db retrieve [DATABASE_ID]`](#notion-cli-db-retrieve-database_id)
* [`notion-cli db update [DATABASE_ID]`](#notion-cli-db-update-database_id)

## `notion-cli db create PAGE_ID`

Create a database

```
USAGE
  $ notion-cli db create PAGE_ID

DESCRIPTION
  Create a database

EXAMPLES
  Create a database via interactive mode

    $ notion-cli db create

  Create a database with a specific page_id

    $ notion-cli db create f929e92f257c4d8bb9d0c176ce24814d
```

_See code: [dist/commands/db/create.ts](https://github.com/litencatt/notion-cli/blob/v0.10.0/dist/commands/db/create.ts)_

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

_See code: [dist/commands/db/query.ts](https://github.com/litencatt/notion-cli/blob/v0.10.0/dist/commands/db/query.ts)_

## `notion-cli db retrieve [DATABASE_ID]`

Retrieve a database

```
USAGE
  $ notion-cli db retrieve [DATABASE_ID]

DESCRIPTION
  Retrieve a database

EXAMPLES
  Retrieve a database via interactive mode

    $ notion-cli db retrieve

  Retrieve a database via database_id

    $ notion-cli db retrieve f929e92f257c4d8bb9d0c176ce24814d
```

_See code: [dist/commands/db/retrieve.ts](https://github.com/litencatt/notion-cli/blob/v0.10.0/dist/commands/db/retrieve.ts)_

## `notion-cli db update [DATABASE_ID]`

Update a database

```
USAGE
  $ notion-cli db update [DATABASE_ID]

DESCRIPTION
  Update a database

EXAMPLES
  Update a database via interactive mode

    $ notion-cli db update

  Update a database with a specific database_id

    $ notion-cli db update DATABASE_ID
```

_See code: [dist/commands/db/update.ts](https://github.com/litencatt/notion-cli/blob/v0.10.0/dist/commands/db/update.ts)_
