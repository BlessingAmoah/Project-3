import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container, Grid, Card, CardContent, Typography, Button, MenuItem, Select, InputLabel, FormControl,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, CardMedia,
  IconButton, InputBase, Paper, ToggleButton, ToggleButtonGroup
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

const SearchContainer = styled(Paper)({
  display: 'flex',
  alignItems: 'center',
  padding: '2px 4px',
  marginBottm: '20px'
})

const SearchInput = styled(InputBase)({
  marginLeft: '8px',
  flex: 1,
})

const SearchIconButton = styled(IconButton)({
  padding: 10,
});

const FilterButtonGroup = styled(ToggleButtonGroup)({
  display: 'flex',
  justfiyContent: 'center',
  padding: '10px',

})

const BoardData = [
  { id: 1, image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdjZpN29wdm45NGpxMWJpNzNrdnQxYjZ0d2l3a2t0MndhaGd2dmFmdyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/q4QfjGnFKryzjosj1g/giphy.gif', title: 'Celebration', description: "Won 2024 Champions League", Author: "Blessing", category: "Celebration", upvotes: 0 },
  { id: 2, image: 'https://media.giphy.com/media/fxI1G5PNC5esyNlIUs/giphy.gif?cid=790b7611wxv3hp47gcsfl7rzoatfrpp28jad1ophugyhp57b&ep=v1_gifs_search&rid=giphy.gif&ct=g', title: 'Thank You', description: "Thanks for the Hardwork", Author: "Blessing", category: "Thank You", upvotes: 0 },
  { id: 3, image: 'https://media.giphy.com/media/GFHJXPCoVQEec/giphy.gif?cid=790b76112buu4hwg5cwjrrfs3ya8mnm3exe97hwdfoznarl2&ep=v1_gifs_search&rid=giphy.gif&ct=g', title: 'Recent', description: "Recent Cards", Author: "Gideon", category: "Recent", upvotes: 0 },
  { id: 4, image: 'https://media.giphy.com/media/gj0QdZ9FgqGhOBNlFS/giphy.gif?cid=790b76112buu4hwg5cwjrrfs3ya8mnm3exe97hwdfoznarl2&ep=v1_gifs_search&rid=giphy.gif&ct=g', title: 'Recent', description: "Hahaha", Author: "Gideon", category: "IRecent", upvotes: 0 },
  { id: 5, image: 'https://media.giphy.com/media/wW95fEq09hOI8/giphy.gif?cid=790b76112buu4hwg5cwjrrfs3ya8mnm3exe97hwdfoznarl2&ep=v1_gifs_search&rid=giphy.gif&ct=g', title: 'Inspiration', description: "Motivation", Author: "Gideon", category: "Inspiration", upvotes: 0 },
  { id: 6, image: 'https://media.giphy.com/media/K4M39IfnOAgww/giphy.gif?cid=790b76112buu4hwg5cwjrrfs3ya8mnm3exe97hwdfoznarl2&ep=v1_gifs_search&rid=giphy.gif&ct=g', title: 'Inspiration', description: "Motivation", Author: "Gideon", category: "Inspiration", upvotes: 0 },
  { id: 7, image: 'https://media.giphy.com/media/pgWYgzHX5cWheQUDwo/giphy.gif?cid=ecf05e473npo7b2xafm3tlddyhoantobuknvdmw2j0pgm611&ep=v1_gifs_search&rid=giphy.gif&ct=g', title: 'Celebration', description: "Lets celebrate", Author: "Gideon", category: "Celebration", upvotes: 0 },
  { id: 8, image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3h2M2hwNDdnY3NmbDdyem9hdGZycHAyOGphZDFvcGh1Z3locDU3YiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/sjkl9MJD57BWersvzJ/giphy.gif', title: 'Thank You', description: "Thanks", Author: "Gideon", category: "Thank You", upvotes: 0 },
];

const Dashboard = () => {
  const [boards, setBoards] = useState(BoardData);
  const [filter, setFilter] = useState('all');
  const [open, setOpen] = useState(false);
  const [newBoard, setNewBoard] = useState({ image: '', title: '', description: '', Author: '', category: 'Celebration', upvotes: 0 });
  const [searchTerm, setSearchTerm] = useState('');

  const handleFilterChange = (event, newFilter) => {
    setFilter(newFilter);
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
      <SearchContainer>
        <SearchInput
          placeholder="Search Boards"
          inputProps={{ 'aria-label': 'search boards' }}
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <SearchIconButton type="submit"  aria-label="search">
          <SearchIcon />
        </SearchIconButton>
      </SearchContainer>


      <CardContent>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <FilterButtonGroup
      value={filter}
      exclusive
      onChange={handleFilterChange}
      aria-label='text alignment'>
        <Card>
        <ToggleButton value="all" aria-label='all'>
          All
        </ToggleButton>
        </Card>
        <Card>
        <ToggleButton value="Recent" aria-label='recent'>
          Recent
        </ToggleButton>
        </Card>
        <Card>
        <ToggleButton value="Celebration" aria-label='celebration'>
          Celebration
        </ToggleButton>
        </Card>
        <Card>
        <ToggleButton value="Thank You" aria-label='thank you'>
          Thank You
        </ToggleButton>
        </Card>
        <Card>
        <ToggleButton value="Inspiration" aria-label='inspiration'>
          Inspiration
        </ToggleButton>
        </Card>
      </FilterButtonGroup>
      </div>
      </CardContent>


      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Button variant="contained" color="secondary" onClick={handleClickOpen} margin="10px" >Add New Board</Button>
      </div>

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
                <Typography variant="body2" color="textSecondary">Title: {board.title}</Typography>
                <Typography variant="body2" color="textSecondary">Description: {board.description}</Typography>
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
