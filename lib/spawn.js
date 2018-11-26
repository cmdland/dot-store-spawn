// Packages
import dotLog from "@dot-event/log"

// Helpers
import { output } from "./spawn/output"
import { terminal } from "./spawn/terminal"

export default options => {
  const { events } = options

  if (events.ops.has("spawn")) {
    return options
  }

  dotLog({ events })

  events
    .withOptions({
      cwd: process.cwd(),
    })
    .onAny({
      spawn: [output, spawn],

      spawnSetup: () =>
        events.argv({
          alias: {
            a: ["args"],
            c: ["command"],
            o: ["output"],
          },
        }),
    })

  return options
}

async function spawn(options) {
  const { args, event, events, props } = options
  const fixArgs = typeof args === "string" ? [args] : args
  const out = await run({ ...event.options, args: fixArgs })
  await events.set(props, out)
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
