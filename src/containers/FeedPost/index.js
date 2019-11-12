import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { postAction } from '../../actions';

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width:100vw;
    min-height:100vh;
`

class FeedPage extends Component {
    constructor(props){
        super(props)
        this.state={
            post:{}
        }
    }

    handleSubmitCreatePost = (event) => {
        event.preventDefault() //evita que a página seja recarregada 
        const{title, text} = this.state.post
        this.props.doPost(title, text)
    }

    handleInputChange = name => event => {
        const { value } = event.target
        this.setState({ post: { ...this.state.post, [name]: value } })
    }

    render() {
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
                <div>
                    post 1
                </div>
                <div>
                    post 1
                </div>
                <div>
                    post 1
                </div>
            </StyledContainer>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        doPost: (title, text)=> dispatch(postAction(title, text))
    }
}

export default connect(null, mapDispatchToProps)(FeedPage);
