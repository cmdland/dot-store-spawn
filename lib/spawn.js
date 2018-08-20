import { terminal } from "./terminal"

export default store => {
  store.on(
    "spawn.{ns}.command",
    async ({ ns, subscriber }) => {
      const command = subscriber.value[0]
      const args = subscriber.value.slice(1)

      await run(command, args, {
        onData: onData({ ns, store }),
      })
    }
  )
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

function onData({ ns, store }) {
  return ({ out }) => store.set(`spawn.${ns}.output`, out)
}
