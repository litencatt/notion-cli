`notion-cli user`
=================

List all users

* [`notion-cli user l`](#notion-cli-user-l)
* [`notion-cli user list`](#notion-cli-user-list)
* [`notion-cli user r [USER_ID]`](#notion-cli-user-r-user_id)
* [`notion-cli user r b`](#notion-cli-user-r-b)
* [`notion-cli user retrieve [USER_ID]`](#notion-cli-user-retrieve-user_id)
* [`notion-cli user retrieve bot`](#notion-cli-user-retrieve-bot)

## `notion-cli user l`

List all users

```
USAGE
  $ notion-cli user l [-r] [--columns <value> | -x] [--sort <value>] [--filter <value>] [--output
    csv|json|yaml |  | [--csv | --no-truncate]] [--no-header | ]

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
  List all users

ALIASES
  $ notion-cli user l

EXAMPLES
  List all users

    $ notion-cli user list

  List all users and output raw json

    $ notion-cli user list -r
```

## `notion-cli user list`

List all users

```
USAGE
  $ notion-cli user list [-r] [--columns <value> | -x] [--sort <value>] [--filter <value>] [--output
    csv|json|yaml |  | [--csv | --no-truncate]] [--no-header | ]

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
  List all users

ALIASES
  $ notion-cli user l

EXAMPLES
  List all users

    $ notion-cli user list

  List all users and output raw json

    $ notion-cli user list -r
```



## `notion-cli user r [USER_ID]`

Retrieve a user

```
USAGE
  $ notion-cli user r [USER_ID] [-r] [--columns <value> | -x] [--sort <value>] [--filter <value>] [--output
    csv|json|yaml |  | [--csv | --no-truncate]] [--no-header | ]

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
  Retrieve a user

ALIASES
  $ notion-cli user r

EXAMPLES
  Retrieve a user

    $ notion-cli user retrieve USER_ID

  Retrieve a user and output raw json

    $ notion-cli user retrieve USER_ID -r
```

## `notion-cli user r b`

Retrieve a bot user

```
USAGE
  $ notion-cli user r b [-r] [--columns <value> | -x] [--sort <value>] [--filter <value>] [--output
    csv|json|yaml |  | [--csv | --no-truncate]] [--no-header | ]

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
  Retrieve a bot user

ALIASES
  $ notion-cli user r b

EXAMPLES
  Retrieve a bot user

    $ notion-cli user retrieve:bot

  Retrieve a bot user and output raw json

    $ notion-cli user retrieve:bot -r
```

## `notion-cli user retrieve [USER_ID]`

Retrieve a user

```
USAGE
  $ notion-cli user retrieve [USER_ID] [-r] [--columns <value> | -x] [--sort <value>] [--filter <value>] [--output
    csv|json|yaml |  | [--csv | --no-truncate]] [--no-header | ]

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
  Retrieve a user

ALIASES
  $ notion-cli user r

EXAMPLES
  Retrieve a user

    $ notion-cli user retrieve USER_ID

  Retrieve a user and output raw json

    $ notion-cli user retrieve USER_ID -r
```



## `notion-cli user retrieve bot`

Retrieve a bot user

```
USAGE
  $ notion-cli user retrieve bot [-r] [--columns <value> | -x] [--sort <value>] [--filter <value>] [--output
    csv|json|yaml |  | [--csv | --no-truncate]] [--no-header | ]

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
  Retrieve a bot user

ALIASES
  $ notion-cli user r b

EXAMPLES
  Retrieve a bot user

    $ notion-cli user retrieve:bot

  Retrieve a bot user and output raw json

    $ notion-cli user retrieve:bot -r
```


