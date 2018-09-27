import dotStore from "dot-store"
import spawn from "../dist/spawn"

test("spawn command", async () => {
  const store = spawn(dotStore())
  await store.spawn("test", "echo", "hi")
  expect(store.get("test")).toEqual({
    args: ["hi"],
    code: 0,
    command: "echo",
    out: "hi\r\n",
    signal: 0,
    silent: true,
  })
})

test("spawn command with options", async () => {
  const store = spawn(dotStore())
  await store.spawn("test", "pwd", { cwd: "/" })
  expect(store.get("test")).toEqual({
    args: [],
    code: 0,
    command: "pwd",
    cwd: "/",
    out: "/\r\n",
    signal: 0,
    silent: true,
  })
})
