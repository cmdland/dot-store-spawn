# @dot-store/spawn

Spawn commands with `dot-store`.

![spawn](https://cdn.dribbble.com/users/110372/screenshots/3935394/earth-birth.gif)

## Create store

```js
import Store from "dot-store"
import spawn from "@dot-store/spawn"

const store = spawn(new Store())
```

## Spawn a command

```js
await store.set("spawn.myApp.command", ["echo", "hi"])
store.get("spawn.myApp.output") // hi
```

Substitute `myApp` for any key you like.
