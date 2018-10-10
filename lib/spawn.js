import { terminal } from "./terminal"

export default options => {
  const { events, store } = options

  events.onAny(
    "spawn",
    async ({ args, command, event, options }) => {
      store.set(
        ["spawn", ...event.props],
        await run(command, args, options)
      )
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
