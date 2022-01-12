import * as core from '@actions/core'
import { runAction } from './actions'

async function run(): Promise<void> {
  try {
    const verbose: boolean = core.getInput('verbose') === 'true'
    const action: string = core.getInput('action')
    const params: string = core.getInput('params')
    await runAction(action, params)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()