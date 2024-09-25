const getColorFromPriority = (priority: string | undefined): string => {
    let priorityToColor = new Map<string, string> ([
        ["LIGHT_GREEN", "lime"],
        ["GREEN", "green"],
        ["BLUE", "sky"],
        ["ORANGE", "amber"],
        ["RED", "red"],
        ["DEFAULT", "black"]
    ]);

    // @ts-ignore
    return priorityToColor.get(priority)
}


const CURRENT_SESSION_ID = "currentSessionId"
const TOURNEY_ROWS = "tourneyRows"
const DISABLED_ROWS = "disabledRows"

export interface Enum {
    label: string,
    value?: string,
}

export interface SessionTourneyRow {
    tourneyId?: number,
    buyIn?: string,
    timeStart?: string,
    timeEnd?: string,
    room?: string,
    name?: string,
    priority?: string,
    totalBuyIn?: string,
    totalWinnings?: string,
    entryCount?: number,
}

export interface ModalProps {
    show: boolean,
    onHide: any,
    callback?: any
}

export interface ConfirmModalProps {
    show: boolean,
    onHide: any,
    body: string,
    onSubmit: any
}

export interface SessionStat {
    duration: string,
    tourneyCount: number,
    totalBuyInsUsd: number,
    totalWinningsUsd: number,
    profit: number
}

export {
    getColorFromPriority,
    CURRENT_SESSION_ID,
    TOURNEY_ROWS,
    DISABLED_ROWS
}

