import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from "next/link";

// Material UI Components
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Add from '@mui/icons-material/Add'
import Fab from '@mui/material/Fab';
import Close from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';

const RecipeList = (props) => {
    const router = useRouter();
    //States for managing snackbar messages
    const msg = router.query.message;
    const openStatus = router.query.openNotif;
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);

    //Imports user data from sessionStorage, transfers it to userData state to be used in conditional rendering
    useEffect(() => {
        setMessage(msg);
        setOpen(openStatus);
    }, [router.asPath]);
    
    //Event handler for closing snackbar notifications
    const handleNotificationClose = () => {
        setOpen(false);
    }

    //Part of the snackbar MUI component that adds a close icon for closing the notification
    const action = (
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleNotificationClose}
        >
            <Close fontSize="small"/>
        </IconButton>
    )

    return(
        <Container maxWidth="lg">
            <Box sx={{margin: 'auto', width: "100%", padding: 4}}>
                {/*Page Title*/}
                <Typography variant="h4" paddingY={4}>All Recipes</Typography>
                <Grid container spacing={2} justifyContent="center">
                    {/*Mapping of individual dish to cards*/}
                    {props.dishes.map((dish) => (
                        <Grid key={dish.id} item md={4}>
                            <Card elevation={3} sx={{ minWidth: 200, maxWidth: 300}}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {dish.title}
                                    </Typography>
                                    <Typography variant="body" color="text.secondary" component="div">
                                        by {dish.author}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" noWrap>
                                        {dish.description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Link href={{
                                        pathname: '/recipes/[id]',
                                        query: {
                                            id: dish.id
                                            }
                                    }} passHref>
                                        <Button size="small">Check Dish</Button>
                                    </Link>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Link href="/newrecipe" passHref>
                    {/*Desktop Floating Action Button that sticks to the lower right portion of the window*/}
                    <Fab 
                        variant="extended" 
                        color="primary" 
                        aria-label="add" 
                        sx={{
                        marginTop: 5,
                        position: 'absolute',
                        bottom: 30,
                        right: 30,
                        display: {xs: 'none', md: 'flex'}
                    }}>
                        <Add sx={{mr: 1}}/>
                        Add Item
                    </Fab>
                </Link>
                <Link href="/newrecipe" passHref>
                    {/*Mobile Floating Action Button that sticks to the lower right portion of the window*/}
                    <Fab 
                        color="primary" 
                        aria-label="add" 
                        sx={{
                        marginTop: 5,
                        position: 'fixed',
                        bottom: 30,
                        right: 30,
                        display: {xs: 'flex', md: 'none'}
                    }}>
                        <Add/>
                    </Fab>
                </Link>
                {/*Snackbar Notification that informs users the status of actions (add/edit/delete)*/}
                <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={handleNotificationClose}
                message={message}
                action={action} />
            </Box>
        </Container>
    )
}

export async function getStaticProps(){
    //Fetch dishes list from mock API/Server
    try{
        const res = await fetch('http://localhost:4000/dishes');
        const dishes = await res.json();

        return {
            props: {
                dishes,
            } //Dishes will be pased to the RecipeList component as props
        }
    }
    catch (err){ //Catch error if data fails to load
        return {
            notFound: true
        }
    }
    
}

export default RecipeList