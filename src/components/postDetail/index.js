import React from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import IconUpVote from '@material-ui/icons/ArrowUpward';
import IconDownVote from '@material-ui/icons/ArrowDownward';
import IconComment from '@material-ui/icons/Announcement';
import styled from 'styled-components';

const StyledCard = styled(Card)`
    display: flex;
    width:414px;
`
const StyledCardActionArea = styled(CardActionArea)`
width: 100%;

display: block;

text-align: inherit;
`
const StyledCardActions = styled(CardActions)`
    display:flex;
    flex-direction:column;
    justify-items:center;
`
const StyleBottomIcons = styled(Typography)`
    display: flex;
    align-items: center;
    padding-left: 16px;
`
export default function postDetail(props) {
    const { id, title, text, votesCount, username, userVoteDirection, commentsNumber } = props.post

    const handleClickDetail = () => {
        props.onClickDetail(id)
    }

    const handleUpVote = () => {
        props.onVote(id, 1)
    }

    const handleDownVote = () => {
        props.onVote(id, -1)
    }

    const colorUpvote = userVoteDirection === 1 ? "primary" : ""
    const colorDownvote = userVoteDirection === -1 ? "secondary" : "";

    return (
        <StyledCard>
            <StyledCardActions>
                <IconButton aria-label="UpVote" color={colorUpvote} onClick={handleUpVote}>
                    <IconUpVote />
                </IconButton>
                <Typography variant="h5">
                    {votesCount}
                </Typography>
                <IconButton aria-label="DownVote" color={colorDownvote} onClick={handleDownVote}>
                    <IconDownVote />
                </IconButton>
            </StyledCardActions>
            <StyledCardActionArea >
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                        Postado por u/{username} a tantas h
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {title}
                    </Typography>
                    <Typography component="p">
                        {text}
                    </Typography>
                </CardContent>
                <StyleBottomIcons component="div" variant="subtitle2" color="textSecondary" gutterBottom>
                    <IconComment fontSize="small" /> {commentsNumber} Comentários
                </StyleBottomIcons>
            </StyledCardActionArea>
        </StyledCard>
    )
}
