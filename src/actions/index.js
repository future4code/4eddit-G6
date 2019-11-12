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