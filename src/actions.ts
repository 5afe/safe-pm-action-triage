import { context } from "@actions/github"
import { toolkit } from "./toolkit"

const assignIssueToProject = async (issueNo: number, project: number) => {
    console.log("Start")
    const { headers } = await toolkit.request('HEAD /')
    const scopes = headers?.['x-oauth-scopes']?.split(', ')
    console.log("scopes", scopes)
    const issueResponse = await toolkit.issues.get({ ...context.repo, issue_number: issueNo })
    console.log(issueResponse.data)
    const projectResponse = await toolkit.projects.get({ ...context.repo, project_id: project })
    console.log(projectResponse.data)
    const query = `
    mutation($issueId:ID!, $projectId:ID!) {
        addProjectNextItem(input: {projectId:$projectId contentId:$issueId})
        }
    }`;
    const variables = { issueId: issueResponse.data.node_id, projectId: projectResponse.data.node_id };
    await toolkit.graphql({ query, ...variables })
    console.log("Done")
}

export const runAction = async (action: string | undefined, params: string | undefined) => {
    switch (action) {
        case "assign_issue_to_project": {
            if (!params) throw Error(`Missing parameters`)
            const paramArray = params.split(" ")
            if (paramArray.length !== 2) throw Error(`Invalid params ${params}`)
            return await assignIssueToProject(parseInt(paramArray[0]), parseInt(paramArray[1]))
        }
        default:
            throw Error(`Unknown action ${undefined}`)
    }
}