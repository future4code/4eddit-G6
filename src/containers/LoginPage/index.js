import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { routes } from '../Router';
import { push } from 'connected-react-router';
import { loginAction } from '../../actions';

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width:100vw;
    min-height:100vh;
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
        <StyledContainer>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">email</label>
                        <input
                            id="email"
                            name="email"
                            onChange={handleInputChange("email")}
                            value={form["email"]}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            onChange={handleInputChange("password")}
                            value={form["password"]}
                        />
                    </div>

                    <button type="submit">Entrar</button>
                </form>
                <button onClick={handleClickSignUp}>Cadastrar</button>
            </div>
        </StyledContainer>
    )

}

function mapDispatchToProps(dispatch) {
    return {
        goToSignUp: () => dispatch(push(routes.signUpPage)),
        doLogin: (email, password) => dispatch(loginAction(email, password)),
        goToFeedPage: () => dispatch(push(routes.feedPage))
    }
}

export default connect(null, mapDispatchToProps)(LoginPage);
