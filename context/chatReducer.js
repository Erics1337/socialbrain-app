// Reducer

const ChatReducer = (state, action) => {
    switch (action.type) {
        case "SET_CURRENT_CHAT":
            console.log("SET_CURRENT_CHAT", action.payload)
            return {
                ...state,
                currentChat: action.payload,
            }
        case "SET_NEW_MESSAGE_COUNT":
            console.log("SET_NEW_MESSAGE_COUNT", action.payload)
            return {
                ...state,
                newMessageCount: action.payload,
            }
        default:
            return state
    }
}

export default ChatReducer