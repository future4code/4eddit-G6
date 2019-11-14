import axios from 'axios';
import { routes } from '../containers/Router'
import { push } from "connected-react-router"

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
    const request = await axios.get(
        "https://us-central1-missao-newton.cloudfunctions.net/fourEddit/posts",
        {
            headers: {
                auth: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlRIR0FWV2dQdXF3SHNqdnBvT0hQIiwidXNlcm5hbWUiOiJqb2FvMjAwNyIsImVtYWlsIjoiam9hbzIwMDdAdGVzdGUuY29tLmJyIiwiaWF0IjoxNTczNTgwOTkxfQ.OrCbbjp3Pgq0y6Cb-LVXvjYFGjy57bAya4My_DboHi4"
            }
        }
    )
    dispatch(setFeed(request.data))
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
                auth: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlRIR0FWV2dQdXF3SHNqdnBvT0hQIiwidXNlcm5hbWUiOiJqb2FvMjAwNyIsImVtYWlsIjoiam9hbzIwMDdAdGVzdGUuY29tLmJyIiwiaWF0IjoxNTczNTgwOTkxfQ.OrCbbjp3Pgq0y6Cb-LVXvjYFGjy57bAya4My_DboHi4"
            }
        }
    )
    dispatch(fetchPostsAction())
}


export const fetchPostDetail = (id) => async dispatch => {
    const request = await axios.get(
        `https://us-central1-missao-newton.cloudfunctions.net/fourEddit/posts/${id}`, {
        headers: {
            auth: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlRIR0FWV2dQdXF3SHNqdnBvT0hQIiwidXNlcm5hbWUiOiJqb2FvMjAwNyIsImVtYWlsIjoiam9hbzIwMDdAdGVzdGUuY29tLmJyIiwiaWF0IjoxNTczNTgwOTkxfQ.OrCbbjp3Pgq0y6Cb-LVXvjYFGjy57bAya4My_DboHi4"
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
                auth: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlRIR0FWV2dQdXF3SHNqdnBvT0hQIiwidXNlcm5hbWUiOiJqb2FvMjAwNyIsImVtYWlsIjoiam9hbzIwMDdAdGVzdGUuY29tLmJyIiwiaWF0IjoxNTczNTgwOTkxfQ.OrCbbjp3Pgq0y6Cb-LVXvjYFGjy57bAya4My_DboHi4"
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
                auth: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlRIR0FWV2dQdXF3SHNqdnBvT0hQIiwidXNlcm5hbWUiOiJqb2FvMjAwNyIsImVtYWlsIjoiam9hbzIwMDdAdGVzdGUuY29tLmJyIiwiaWF0IjoxNTczNTgwOTkxfQ.OrCbbjp3Pgq0y6Cb-LVXvjYFGjy57bAya4My_DboHi4"
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
                auth: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlRIR0FWV2dQdXF3SHNqdnBvT0hQIiwidXNlcm5hbWUiOiJqb2FvMjAwNyIsImVtYWlsIjoiam9hbzIwMDdAdGVzdGUuY29tLmJyIiwiaWF0IjoxNTczNTgwOTkxfQ.OrCbbjp3Pgq0y6Cb-LVXvjYFGjy57bAya4My_DboHi4"
            }
        }
    )
    dispatch(fetchPostDetail(postId))
}

