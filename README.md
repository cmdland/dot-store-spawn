# @dot-store/spawn

Spawn commands with `dot-store`.

![spawn](https://cdn.dribbble.com/users/110372/screenshots/3935394/earth-birth.gif)

## Create store

```js
import dotStore from "dot-store"
import spawn from "@dot-store/spawn"

const store = spawn(dotStore())
```

## Spawn a command

```js
await store.spawn("output", "echo", "hi")
store.get("output")
// {
//   args: ["hi"],
//   code: 0,
//   command: "echo",
//   out: "hi\r\n",
//   signal: 0
// }
```
