import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width:30vw;
    min-height:20vh;
    border:2px solid black;
    justify-content: space-between;
    cursor: pointer;
`
const StyledHeader = styled.header`
    justify-content: flex-start;
    flex-grow: 1;
`
const StyledSection = styled.section`
    flex-grow: 3;
    border:2px solid black;
    width:30vw;
`
const StyledFooter = styled.footer`
    justify-content: flex-end;
    flex-grow: 1;
    display:flex;
    flex-direction:row;
`

function PostCard(props) {
    const { id, title, text, votesCount, username, commentsNumber } = props.post

    const handleClickDetail = () => {
        props.onClickDetail(id)
    }
    return (
        <StyledContainer onClick={handleClickDetail}>
            <StyledHeader>
                {title}------ user:{username}
            </StyledHeader>
            <StyledSection>
                {text}
            </StyledSection>
            <StyledFooter>
                <button>UpVote</button>
                votos:{votesCount} comentários:{commentsNumber}
                <button>downVote</button>
            </StyledFooter>

        </StyledContainer>
    )
}

export default PostCard;