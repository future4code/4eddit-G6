import axios from 'axios';
import { routes } from '../containers/Router'
import { push } from "connected-react-router"
const token = window.localStorage.getItem("token");

export const setFeed = (posts) => ({
    type: "SET_FEED",
    payload: {
        posts: posts.posts
    }
})
export const setPostDetail = (post) => ({
    type: "SET_POST_DETAIL",
    payload: {
        post
    }
})

export const fetchPostsAction = () => async dispatch => {
    try {
        const request = await axios.get(
            "https://us-central1-missao-newton.cloudfunctions.net/fourEddit/posts",
            {
                headers: {
                    auth: token
                }
            }
        )
        dispatch(setFeed(request.data))
    }
    catch{

    }
    
}


export const loginAction = (email, password) => async dispatch => {
    const request = await axios.post(
        "https://us-central1-missao-newton.cloudfunctions.net/fourEddit/login",
        {
            email,
            password
        }
    )
    window.localStorage.setItem("token", request.data.token);
    dispatch(push(routes.root))
}

export const signupAction = (username, email, password) => async dispatch => {
    const request = await axios.post(
        "https://us-central1-missao-newton.cloudfunctions.net/fourEddit/signup",
        {
            email,
            password,
            username
        }
    )
    dispatch(push(routes.root))
}

export const postAction = (title, text) => async dispatch => {
    const request = await axios.post(
        "https://us-central1-missao-newton.cloudfunctions.net/fourEddit/posts",
        {
            text,
            title
        },
        {
            headers: {
                auth: token
            }
        }
    )
    dispatch(fetchPostsAction())
}


export const fetchPostDetail = (id) => async dispatch => {
    const request = await axios.get(
        `https://us-central1-missao-newton.cloudfunctions.net/fourEddit/posts/${id}`, {
        headers: {
            auth: token
        }
    }
    )
    dispatch(setPostDetail(request.data.post))
}

export const postCommentAction = (id, comment) => async dispatch => {
    const request = await axios.post(
        `https://us-central1-missao-newton.cloudfunctions.net/fourEddit/posts/${id}/comment`,
        {
            text: comment
        },
        {
            headers: {
                auth: token
            }
        }
    )
    dispatch(fetchPostDetail(id))
}

export const voteCommentAction = (postId, commentId, direction) => async dispatch => {
    const request = await axios.put(
        `https://us-central1-missao-newton.cloudfunctions.net/fourEddit/posts/${postId}/comment/${commentId}/vote`,
        {
            direction
        },
        {
            headers: {
                auth: token
            }
        }
    )
    dispatch(fetchPostDetail(postId))
}

export const votePostAction = (postId, direction) => async dispatch => {
    const request = await axios.put(
        `https://us-central1-missao-newton.cloudfunctions.net/fourEddit/posts/${postId}/vote`,
        {
            direction
        },
        {
            headers: {
                auth: token
            }
        }
    )
    dispatch(fetchPostDetail(postId))
}

