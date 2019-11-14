import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { postAction, fetchPostsAction } from '../../actions';
import PostCard from '../../components/post';
import { routes } from '../Router'
import { push } from "connected-react-router"

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width:100vw;
    min-height:100vh;
`

function FeedPage(props) {

    const [post, setPost] = useState({})

    const { fetchPosts } = props;
    useEffect(() => {
        const token = window.localStorage.getItem("token");
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

    const allPosts = props.feed ? props.feed.map((el, i) => {
        return <PostCard post={el} key={i} onClickDetail={handleClickDetail} />
    }) : ""
    return (
        <StyledContainer>
            <div>
                <form onSubmit={handleSubmitCreatePost}>
                    <label htmlFor="title">Criar Post </label>
                    <input
                        id="title"
                        name="title"
                        onChange={handleInputChange("title")}
                        value={post["title"]}
                    />
                    <textarea
                        name="text"
                        id="text"
                        rows="5"
                        cols="40"
                        onChange={handleInputChange("text")}
                        value={post["text"]}
                    />
                    <button type="submit">Criar Post</button>
                </form>
            </div>
            {allPosts}
        </StyledContainer>
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
        goToPost: (id) => dispatch(push(`/feed/${id}`))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedPage);
