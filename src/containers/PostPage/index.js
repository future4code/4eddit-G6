import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components';
import { fetchPostDetail, postCommentAction, voteCommentAction, votePostAction } from '../../actions';
import { routes } from '../Router'
import { push } from "connected-react-router"
import { Grid } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PostDetail from "../../components/postDetail"
import CommentDetail from "../../components/commentDetail"
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
function PostPage(props) {
    const token = window.localStorage.getItem("token");
    const { id } = props.match.params

    useEffect(() => {
        const token = window.localStorage.getItem("token");
        if (!token) {
            props.goToLogin();
        }
        else {
            props.fetchPost(id)
        }
    }, []);

    const [form, setForm] = useState({})

    const { comments, } = props.post

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!token) {
            props.goToLogin();
        }
        else {
            props.doPostComment(id, form.comment);
        }
    }
    const handleOnChangeForm = name => event => {
        const { value } = event.target;
        setForm({ [name]: value });
    }

    const handleVotePost = (id, direction) => {
        if (!token) {
            props.goToLogin();
        }
        else {
            const { userVoteDirection } = props.post;
            const newVote = userVoteDirection === 0 ? direction : (userVoteDirection === direction ? 0 : direction);
            props.doVotePost(id, newVote);
        }
    }
    const handleVoteComment = (commentId, direction) => {
        if (!token) {
            props.goToLogin();
        }
        else {
            const index = comments.map(el => { return el.id }).indexOf(commentId);
            const comment = comments[index];
            const newVote = comment.userVoteDirection === 0 ? direction : (comment.userVoteDirection === direction ? 0 : direction);
            props.doVoteComment(id, commentId, newVote);
        }
    }

    const commentsCard = comments ? comments.map((el, i) => {
        return (
            <CommentDetail comment={el} onVote={handleVoteComment} key={i}/>
            )
    }) : ""

    return (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
        >
            <Navbar onLogin={props.goToLogin} isLogged={token ? true:false} onFeed={props.goToFeed}/>
            <StyledGrid item lg={4} sm={6} xs={12} container justify="center" wrap="wrap">
                <PostDetail post={props.post} onVote={handleVotePost} />
                <StyledForm onSubmit={handleSubmit}>
                    <TextField
                        id="outlined-comment-input"
                        label="Deixe seu comentário"
                        type="text"
                        name="comment"
                        margin="normal"
                        variant="outlined"
                        onChange={handleOnChangeForm("comment")}
                        value={form["comment"]}
                    />
                    <Button variant="contained" color="primary" type="submit">
                        Postar!
                    </Button>
                </StyledForm>
                <div>
                    {commentsCard}
                </div>
            </StyledGrid>
        </Grid>
    )
}
function mapStateToProps(state) {
    return {
        post: state.post.postDetail
    }
}
function mapDispatchToProps(dispatch) {
    return {
        fetchPost: (id) => dispatch(fetchPostDetail(id)),
        doPostComment: (id, comment) => dispatch(postCommentAction(id, comment)),
        doVoteComment: (postId, commentId, direction) => dispatch(voteCommentAction(postId, commentId, direction)),
        doVotePost: (id, direction) => dispatch(votePostAction(id, direction)),
        goToLogin: () => dispatch(push(routes.loginPage)),
        goToFeed: () => dispatch(push(routes.root))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
