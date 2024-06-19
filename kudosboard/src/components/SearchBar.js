import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const SearchBar =({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        onSearch(query);
    };

    return (
        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
            <TextField
                label="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                fullWidth
            />
            <Button variant="contained" onClick={handleSearch}>Search</Button>
        </Box>
    );
};

export default SearchBar;
