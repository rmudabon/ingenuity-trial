import React, { useState } from 'react';
import Link from "next/link";

// Material-UI Components Imported
import AppBar from '@mui/material/AppBar';
import ToolBar from '@mui/material/ToolBar';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { Container, Typography } from '@mui/material';
import { deepOrange } from '@mui/material/colors';

//Constants for page labels
const user_pages = ['Recipes', 'My Recipes'];
const user_settings = ['Logout'];

// Header for Page Navigation
const Header = () => {
    //Set hooks for setting display of pages and user settings menus
    const [anchorElPages, setAnchorElPages] = React.useState(null);
    const [anchorElUserSettings, setAnchorElUserSettings] = React.useState(null);
    //Boolean values that determine if page or settings menu is opened
    const open_page = Boolean(anchorElPages)
    const open_settings = Boolean(anchorElUserSettings)

    //Event handlers to facilitate display of pages and user settings menus
    const handleOpenPagesMenu = (event) => {
        setAnchorElPages(event.currentTarget);
    }

    const handleOpenUserSettingsMenu = (event) => {
        setAnchorElUserSettings(event.currentTarget);
    }

    const handleClosePagesMenu = () => {
        setAnchorElPages(null);
    }

    const handleCloseUserSettingsMenu = () => {
        setAnchorElUserSettings(null);
    }

    return(
        <AppBar position="static">
            <Container maxWidth="xl">
                <ToolBar>
                     {/* Desktop Logo Text, only displays if device reaches MD viewport size */}
                    <Typography
                        variant="h6"
                        component="div"
                        noWrap
                        sx={{
                            display: {xs: 'none', md: 'flex'}
                        }}
                    >
                    RECIPE DB
                    </Typography>  
                    {/* Mobile Menu, only displays if device reaches XS viewport size */}
                    <Box sx={{ flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                         {/* Mobile Menu Icon that pops up the Pages popup when clicked*/}
                        <IconButton
                            size="medium"
                            aria-haspopup="true"
                            aria-label="List of Pages"
                            aria-controls="menu-bar"
                            onClick={handleOpenPagesMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        {/* Pages Popup for Mobile Devices*/}
                        <Menu
                            id="menu-bar"
                            anchorEl={anchorElPages}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left'
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left'
                            }}
                            open={open_page}
                            onClose={handleClosePagesMenu}
                            sx={{
                                display: {xs: 'block', md: 'none'}
                            }}
                        >
                            {user_pages.map((page) => (
                                <MenuItem key={page} onClick={handleClosePagesMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    {/* Mobile Logo Text, only displays if device reaches XS viewport size */}
                    <Typography
                        variant="h6"
                        component="div"
                        noWrap
                        sx={{
                            display: {xs: 'flex', md: 'none'}
                        }}
                    >
                    RECIPE DB
                    </Typography>  
                     {/* Desktop Menu, only displays if device reaches at least MD viewport size */}
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        {user_pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleClosePagesMenu}
                                sx={{my: 2, ml: 2,  color: 'white', display: 'block'}}
                            >
                               <Typography>{page}</Typography> 
                            </Button>
                        ))}
                    </Box>
                    {/* User Settings Menu*/}
                    <Box sx={{flexGrow: 0}}>
                        {/* Avatar and Icon that pops up the User Settings popup when clicked*/}
                        <IconButton onClick={handleOpenUserSettingsMenu}>
                            <Avatar alt="User" variant="square" sx={{ bgcolor: deepOrange[500]}}>
                                U
                            </Avatar>
                        </IconButton>
                        {/* Settings Popup*/}
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
                    </Box>
                </ToolBar>
            </Container>
        </AppBar>
    )
    


}

export default Header;