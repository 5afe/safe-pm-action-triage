interface Action {
    type: string
}

interface AssignIssueProjectAction extends Action {
    type: "assign_new_issue_to_project"
    target: string
}