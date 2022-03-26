import React, { useEffect, useState } from 'react';
import Link from "next/link";

import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';

const AvatarMenu = (props) => {

    //Constants for page labels
    const user_settings = ['Logout'];

    const [anchorElUserSettings, setAnchorElUserSettings] = useState(null);
    const open_settings = Boolean(anchorElUserSettings);

    const handleOpenUserSettingsMenu = (event) => {
        setAnchorElUserSettings(event.currentTarget);
    }

    const handleCloseUserSettingsMenu = () => {
        setAnchorElUserSettings(null);
    }

    /* Avatar and Icon that pops up the User Settings popup when clicked*/
    return(
        <React.Fragment>
            <IconButton onClick={handleOpenUserSettingsMenu}>
            <Avatar alt="User" variant="square" sx={{ bgcolor: "black"}}>
                {props.name[0]}
            </Avatar>
            </IconButton>
            <Menu
                sx={{mt: '50px'}}
                id="menu-settings"
                anchorEl={anchorElUserSettings}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                open={open_settings}
                onClose={handleCloseUserSettingsMenu}
            >
                {user_settings.map((setting) => (
                    <MenuItem key={setting}>
                        <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </React.Fragment>
    )
}

export default AvatarMenu;