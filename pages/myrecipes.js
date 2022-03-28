import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from "next/link";

//Material UI Components
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

const MyRecipeList = (props) => {
    const router = useRouter();
    //State regarding user information
    const [userData, setUserData] = useState({isLoggedin: false, name: '', isAdmin: false});

    //Imports user data from sessionStorage, transfers it to userData state to be used in conditional rendering
    useEffect(() => {
        const userDat = JSON.parse(sessionStorage.getItem("user"));
        if(userDat){
            setUserData(userDat);
        }
    }, [router.asPath]);
    
    //Filters all dishes to the dishes only made by the user
    const myRecipes = props.dishes.filter((dish) => dish.author === userData.name);



    return(
        <Container maxWidth="lg">
            <Box sx={{margin: 'auto', width: "100%", padding: 4}}>
                <Typography variant="h4" paddingY={4}>My Recipes</Typography>
                <Grid container spacing={2} justifyContent="center">
                    {/*Mapping of individual dishes to cards, only shows recipes made by the user*/}
                    {myRecipes.map((dish) => (
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

export default MyRecipeList