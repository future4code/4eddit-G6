const initialState={}

export const feed = (state=initialState, action ) =>{
    switch(action.type){
        case "SET_FEED":
            return {...state, posts:action.payload.posts} 
        default:
            return state
    }
}