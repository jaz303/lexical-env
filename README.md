# lexical-env

## Installation

Install with `npm`:

```shell
$ npm install lexical-env
```

Then require:

```javascript
var env = require('lexical-env');
```

### API

#### `env.create([parent])`

Create a new environment, with optional `parent`.

#### `env.find(env, key)`

Search the parent chain of `env` and return the first environment in which `key` is defined. Throws an error if `key` does not exist in `env` or any of its parent environments.

#### `env.def(env, key, value)`

Introduces a binding of `key` to `value` in environment `env`. Throws an error if `key` is already defined in `env`.

#### `env.get(env, key)`

Finds `key` in `env` and returns the associated value. Throws an error if `key` does not exist in `env` or any of its parent environments.

#### `env.set(env, key, value)`

Finds `key` in `env` and sets the associated value to `value`. This operation differs from `def` in that it will update the closest environment (or parent environment) in which `key` is found, rather than introducing a new binding.