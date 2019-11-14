import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { postAction, fetchPostsAction, votePostAction } from '../../actions';
import PostCard from '../../components/post';
import { routes } from '../Router'
import { push } from "connected-react-router"
import { Grid } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Navbar from "../../components/navbar"
const StyledGrid = styled(Grid)`
    > div,form{
        margin-bottom: 16px;
    }
`
const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 414px;
`
function FeedPage(props) {
    const token = window.localStorage.getItem("token");
    const [post, setPost] = useState({})

    const { fetchPosts } = props;
    useEffect(() => {
        if (!token) {
            props.goToLogin();
        }
        else { fetchPosts() }
    }, [])

    const handleSubmitCreatePost = (event) => {
        event.preventDefault()
        const token = window.localStorage.getItem("token");
        if (!token) {
            props.goToLogin();
        }
        else {
            const { title, text } = post
            props.doPost(title, text)
        }
    }

    const handleInputChange = name => event => {
        const { value } = event.target
        setPost({ ...post, [name]: value })
    }

    const handleClickDetail = (id) => {
        const token = window.localStorage.getItem("token");
        if (!token) {
            props.goToLogin();
        }
        else {
            props.goToPost(id)
        }
    }

    const handleVote = (id, direction) => {
        const index = props.feed.map(el => { return el.id }).indexOf(id);
        const userVoteDirection = props.feed[index].userVoteDirection;
        const newVote = userVoteDirection === 0 ? direction : (userVoteDirection === direction ? 0 : direction);
        props.doVotePost(id, newVote);
    }

    const allPosts = props.feed ? props.feed.map((el, i) => {
        return <PostCard post={el} key={i} onClickDetail={handleClickDetail} onVote={handleVote} />
    }) : ""
    return (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
        >
            <Navbar onLogin={props.goToLogin} isLogged={token ? true : false} onFeed={props.goToFeed} />
            <StyledGrid item lg={4} sm={6} xs={12} container justify="center" wrap="wrap">
                <StyledForm onSubmit={handleSubmitCreatePost}>
                    <TextField
                        id="outlined-title-input"
                        label="Título"
                        type="text"
                        name="title"
                        margin="normal"
                        variant="outlined"
                        onChange={handleInputChange("title")}
                        value={post["title"]}
                    />
                    <TextField
                        id="outlined-text-input"
                        label="Post"
                        type="text"
                        name="text"
                        margin="normal"
                        variant="outlined"
                        onChange={handleInputChange("text")}
                        value={post["text"]}
                    />
                    <Button variant="contained" color="primary" type="submit">
                        Postar!
                    </Button>
                </StyledForm>
                {allPosts}
            </StyledGrid>

        </Grid>
    )

}

function mapStateToProps(state) {
    return {
        feed: state.feed.posts
    }
}

function mapDispatchToProps(dispatch) {
    return {
        doPost: (title, text) => dispatch(postAction(title, text)),
        fetchPosts: () => dispatch(fetchPostsAction()),
        goToLogin: () => dispatch(push(routes.loginPage)),
        goToFeed: () => dispatch(push(routes.root)),
        goToPost: (id) => dispatch(push(`/feed/${id}`)),
        doVotePost: (id, direction) => dispatch(votePostAction(id, direction))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedPage);
