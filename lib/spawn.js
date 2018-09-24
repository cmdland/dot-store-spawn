import { terminal } from "./terminal"

export default store => {
  store.withOp("spawn").onAny(async ({ event }) => {
    const command = event.args[0]
    const args = event.args.slice(1)

    await run(command, args, {
      onData: onData({ event, store }),
    })
  })
  return store
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

function onData({ event, store }) {
  return ({ out }) => store.set(event.props, out)
}
