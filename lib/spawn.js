import { terminal } from "./spawn/terminal"

export default options => {
  const { events, store } = options

  events.onAny("spawn", async options => {
    const { event } = options
    const out = await run(event.options)
    await store.set(event.props, out)
  })

  return options
}

async function run(options) {
  const { pty, options: opts } = terminal(options)

  return new Promise((resolve, reject) => {
    pty.on("exit", (code, signal) =>
      resolve({ ...opts, code, signal })
    )
    pty.on("error", e => reject(e))
  })
}
