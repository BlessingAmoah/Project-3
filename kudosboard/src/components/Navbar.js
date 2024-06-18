import React from 'react';
import { AppBar, Toolbar, Typography} from '@mui/material';


const Navbar = () => {
    return (
        <AppBar position="static">
            <Toolbar style={{ justifyContent: 'center'}}>
                <Typography variant="h6" style={{flexflow: 1}} >
                    Kudosboard 🎉🐐🐐🎉
                </Typography>

                </Toolbar>
        </AppBar>
    );
};

export default Navbar;
