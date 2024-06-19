import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container, Grid, Card, CardContent, Typography, Button, MenuItem, Select, InputLabel, FormControl,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, CardMedia,
  IconButton, InputBase, Paper
} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/system';

const HoverCard = styled(Card)({
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

const BoardData = [
  { id: 1, image: 'https://images5.alphacoders.com/136/thumb-1920-1364852.png', title: 'Celebration', description: "Won 2024 Champions League", Author: "Blessing", category: "Celebration", upvotes: 0 },
  { id: 2, image: 'https://www.codepath.org/hubfs/homepage_ftl.png', title: 'Thank You', description: "Thanks for the Hardwork", Author: "Blessing", category: "Thank You", upvotes: 0 },
  { id: 3, image: 'https://www.codepath.org/hubfs/homepage_ftl.png', title: 'Inspiration', description: "Motivation for the day", Author: "Jane Doe", category: "Inspirational", upvotes: 0 },
  { id: 4, image: 'https://www.codepath.org/hubfs/homepage_ftl.png', title: 'Recent', description: "Recent Cards", Author: "Gideon", category: "Recent", upvotes: 0 },
];

const Dashboard = () => {
  const [boards, setBoards] = useState(BoardData);
  const [filter, setFilter] = useState('all');
  const [open, setOpen] = useState(false);
  const [newBoard, setNewBoard] = useState({ image: '', title: '', description: '', Author: '', category: 'Celebration', upvotes: 0 });
  const [searchTerm, setSearchTerm] = useState('');

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    const { name, value } = event.target;
    setNewBoard((prevBoard) => ({ ...prevBoard, [name]: value }));
  };

  const handleAddBoard = () => {
    setBoards((prevBoards) => [...prevBoards, { ...newBoard, id: prevBoards.length + 1 }]);
    setOpen(false);
  };

  const handleUpvote = (id) => {
    setBoards(boards.map(board => board.id === id ? { ...board, upvotes: board.upvotes + 1 } : board));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBoards = boards.filter((board) =>
    (filter === 'all' || board.category === filter) &&
    (board.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      board.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Container>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogContentText>
            Add a new board to the dashboard
          </DialogContentText>
          <TextField autoFocus margin="dense" name="title" label="Title" type="text" fullWidth value={newBoard.title} onChange={handleSubmit} />
          <TextField margin="dense" name="description" label="Description" type="text" fullWidth value={newBoard.description} onChange={handleSubmit} />
          <TextField margin="dense" name="Author" label="Author" type="text" fullWidth value={newBoard.Author} onChange={handleSubmit} />
          <TextField margin="dense" name="image" label="Image URL /GIF " type="text" fullWidth value={newBoard.image} onChange={handleSubmit} />
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select name="category" value={newBoard.category} onChange={handleSubmit}>
              <MenuItem value="Celebration">Celebration</MenuItem>
              <MenuItem value="Thank You">Thank You</MenuItem>
              <MenuItem value="Inspirational">Inspiration</MenuItem>
              <MenuItem value="Recent">Recent</MenuItem>
            </Select>
            <DialogTitle>Add New Board</DialogTitle>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={handleAddBoard} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
      <FormControl fullWidth margin="normal">
        <InputLabel>Filter by Category</InputLabel>
        <Select value={filter} onChange={handleFilterChange}>
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="Celebration">Celebration</MenuItem>
          <MenuItem value="Thank You">Thank You</MenuItem>
          <MenuItem value="Inspirational">Inspiration</MenuItem>
          <MenuItem value="Recent">Recent</MenuItem>
        </Select>
      </FormControl>
      <Paper className={classes.search}>
        <InputBase
          className={classes.searchInput}
          placeholder="Search Boards"
          inputProps={{ 'aria-label': 'search boards' }}
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <IconButton type="submit" className={classes.searchButton} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      <Button variant="contained" color="secondary" onClick={handleClickOpen} margin="10px">Add New Board</Button>
      <Grid container spacing={3} margin="10px">
        {filteredBoards.map((board) => (
          <Grid item xs={12} sm={6} md={4} key={board.id}>
            <HoverCard>
              {board.image && (
                <CardMedia component="img" height={300} image={board.image} alt={board.title} />
              )}
              <CardContent spacing="3">
                <Typography variant="h5">
                  <Link to={`/board/${board.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>{board.title}</Link>
                </Typography>
                <Typography variant="body2" color="textSecondary">{board.description}</Typography>
                <Typography variant="body2" color="textSecondary">Author: {board.Author}</Typography>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <IconButton color="primary" onClick={() => handleUpvote(board.id)}>
                      <ThumbUpIcon />
                      <Typography variant="body2" color="textSecondary">{board.upvotes}</Typography>
                    </IconButton>
                  </div>
                  <div>
                    <Button variant="contained" color="primary" component={Link} to={`/board/${board.id}`}>View</Button>
                  </div>
                  <div>
                    <Button variant="contained" color="secondary" onClick={() => setBoards(boards.filter(b => b.id !== board.id))}>Delete</Button>
                  </div>
                </div>
              </CardContent>
            </HoverCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;
