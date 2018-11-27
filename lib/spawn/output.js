export async function output({ event, events, props }) {
  const { args, command, code, quiet } = events.get(props)

  if (quiet) {
    return
  }

  await events.status(props, {
    fail: code !== 0,
    msg: [command].concat(args || []),
    op: event.op,
  })
}

export async function fail(options) {
  const { event, events, props, out, quiet } = options

  if (quiet) {
    return
  }

  const path = await events.fsWriteTmp(props, {
    body: out.out,
  })

  const command = [out.command, ...(out.args || [])].join(
    " "
  )

  await events.status(props, {
    fail: true,
    msg: chalk => [
      `exit code ${out.code}:`,
      chalk.inverse(command),
      `${path}`,
    ],
    op: event.op,
  })
}
