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
    margin-bottom: 16px;
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
export default function CommentDetail(props) {
    const { id, text, votesCount, username, userVoteDirection, createdAt } = props.comment

    const handleUpVote = () => {
        props.onVote(id, 1)
    }

    const handleDownVote = () => {
        props.onVote(id, -1)
    }

    const colorUpvote = userVoteDirection === 1 ? "primary" : ""
    const colorDownvote = userVoteDirection === -1 ? "secondary" : "";
    const date = new Date(createdAt).toLocaleDateString();
    const time = new Date(createdAt).toLocaleTimeString();
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
                        Postado por u/{username} - {date} / {time}
                    </Typography>
                    <Typography component="p">
                        {text}
                    </Typography>
                </CardContent>
            </StyledCardActionArea>
        </StyledCard>
    )
}
