import axios from 'axios';

export const loginAction = (email, password) => async dispatch => {
    const request = await axios.post(
        "https://us-central1-missao-newton.cloudfunctions.net/fourEddit/login",
        {
            email,
            password
        }
    )
    window.localStorage.setItem("token", request.data.token);
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
    console.log(request)
} 

export const postAction = (title, text) => async dispatch => {
    console.log(title, text)
    const request = await axios.post(
        "https://us-central1-missao-newton.cloudfunctions.net/fourEddit/posts",
        {
            text,
            title
        },
        {
            headers:{
                auth:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlRIR0FWV2dQdXF3SHNqdnBvT0hQIiwidXNlcm5hbWUiOiJqb2FvMjAwNyIsImVtYWlsIjoiam9hbzIwMDdAdGVzdGUuY29tLmJyIiwiaWF0IjoxNTczNTgwOTkxfQ.OrCbbjp3Pgq0y6Cb-LVXvjYFGjy57bAya4My_DboHi4"
            }
        }
    )
    console.log(request)
} 