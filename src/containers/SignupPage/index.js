import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { signupAction } from "../../actions";
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
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Navbar onLogin={props.goToLogin} isLogged={false} onFeed={props.goToFeed} />
      <div>
        <StyledForm onSubmit={handleSubmit}>
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
          <TextField
            id="outlined-username-input"
            label="Nome de usuário"
            type="text"
            name="username"
            margin="normal"
            variant="outlined"
            onChange={handleInputChange("username")}
            value={form["username"]}
          />
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
            Cadastrar
          </StyledButton>
        </StyledForm>
      </div>
    </Grid>
  );
}
function mapDispatchToProps(dispatch) {
  return {
    doSignup: (username, email, password) => dispatch(signupAction(username, email, password))
  }
}

export default connect(null, mapDispatchToProps)(SignupPage);