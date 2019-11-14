import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import styled from "styled-components";

const StyledAppBar = styled(AppBar)`
    margin-bottom: 32px;
`
const StyledTypo = styled(Typography)`
    flex:1;
`
export default function Navbar(props) {

    const handleLogin = () => {
        props.onLogin();
    }
    const handleFeed = () => {
        props.onFeed();
    }
    const button = props.isLogged ? <Button color="inherit" onClick={handleFeed}>Feed</Button>: <Button color="inherit" onClick={handleLogin}>Login</Button>
    return (
        <StyledAppBar position="static">
            <Toolbar>
                <IconButton color="inherit" aria-label="Menu">
                    <MenuIcon />
                </IconButton>
                <StyledTypo variant="h6" color="inherit">
                    4eddit
            </StyledTypo>
                {button}
            </Toolbar>
        </StyledAppBar>
    )
}
