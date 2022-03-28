import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { useRouter } from 'next/router';

// Material-UI Components Imported
import AppBar from '@mui/material/AppBar';
import ToolBar from '@mui/material/ToolBar';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import AvatarMenu from '../components/avatar_menu';


// Header for Page Navigation
const Header = () => {
    const router = useRouter();
    //Set hooks for setting display of pages and user settings menus
    const [anchorElPages, setAnchorElPages] = useState(null);
     //State regarding user information
    const [userData, setUserData] = useState({isLoggedin: "false", name: '', isAdmin: "false"});
    //Boolean values that determine if page or settings menu is opened
    const open_page = Boolean(anchorElPages);
    
    //Event handlers to facilitate display of pages and user settings menus
    const handleOpenPagesMenu = (event) => {
        setAnchorElPages(event.currentTarget);
    }


    const handleClosePagesMenu = () => {
        setAnchorElPages(null);
    }

    //Imports user data from sessionStorage, transfers it to userData state to be used in conditional rendering
   useEffect(() => {
        const userDat = JSON.parse(sessionStorage.getItem("user"));
        //Exits function if no userData is found at initial load of the website
        if(userDat == null){
            return
        }
        setUserData(userDat);
    }, [router.asPath])



    return(
        <AppBar position="static">
            <Container maxWidth="xl">
                <ToolBar>
                     {/* Desktop Logo Text, only displays if device reaches MD viewport size */}
                    <Link href="/" passHref>
                        <Button variant="text" color="inherit"  sx={{ display: {xs: 'none', md: 'flex'}}} >
                            <Typography
                                variant="h6"
                                component="div"
                                noWrap
                                fontWeight="bold"

                            >
                            RECIPE DB
                            </Typography>  
                        </Button>
                    </Link>
                    {/* Mobile Menu, only displays if device reaches XS viewport size */}
                    <Box sx={{ flexGrow: 0, display: {xs: 'flex', md: 'none'}}}>
                    {userData.isLoggedin === "true" ? (
                        <React.Fragment>
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
                            <Link href="/dashboard" passHref>
                                <MenuItem key={1} onClick={handleClosePagesMenu}>
                                    <Typography>Dashboard</Typography> 
                                </MenuItem>
                            </Link>
                            <Link href="/recipes" passHref>
                                <MenuItem key={2} onClick={handleClosePagesMenu}>
                                    <Typography textAlign="center">Recipes</Typography>
                                </MenuItem>
                            </Link>
                            <Link href="/myrecipes" passHref>
                                <MenuItem key={3} onClick={handleClosePagesMenu}>
                                    <Typography textAlign="center">My Recipes</Typography>
                                </MenuItem>
                            </Link>
                        </Menu>
                        </React.Fragment>) : null }
                    </Box>
                    {/* Mobile Logo Text, only displays if device reaches XS viewport size */}
                    <Link href="/" passHref>
                        <Button variant="text" color="inherit" sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                            <Typography
                                variant="h6"
                                component="div"
                                noWrap
                                fontWeight="bold"
                            >
                            RECIPE DB
                            </Typography>
                        </Button>  
                    </Link>
                     {/* Desktop Menu, only displays if device reaches at least MD viewport size */}
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                    {userData.isLoggedin === "true" ? (
                        <React.Fragment>
                        <Link href="/dashboard" passHref>
                            <Button
                                key={1}
                                onClick={handleClosePagesMenu}
                                sx={{my: 2, ml: 2,  color: 'white', display: 'block'}}
                            >
                                <Typography>Dashboard</Typography> 
                            </Button>
                        </Link>
                        <Link href="/recipes" passHref>
                            <Button
                                key={1}
                                onClick={handleClosePagesMenu}
                                sx={{my: 2, ml: 2,  color: 'white', display: 'block'}}
                            >
                                <Typography>Recipes</Typography> 
                            </Button>
                        </Link>
                        <Link href="/myrecipes" passHref>
                            <Button
                                key={1}
                                onClick={handleClosePagesMenu}
                                sx={{my: 2, ml: 2,  color: 'white', display: 'block'}}
                            >
                                <Typography>My Recipes</Typography> 
                            </Button>
                        </Link>
                        </React.Fragment> ) 
                        : null}
                    </Box>
                    {/* User Settings Menu*/}
                    <Box sx={{flexGrow: 0}}>
                        {userData.isLoggedin === "true" ? <AvatarMenu name={userData.name}/> : null}
                    </Box>
                </ToolBar>
            </Container>
        </AppBar>
    )
    


}

export default Header;