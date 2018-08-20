import Store from "dot-store"
import spawn from "../dist/spawn"

test("spawn command", async () => {
  const store = spawn(new Store())
  await store.set("spawn.test.command", ["echo", "hi"])
  expect(store.get("spawn.test.output")).toBe("hi\r\n")
})
