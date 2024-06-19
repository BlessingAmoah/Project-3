import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Card, CardContent, Typography, Button, CardMedia } from '@mui/material';

const BoardView = ({ boards }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const board = boards.find((board) => board.id === parseInt(id));

    if (!board) {
        return <Typography>Board not found</Typography>;
    }

    return (
        <Container>
            <Button onClick={() => navigate(-1)} variant="contained" color="primary" style={{marginBottom: '20px'}}>Back</Button>
            <Card>
                {board.image && (<CardMedia component="img" width="100" height= "400" image={board.image} alt={board.title} style={{ width: '40%', margin: '0 auto'}}/>)}
                <CardContent>
                    <Typography variant="h5">{board.title}</Typography>
                    <Typography variant="body2" color="textSecondary">{board.description}</Typography>
                    <Typography variant="body2" color="textSecondary"> Author: {board.Author}</Typography>
                </CardContent>
            </Card>
        </Container>
    );
};


export default BoardView;
