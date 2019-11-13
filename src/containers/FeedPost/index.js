import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { postAction, fetchPostsAction } from '../../actions';
import Post from '../../components/post/';


const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width:100vw;
    min-height:100vh;
`

class FeedPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            post: {}
        }
    }

    componentDidMount() {
        this.props.fetchPosts()
    }

    handleSubmitCreatePost = (event) => {
        event.preventDefault() //evita que a página seja recarregada 
        const { title, text } = this.state.post
        this.props.doPost(title, text)
    }

    handleInputChange = name => event => {
        const { value } = event.target
        this.setState({ post: { ...this.state.post, [name]: value } })
    }

    render() {
        const allPosts = this.props.feed ? this.props.feed.map((el, i) => {
            return <Post post={el} key={i}/>
        }) : ""
        return (
            <StyledContainer>
                <div>
                    <form onSubmit={this.handleSubmitCreatePost}>
                        <label htmlFor="title">Criar Post </label>
                        <input
                            id="title"
                            name="title"
                            onChange={this.handleInputChange("title")}
                            value={this.state.post["title"]}
                        />
                        <textarea
                            name="text"
                            id="text"
                            rows="5"
                            cols="40"
                            onChange={this.handleInputChange("text")}
                            value={this.state.post["text"]}
                        />
                        <button type="submit">Criar Post</button>
                    </form>
                </div>
                {allPosts}
            </StyledContainer>
        )
    }
}

function mapStateToProps(state) {
    return {
        feed: state.feed.posts
    }
}
function mapDispatchToProps(dispatch) {
    return {
        doPost: (title, text) => dispatch(postAction(title, text)),
        fetchPosts: () => dispatch(fetchPostsAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedPage);