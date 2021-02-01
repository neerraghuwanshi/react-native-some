export const SETCHATPAGE =  'SETCHATPAGE'
export const SETCHATMESSAGES =  'SETCHATMESSAGES'
export const SETMORECHATMESSAGES =  'SETMORECHATMESSAGES'

export const setChatPage = (page) => {
    return {
        type: SETCHATPAGE,
        page,
    }
}

export const setChatMessages = messages => {
    return {
        type: SETCHATMESSAGES,
        messages,
    }
}

export const setMoreChatMessages = messages => {
    return {
        type: SETMORECHATMESSAGES,
        messages,
    }
}