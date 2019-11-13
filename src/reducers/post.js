const initialState = {
    postDetail: ""
}

export const post = (state = initialState, action) => {
    switch (action.type) {
        case "SET_POST_DETAIL":
            return { ...state, postDetail: action.payload.post }
        default:
            return state
    }
}