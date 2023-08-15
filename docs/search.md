`notion-cli search`
===================

Search by title

* [`notion-cli search`](#notion-cli-search)

## `notion-cli search`

Search by title

```
USAGE
  $ notion-cli search [-q <value>] [-d asc|desc] [-p database|page] [-c <value>] [-s <value>] [--raw]
    [--columns <value> | -x] [--sort <value>] [--filter <value>] [--output csv|json|yaml |  | [--csv | --no-truncate]]
    [--no-header | ]

FLAGS
  -c, --start_cursor=<value>
  -d, --sort_direction=<option>  [default: desc] The direction to sort results. The only supported timestamp value is
                                 "last_edited_time"
                                 <options: asc|desc>
  -p, --property=<option>        <options: database|page>
  -q, --query=<value>            The text that the API compares page and database titles against
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
  --raw                          Output JSON raw result
  --sort=<value>                 property to sort by (prepend '-' for descending)

DESCRIPTION
  Search by title

EXAMPLES
  $ notion-cli search
```


