// Packages
import dotLog from "@dot-event/log"
import dotStatus from "@dot-event/status"

// Helpers
import { fail, output } from "./spawn/output"
import { terminal } from "./spawn/terminal"

export default options => {
  const { events } = options

  if (events.ops.has("spawn")) {
    return options
  }

  dotLog({ events })
  dotStatus({ events })

  events
    .withOptions({
      cwd: process.cwd(),
    })
    .onAny({
      "after.spawn": output,

      spawn,

      spawnSetupOnce: () =>
        events.argv({
          alias: {
            a: ["args"],
            c: ["command"],
            l: ["lax"],
            q: ["quiet"],
          },
        }),
    })

  return options
}

async function spawn(options) {
  const { args, lax, event, events, props } = options

  const out = await run({
    ...event.options,
    args: fixArgs(args),
  })

  if (out.code !== 0 && !lax) {
    await fail({ ...options, out })
    process.exit(out.code)
  }

  await events.set(props, out)
}

function fixArgs(args) {
  return typeof args === "string" ? [args] : args
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
