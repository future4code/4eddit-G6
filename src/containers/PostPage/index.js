import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components';
import { fetchPostDetail, postCommentAction, voteCommentAction, votePostAction } from '../../actions';

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width:100vw;
    min-height:100vh;
`

function PostPage(props) {
    const { id } = props.match.params
    useEffect(() => { props.fetchPost(id) }, []);

    const [form, setForm] = useState({})

    const { username, title, text, comments, commentsNumber, userVoteDirection, votesCount } = props.post


    const handleSubmit = (e) => {
        e.preventDefault();
        props.doPostComment(id, form.comment);
    }
    const handleOnChangeForm = name => event => {
        const { value } = event.target;
        setForm({ [name]: value });
    }

    const handleVotePost = (id, direction) => {
        const { userVoteDirection } = props.post;
        const newVote = userVoteDirection === 0 ? direction : (userVoteDirection === direction ? 0 : direction);
        console.log(id,newVote);
        props.doVotePost(id, newVote);
    }
    const handleVoteComment = (commentId, direction) => {
        const index = comments.map(el => { return el.id }).indexOf(commentId);
        const comment = comments[index];
        const newVote = comment.userVoteDirection === 0 ? direction : (comment.userVoteDirection === direction ? 0 : direction);
        props.doVoteComment(id, commentId, newVote);
    }

    const commentsDiv = comments ? comments.map((el, i) => {
        return (
            <div key={i}>
                <h4>{el.username}</h4>
                <h5>{el.text}</h5>
                <div>
                    <button onClick={() => handleVoteComment(el.id, 1)}>Upvote</button>
                    {el.votesCount}
                    <button onClick={() => handleVoteComment(el.id, -1)}>Downvote</button>
                </div>
            </div>)
    }) : ""

    return (
        <StyledContainer>
            <div>
                <h5>{username}</h5>
                <h1>{title}</h1>
                <h3>{text}</h3>
                <div>
                    <button onClick={() => handleVotePost(id, 1)}>Upvote</button>
                    {votesCount}
                    <button onClick={() => handleVotePost(id, -1)}>Downvote</button>
                    {commentsNumber} comentários
                </div>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="comment">Deixe seu comentário</label>
                    <input id="comment" name="comment" onChange={handleOnChangeForm("comment")} />
                    <button type="submit">Enviar</button>
                </form>
            </div>
            <div>
                {commentsDiv}
            </div>
        </StyledContainer>
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
        doVotePost: (id, direction) => dispatch(votePostAction(id, direction))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
