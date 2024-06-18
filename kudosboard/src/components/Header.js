import React from 'react';
import { Typography, Container } from '@mui/material';


const Header = () => {
    return (
        <Container style={{ padding: '20px 0'}}>
            <Typography variant="h4" align="center">
                Welcome to Meta U 👋 2024 Kudosboard
            </Typography>
            <Typography variant="h6" align="center">
                This is a place to share your Kudos with others.
            </Typography>
        </Container>
    );
};

export default Header;
