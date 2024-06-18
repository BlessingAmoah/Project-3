import React from 'react';
import { Typography, Container } from '@mui/material';


const Footer = () => {
    return (
        <Container style={{ padding: '20px 0', marginTop: '20px', borderTop: '1px solid #ddd'}}>
            <Typography variant="body1" color="text.secondary" align="center">
                &copy; Blessing 2024 Kudosboard!! All rights reserved.
            </Typography>
        </Container>
    );
};

export default Footer;
