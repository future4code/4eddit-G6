import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { signupAction } from "../../actions";
//import { routes } from "../Router";
//import { push } from "connected-react-router";
//import { loginAction } from '../../actions';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
`;


function SignupPage(props) {

  const [form, setForm] = useState({})

  const handleSubmit = event => {
    event.preventDefault();
    const { username, email, password } = form;
    props.doSignup(username, email, password);
  };

  const handleInputChange = name => event => {
    const { value } = event.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <StyledContainer>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              onChange={handleInputChange("username")}
              value={form["username"]}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
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

          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </StyledContainer>
  );
}
function mapDispatchToProps(dispatch) {
  return {
    doSignup: (username, email, password) => dispatch(signupAction(username, email, password))
  }
}

export default connect(null, mapDispatchToProps)(SignupPage);