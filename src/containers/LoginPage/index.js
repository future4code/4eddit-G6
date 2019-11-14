import React, { Component } from 'react';
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

class LoginPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            form: {}
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const { email, password } = this.state.form
        this.props.doLogin(email, password)
    }

    handleInputChange = name => event => {
        const { value } = event.target
        this.setState({ form: { ...this.state.form, [name]: value } })
    }

    handleClickSignUp = () => {
        this.props.goToSignUp()
    }
    render() {
        return (
            <StyledContainer>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <label htmlFor="email">email</label>
                            <input
                                id="email"
                                name="email"
                                onChange={this.handleInputChange("email")}
                                value={this.state.form["email"]}
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                onChange={this.handleInputChange("password")}
                                value={this.state.form["password"]}
                            />
                        </div>

                        <button type="submit">Entrar</button>
                    </form>
                    <button onClick={this.handleClickSignUp}>Cadastrar</button>
                </div>
            </StyledContainer>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        goToSignUp: () => dispatch(push(routes.signUp)),
        doLogin: (email, password) => dispatch(loginAction(email, password)),
        goToFeedPage: () => dispatch(push(routes.feedPage))
    }
}

export default connect(null, mapDispatchToProps)(LoginPage);
