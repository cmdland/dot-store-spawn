import chalk from "chalk"

export async function output({ events, props }) {
  const taskIndex = events.get([...props, "taskIndex"]) || 0
  const output = events.get("argv.opts.output")

  if (output && taskIndex === 0) {
    events.onAny("after.spawn", ({ events, props }) => {
      const { args, command, code, out } = events.get(props)

      // eslint-disable-next-line no-console
      console.log(
        chalk.inverse(props.join(".")),
        chalk.black.bgYellow(
          [command].concat(args || []).join(" ")
        ),
        code === 0
          ? chalk.black.bgGreen(code)
          : chalk.black.bgRed(code)
      )

      // eslint-disable-next-line no-console
      console.log(out)
    })
  }
}
