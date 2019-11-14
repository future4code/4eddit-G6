import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { routes } from '../Router';
import { push } from 'connected-react-router';
import { loginAction } from '../../actions';
import Navbar from "../../components/navbar"
import { Grid } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 414px;
`
const StyledButton = styled(Button)`
    margin-bottom: 16px;
`
function LoginPage(props) {

    const [form, setForm] = useState({})

    const handleSubmit = (event) => {
        event.preventDefault()
        const { email, password } = form
        props.doLogin(email, password)
    }

    const handleInputChange = name => event => {
        const { value } = event.target
        setForm({ ...form, [name]: value })
    }

    const handleClickSignUp = () => {
        props.goToSignUp()
    }
    return (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
        >
            <Navbar onLogin={props.goToLogin} isLogged={false} onFeed={props.goToFeed} />
            <StyledForm onSubmit={handleSubmit}>
                <TextField
                    id="outlined-email-input"
                    label="Email"
                    type="email"
                    name="email"
                    margin="normal"
                    variant="outlined"
                    onChange={handleInputChange("email")}
                    value={form["email"]}
                />
                <TextField
                    id="outlined-password-input"
                    label="Senha"
                    type="password"
                    name="password"
                    margin="normal"
                    variant="outlined"
                    onChange={handleInputChange("password")}
                    value={form["password"]}
                />
                <StyledButton variant="contained" color="primary" type="submit">
                    Login
                </StyledButton>
                <Button variant="outlined" color="primary" onClick={handleClickSignUp}>
                    Cadastrar
                </Button>
            </StyledForm>
        </Grid>
    )

}

function mapDispatchToProps(dispatch) {
    return {
        goToSignUp: () => dispatch(push(routes.signUpPage)),
        doLogin: (email, password) => dispatch(loginAction(email, password)),
        goToFeedPage: () => dispatch(push(routes.feedPage)),
        goToLogin: () => dispatch(push(routes.loginPage)),
    }
}

export default connect(null, mapDispatchToProps)(LoginPage);
