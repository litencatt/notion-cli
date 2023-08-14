`notion-cli plugins`
====================

List installed plugins.

* [`notion-cli plugins`](#notion-cli-plugins)
* [`notion-cli plugins:install PLUGIN...`](#notion-cli-pluginsinstall-plugin)
* [`notion-cli plugins:inspect PLUGIN...`](#notion-cli-pluginsinspect-plugin)
* [`notion-cli plugins:install PLUGIN...`](#notion-cli-pluginsinstall-plugin-1)
* [`notion-cli plugins:link PLUGIN`](#notion-cli-pluginslink-plugin)
* [`notion-cli plugins:uninstall PLUGIN...`](#notion-cli-pluginsuninstall-plugin)
* [`notion-cli plugins:uninstall PLUGIN...`](#notion-cli-pluginsuninstall-plugin-1)
* [`notion-cli plugins:uninstall PLUGIN...`](#notion-cli-pluginsuninstall-plugin-2)
* [`notion-cli plugins update`](#notion-cli-plugins-update)

## `notion-cli plugins`

List installed plugins.

```
USAGE
  $ notion-cli plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ notion-cli plugins
```



## `notion-cli plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ notion-cli plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ notion-cli plugins add

EXAMPLES
  $ notion-cli plugins:install myplugin 

  $ notion-cli plugins:install https://github.com/someuser/someplugin

  $ notion-cli plugins:install someuser/someplugin
```

## `notion-cli plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ notion-cli plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ notion-cli plugins:inspect myplugin
```



## `notion-cli plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ notion-cli plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ notion-cli plugins add

EXAMPLES
  $ notion-cli plugins:install myplugin 

  $ notion-cli plugins:install https://github.com/someuser/someplugin

  $ notion-cli plugins:install someuser/someplugin
```



## `notion-cli plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ notion-cli plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ notion-cli plugins:link myplugin
```



## `notion-cli plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ notion-cli plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ notion-cli plugins unlink
  $ notion-cli plugins remove
```

## `notion-cli plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ notion-cli plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ notion-cli plugins unlink
  $ notion-cli plugins remove
```



## `notion-cli plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ notion-cli plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ notion-cli plugins unlink
  $ notion-cli plugins remove
```

## `notion-cli plugins update`

Update installed plugins.

```
USAGE
  $ notion-cli plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```


