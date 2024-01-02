`notion-cli search`
===================

Search by title

* [`notion-cli search`](#notion-cli-search)

## `notion-cli search`

Search by title

```
USAGE
  $ notion-cli search [-q <value>] [-d asc|desc] [-p database|page] [-c <value>] [-s <value>] [-r]
    [--columns <value> | -x] [--sort <value>] [--filter <value>] [--output csv|json|yaml |  | [--csv | --no-truncate]]
    [--no-header | ]

FLAGS
  -c, --start_cursor=<value>
  -d, --sort_direction=<option>  [default: desc] The direction to sort results. The only supported timestamp value is
                                 "last_edited_time"
                                 <options: asc|desc>
  -p, --property=<option>        <options: database|page>
  -q, --query=<value>            The text that the API compares page and database titles against
  -r, --raw                      output raw json
  -s, --page_size=<value>        [default: 5] The number of results to return. The default is 5, with a minimum of 1 and
                                 a maximum of 100.
  -x, --extended                 show extra columns
  --columns=<value>              only show provided columns (comma-separated)
  --csv                          output is csv format [alias: --output=csv]
  --filter=<value>               filter property by partial string matching, ex: name=foo
  --no-header                    hide table header from output
  --no-truncate                  do not truncate output to fit screen
  --output=<option>              output in a more machine friendly format
                                 <options: csv|json|yaml>
  --sort=<value>                 property to sort by (prepend '-' for descending)

DESCRIPTION
  Search by title

EXAMPLES
  Search by title

    $ notion-cli search -q 'My Page'

  Search by title and output csv

    $ notion-cli search -q 'My Page' --csv

  Search by title and output raw json

    $ notion-cli search -q 'My Page' -r

  Search by title and output table with specific columns

    $ notion-cli search -q 'My Page' --columns=title,object

  Search by title and output table with specific columns and sort direction

    $ notion-cli search -q 'My Page' --columns=title,object -d asc

  Search by title and output table with specific columns and sort direction and page size

    $ notion-cli search -q 'My Page' -columns=title,object -d asc -s 10

  Search by title and output table with specific columns and sort direction and page size and start cursor

    $ notion-cli search -q 'My Page' --columns=title,object -d asc -s 10 -c START_CURSOR_ID

  Search by title and output table with specific columns and sort direction and page size and start cursor and
  property

    $ notion-cli search -q 'My Page' --columns=title,object -d asc -s 10 -c START_CURSOR_ID -p page
```


