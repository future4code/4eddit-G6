import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { routes } from '../Router';
import { push } from 'connected-react-router'

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
        event.preventDefault() //evita que a página seja recarregada 
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
                            <label htmlFor="login">Login</label>
                            <input id="login" name="login" onChange={this.handleInputChange} />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input id="password" name="password" type="password" onChange={this.handleInputChange} />
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
        goToSignUp:() => dispatch(push(routes.signUp)) 
    }
}

export default connect(null,mapDispatchToProps)(LoginPage);
