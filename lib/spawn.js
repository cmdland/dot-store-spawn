import { terminal } from "./terminal"

export default store => {
  store.withOp("spawn").onAny(async ({ event }) => {
    const command = event.args[0]
    const args = event.args.slice(1)

    let options = {}

    if (isObject(args[args.length - 1])) {
      options = args.pop()
    }

    store.set(
      event.props,
      await run(command, args, options)
    )
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

function isObject(arg) {
  return (
    arg &&
    typeof arg === "object" &&
    arg !== null &&
    arg.constructor === Object
  )
}
