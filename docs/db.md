`notion-cli db`
===============

Create a database

* [`notion-cli db create PAGEID`](#notion-cli-db-create-pageid)
* [`notion-cli db query [DATABASEID]`](#notion-cli-db-query-databaseid)
* [`notion-cli db retrieve [DATABASEID]`](#notion-cli-db-retrieve-databaseid)
* [`notion-cli db update [DATABASEID]`](#notion-cli-db-update-databaseid)

## `notion-cli db create PAGEID`

Create a database

```
USAGE
  $ notion-cli db create PAGEID

DESCRIPTION
  Create a database

EXAMPLES
  $ notion-cli db create f929e92f257c4d8bb9d0c176ce24814d
```

_See code: [dist/commands/db/create.ts](https://github.com/litencatt/notion-cli/blob/v0.10.0/dist/commands/db/create.ts)_

## `notion-cli db query [DATABASEID]`

Query a database

```
USAGE
  $ notion-cli db query [DATABASEID] [-r <value>] [-f <value>] [-o csv|json]

FLAGS
  -f, --fileFilter=<value>  JSON stringified filter file path
  -o, --output=<option>     [default: json] Output format
                            <options: csv|json>
  -r, --rowFilter=<value>   JSON stringified filter string

DESCRIPTION
  Query a database

EXAMPLES
  $ notion-cli db query

  $ notion-cli db query DATABASE_ID

  $ notion-cli db query DATABASE_ID -r '{"and":[]}'

  $ notion-cli db query DATABASE_ID -f ./path/to/filter.json

  $ notion-cli db query DATABASE_ID -c
```

_See code: [dist/commands/db/query.ts](https://github.com/litencatt/notion-cli/blob/v0.10.0/dist/commands/db/query.ts)_

## `notion-cli db retrieve [DATABASEID]`

Retrieve a database

```
USAGE
  $ notion-cli db retrieve [DATABASEID]

DESCRIPTION
  Retrieve a database

EXAMPLES
  $ notion-cli db retrieve f929e92f257c4d8bb9d0c176ce24814d
```

_See code: [dist/commands/db/retrieve.ts](https://github.com/litencatt/notion-cli/blob/v0.10.0/dist/commands/db/retrieve.ts)_

## `notion-cli db update [DATABASEID]`

Update a database

```
USAGE
  $ notion-cli db update [DATABASEID]

DESCRIPTION
  Update a database

EXAMPLES
  $ notion-cli db update f929e92f257c4d8bb9d0c176ce24814d
```

_See code: [dist/commands/db/update.ts](https://github.com/litencatt/notion-cli/blob/v0.10.0/dist/commands/db/update.ts)_
