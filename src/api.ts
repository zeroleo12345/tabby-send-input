export interface QuickCmds {
    name: string
    text: string
    appendCR: boolean
    shortcut?: string
    group?: string
}

export interface ICmdGroup {
    name: string
    cmds: QuickCmds[]
}
