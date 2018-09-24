import dotStore from "dot-store"
import spawn from "../dist/spawn"

test("spawn command", async () => {
  const store = spawn(dotStore())
  await store.spawn("test", "echo", "hi")
  expect(store.get("test")).toBe("hi\r\n")
})
