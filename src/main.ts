import * as core from '@actions/core'

async function run(): Promise<void> {
  try {
    const verbose: boolean = core.getInput('verbose') === 'true'
    const action: string = core.getInput('action')
    const params: string = core.getInput('params')
    console.log(action, params)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()