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
  $ notion-cli db create PAGE_ID [-t <value>] [-r] [--columns <value> | -x] [--sort <value>] [--filter <value>]
    [--output csv|json|yaml |  | [--csv | --no-truncate]] [--no-header | ]

FLAGS
  -r, --raw            output raw json
  -t, --title=<value>  new database title
  -x, --extended       show extra columns
  --columns=<value>    only show provided columns (comma-separated)
  --csv                output is csv format [alias: --output=csv]
  --filter=<value>     filter property by partial string matching, ex: name=foo
  --no-header          hide table header from output
  --no-truncate        do not truncate output to fit screen
  --output=<option>    output in a more machine friendly format
                       <options: csv|json|yaml>
  --sort=<value>       property to sort by (prepend '-' for descending)

DESCRIPTION
  Create a database

ALIASES
  $ notion-cli db c

EXAMPLES
  Create a database via interactive mode

    $ notion-cli db create

  Create a database with a specific page_id

    $ notion-cli db create PAGE_ID

  Create a database with a specific page_id and title

    $ notion-cli db create PAGE_ID -t 'My Database'

  Create a database with a specific page_id and output raw json

    $ notion-cli db create PAGE_ID -r

  Create a database with a specific page_id and output raw json with title

    $ notion-cli db create PAGE_ID -t 'My Database' -r
```



## `notion-cli db query [DATABASE_ID]`

Query a database

```
USAGE
  $ notion-cli db query [DATABASE_ID] [-a <value>] [-f <value>] [-p <value>] [-A] [-s <value>] [-d asc|desc]
    [-r] [--columns <value> | -x] [--sort <value>] [--filter <value>] [--output csv|json|yaml |  | [--csv |
    --no-truncate]] [--no-header | ]

FLAGS
  -A, --pageAll                 get all pages
  -a, --rawFilter=<value>       JSON stringified filter string
  -d, --sortDirection=<option>  [default: asc] The direction to sort results
                                <options: asc|desc>
  -f, --fileFilter=<value>      JSON filter file path
  -p, --pageSize=<value>        [default: 10] The number of results to return(1-100).
  -r, --raw                     output raw json
  -s, --sortProperty=<value>    The property to sort results by
  -x, --extended                show extra columns
  --columns=<value>             only show provided columns (comma-separated)
  --csv                         output is csv format [alias: --output=csv]
  --filter=<value>              filter property by partial string matching, ex: name=foo
  --no-header                   hide table header from output
  --no-truncate                 do not truncate output to fit screen
  --output=<option>             output in a more machine friendly format
                                <options: csv|json|yaml>
  --sort=<value>                property to sort by (prepend '-' for descending)

DESCRIPTION
  Query a database

ALIASES
  $ notion-cli db q

EXAMPLES
  Query a db via interactive mode

    $ notion-cli db query

  Query a db with a specific database_id

    $ notion-cli db query DATABASE_ID

  Query a db with a specific database_id and raw filter string

    $ notion-cli db query -a '{"and": ...}' DATABASE_ID

  Query a db with a specific database_id and filter file

    $ notion-cli db query -f ./path/to/filter.json DATABASE_ID

  Query a db with a specific database_id and output CSV

    $ notion-cli db query --csv DATABASE_ID

  Query a db with a specific database_id and output raw json

    $ notion-cli db query --raw DATABASE_ID

  Query a db with a specific database_id and page size

    $ notion-cli db query -s 10 DATABASE_ID

  Query a db with a specific database_id and get all pages

    $ notion-cli db query -A DATABASE_ID

  Query a db with a specific database_id and sort property and sort direction

    $ notion-cli db query -s Name -d desc DATABASE_ID
```



## `notion-cli db retrieve [DATABASE_ID]`

Retrieve a database

```
USAGE
  $ notion-cli db retrieve [DATABASE_ID] [-r] [--columns <value> | -x] [--sort <value>] [--filter <value>]
    [--output csv|json|yaml |  | [--csv | --no-truncate]] [--no-header | ]

FLAGS
  -r, --raw          output raw json
  -x, --extended     show extra columns
  --columns=<value>  only show provided columns (comma-separated)
  --csv              output is csv format [alias: --output=csv]
  --filter=<value>   filter property by partial string matching, ex: name=foo
  --no-header        hide table header from output
  --no-truncate      do not truncate output to fit screen
  --output=<option>  output in a more machine friendly format
                     <options: csv|json|yaml>
  --sort=<value>     property to sort by (prepend '-' for descending)

DESCRIPTION
  Retrieve a database

ALIASES
  $ notion-cli db r

EXAMPLES
  Retrieve a database via interactive mode

    $ notion-cli db retrieve

  Retrieve a database via database_id

    $ notion-cli db retrieve DATABSE_ID
```



## `notion-cli db update [DATABASE_ID]`

Update a database

```
USAGE
  $ notion-cli db update [DATABASE_ID] [-t <value>] [-r] [--columns <value> | -x] [--sort <value>] [--filter
    <value>] [--output csv|json|yaml |  | [--csv | --no-truncate]] [--no-header | ]

FLAGS
  -r, --raw            output raw json
  -t, --title=<value>  New database title
  -x, --extended       show extra columns
  --columns=<value>    only show provided columns (comma-separated)
  --csv                output is csv format [alias: --output=csv]
  --filter=<value>     filter property by partial string matching, ex: name=foo
  --no-header          hide table header from output
  --no-truncate        do not truncate output to fit screen
  --output=<option>    output in a more machine friendly format
                       <options: csv|json|yaml>
  --sort=<value>       property to sort by (prepend '-' for descending)

DESCRIPTION
  Update a database

ALIASES
  $ notion-cli db u

EXAMPLES
  Update a database via interactive mode

    $ notion-cli db update

  Update a database with a specific database_id

    $ notion-cli db update DATABASE_ID

  Update a database with a specific database_id and title

    $ notion-cli db update DATABASE_ID -t 'My Database'

  Update a database with a specific database_id and output raw json

    $ notion-cli db update DATABASE_ID -r
```


