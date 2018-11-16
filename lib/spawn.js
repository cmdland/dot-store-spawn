import { terminal } from "./terminal"

export default options => {
  const { events, store } = options

  events.onAny(
    "spawn",
    async ({ args, command, event, options }) => {
      const out = await run(command, args, options)
      store.set(event.props, out)
    }
  )

  return options
}

async function run(command, args, opts) {
  let { pty, options } = terminal(command, args, opts)

  return new Promise((resolve, reject) => {
    pty.on("exit", (code, signal) =>
      resolve({ ...options, code, signal })
    )
    pty.on("error", e => reject(e))
  })
}
