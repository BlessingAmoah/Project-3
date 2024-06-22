
import React, { useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { Container, Card, CardContent, Typography,Grid, Button, CardMedia, MenuItem, Select, InputLabel, FormControl, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, IconButton } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';



const BoardView = ({ boards, cardId }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const board = boards.find((board) => board.id === parseInt(id));
    const [originalBoard, setOriginalBoard] = useState(board);

    const [cardComments, setCardComments] = useState({});


    const [cards, setCards] = useState([]);
  const [open, setOpen] = useState(false);
  const [newCard, setNewCard] = useState({ image: '', title: '', description: '', Author: '', category: 'Celebration', upvotes: 0 });


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    const { name, value } = event.target;
    setNewCard((prevCard) => ({ ...prevCard, [name]: value }));
  };

  const handleAddCard = () => {
    setCards((prevCards) => [...prevCards, { ...newCard, id: prevCards.length + 1 }]);
    setOpen(false);
  };

  const handleUpvote = (id) => {
    setCards(cards.map(card => card.id === id ? { ...card, upvotes: card.upvotes + 1 } : card));
  };


    if (!board) {
        return <Typography>Board not found</Typography>;
    }

    const handleComment = (cardId, newComment) => {
        setCardComments((prevComments) => ({ ...prevComments, [cardId]: newComment }));
    };




    return (
        <Container>
            <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogContentText>
            Add a new card to the board
          </DialogContentText>
          <TextField autoFocus margin="dense" name="title" label="Title" type="text" fullWidth value={newCard.title} onChange={handleSubmit} />
          <TextField margin="dense" name="description" label="Description" type="text" fullWidth value={newCard.description} onChange={handleSubmit} />
          <TextField margin="dense" name="Author" label="Author" type="text" fullWidth value={newCard.Author} onChange={handleSubmit} />
          <TextField margin="dense" name="image" label="Image URL /GIF " type="text" fullWidth value={newCard.image} onChange={handleSubmit} />
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select name="category" value={newCard.category} onChange={handleSubmit}>
              <MenuItem value="Celebration">Celebration</MenuItem>
              <MenuItem value="Thank You">Thank You</MenuItem>
              <MenuItem value="Inspirational">Inspiration</MenuItem>
              <MenuItem value="Recent">Recent</MenuItem>
            </Select>
            <DialogTitle>Add New Card</DialogTitle>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={handleAddCard} color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Button variant="contained" color="secondary" onClick={handleClickOpen} margin="10px" >Add New Card</Button>
      </div>

            <Button onClick={() => navigate(-1)} variant="contained" color="primary" style={{marginBottom: '20px'}}>Back</Button>


            <Grid container spacing={3} margin="10px">
            <Grid item key={originalBoard.id} xs={12} sm={6} md={4} lg={3}>
            <Card>
                    {originalBoard.image && (
                  <CardMedia component="img" height={300} image={originalBoard.image} alt={board.title} />
                )}
                <CardContent>
                    <Typography variant="h5">Title: {board.title}</Typography>
                    <Typography variant="body2" color="textSecondary">Description: {board.description}</Typography>
                    <Typography variant="body2" color="textSecondary"> Author: {board.Author}</Typography>
                </CardContent>
                <IconButton color="primary" onClick={() => handleUpvote(board.id)}>
                      <ThumbUpIcon />
                      <Typography variant="body2" color="textSecondary">{board.upvotes}</Typography>
                    </IconButton>
                    <div>
                    <Button variant="contained" color="secondary" onClick={() => setOriginalBoard(null)}>Delete</Button>
                  </div>
                  <DialogContentText>
                    Your Comment Here!
                  </DialogContentText>
                  <TextField
                    value={cardComments[(boards)] || ''}
                    onChange={(e) => handleComment(board.id,e.target.value)}
                    margin="dense"
                    fullWidth
                    label="Write a comment"
                  />
            </Card>

            </Grid>

  {cards.map((card) => (
    <Grid item key={card.id} xs={12} sm={6} md={4} lg={3}>
      <Card>
        {card.image && (
          <CardMedia component="img" height={300} image={card.image} alt={board.title} />
        )}
        <Typography variant="h5">Title: {card.title}</Typography>
        <Typography variant="body2" color="textSecondary">Description:{card.description}</Typography>
        <Typography variant="body2" color="textSecondary"> Author: {card.Author}</Typography>

        <IconButton color="primary" onClick={() => handleUpvote(card.id)}>
          <ThumbUpIcon />
          <Typography variant="body2" color="textSecondary">{card.upvotes}</Typography>
        </IconButton>
        <div>
        <Button variant="contained" color="secondary" onClick={() => setCards(cards.filter(b => b.id !== card.id))}>Delete</Button>
        <DialogContentText>
                    Your Comment Here!
                  </DialogContentText>
                  <TextField
                    value={cardComments[card.id] || ''}
                    onChange={(e) => handleComment(card.id, e.target.value)}
                    margin="dense"
                    fullWidth
                    label="Write a comment"
                  />

        </div>
      </Card>

    </Grid>

  ))}
</Grid>


        </Container>
    );
};


export default BoardView;
