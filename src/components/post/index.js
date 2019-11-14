import React from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import IconUpVote from '@material-ui/icons/ArrowUpward';
import IconDownVote from '@material-ui/icons/ArrowDownward';

const StyledCard = styled(Card)`
    display:flex;
    width:414px;
`

const StyledCardActions = styled(CardActions)`
    display:flex;
    flex-direction:column;
    justify-items:center;
`

function PostCard(props) {
    const { id, title, text, votesCount, username, commentsNumber } = props.post

    const handleClickDetail = () => {
        props.onClickDetail(id)
    }

    const handleUpVote = () => {
        props.onVote(id, 1)
    }

    const handleDownVote = () => {
        props.onVote(id, -1)
    }

    return (
        <StyledCard>
            <CardActionArea onClick={handleClickDetail}>
                <StyledCardActions>
                    <IconButton aria-label="UpVote" onClick={handleUpVote}>
                        <IconUpVote />
                    </IconButton>
                    <Typography variant="h5">
                        {votesCount}
                    </Typography>
                    <IconButton aria-label="DownVote" onClick={handleDownVote}>
                        <IconDownVote />
                    </IconButton>
                </StyledCardActions>
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
            </CardActionArea>
        </StyledCard>
    )
}

export default PostCard;