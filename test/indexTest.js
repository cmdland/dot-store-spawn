import dotEvent from "dot-event"
import dotStore from "@dot-event/store"
import spawn from "../dist/spawn"

test("spawn command", async () => {
  const events = dotEvent()
  const store = dotStore({ events })

  spawn({ events, store })

  await events.spawn("test", {
    args: ["hi"],
    command: "echo",
  })

  expect(store.get("test")).toMatchObject({
    args: ["hi"],
    code: 0,
    command: "echo",
    out: "hi\r\n",
    signal: 0,
    silent: true,
  })
})

test("spawn command with options", async () => {
  const events = dotEvent()
  const store = dotStore({ events })

  spawn({ events, store })

  await events.spawn("test", {
    command: "pwd",
    cwd: "/",
  })

  expect(store.get("test")).toMatchObject({
    code: 0,
    command: "pwd",
    cwd: "/",
    out: "/\r\n",
    signal: 0,
    silent: true,
  })
})
