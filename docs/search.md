`notion-cli search`
===================

Search by title

* [`notion-cli search`](#notion-cli-search)

## `notion-cli search`

Search by title

```
USAGE
  $ notion-cli search [-q <value>] [-d asc|desc] [-f database|page] [-c <value>] [-s <value>]

FLAGS
  -c, --start_cursor=<value>
  -d, --sort_direction=<option>  [default: desc] The direction to sort results. The only supported timestamp value is
                                 "last_edited_time"
                                 <options: asc|desc>
  -f, --filter=<option>          <options: database|page>
  -q, --query=<value>            The text that the API compares page and database titles against
  -s, --page_size=<value>        [default: 5] The number of results to return. The default is 5, with a minimum of 1 and
                                 a maximum of 100.

DESCRIPTION
  Search by title

EXAMPLES
  $ notion-cli search
```


