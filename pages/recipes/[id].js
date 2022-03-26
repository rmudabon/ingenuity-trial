import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

const Recipe = (props) => {
    const router = useRouter();
    
    const dish = props.props.dish;
    const date_updated = new Date(dish.date_updated);

    const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
    const [userData, setUserData] = useState({isLoggedin: false, name: '', isAdmin: false});

    useEffect(() => {
        const userDat = JSON.parse(sessionStorage.getItem("user"));
        if(userDat){
            setUserData(userDat);
        }
    }, [])
    const handleOpenDeleteAlert = () => {
        setOpenDeleteAlert(true);
    }

    const handleCloseDeleteAlert = () => {
        setOpenDeleteAlert(false);
    }

    const handleDelete = () => {
        axios.delete(`http://localhost:4000/dishes/${dish.id}`)
            .then((response) =>{
                console.log(response);
                router.push('/recipes');
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return(
        <Container maxWidth="lg">
            <Box sx={{margin: 'auto', width: '100%', padding: 4}}>
                <Typography variant="h4" paddingY={2} component="div" textAlign='center' sx={{fontWeight: "bold"}}>{dish.title}</Typography>
                <Typography variant="body2" marginBottom={2}>By {dish.author}</Typography>
                <Typography variant="body2" marginBottom={2}>Last Updated on: {date_updated.toDateString()} </Typography>
                <Divider/>
                    <Typography variant="p" component="div" marginY={4}>{dish.description}</Typography>
                <Divider/>
                    <Typography variant="h5" component="div" marginY={4} textAlign='center'>Ingredients</Typography>
                    <ul>
                    {dish.ingredients.map((ingredient, index) =>(
                        <li key={index}>
                        <Typography variant="body2">{ingredient}</Typography>
                        </li>
                    ))}
                    </ul>
                    <Typography variant="body1" component="div" marginY={4}>Servings: {dish.servings}</Typography>
                <Divider/>
                    <Typography variant="h5" component="div" marginY={4} textAlign='center'>Instructions</Typography>
                    <ol>
                        {dish.instructions.map((instruction, index) =>(
                            <li key={index}>
                            <Typography variant="body2">{instruction}</Typography>
                            </li>
                        ))}
                    </ol>
                {(userData.isAdmin === "true" || userData.name === dish.author) ? 
                (<React.Fragment>
                    <Stack direction={{xs: 'column', md: 'row'}} spacing={2} justifyContent="center">
                        <Link href={{
                            pathname: '/recipes/[id]/edit',
                            query: {
                                id: dish.id
                                }
                        }} passHref>
                            <Button variant="outlined">Edit Recipe</Button>
                        </Link>
                        <Button variant="outlined" color="error" onClick={handleOpenDeleteAlert}>Delete Recipe</Button>
                    </Stack>
                    <Dialog
                        open={openDeleteAlert}
                        onCLose={handleCloseDeleteAlert}
                    >
                        <DialogTitle id="delete-recipe-title">
                            {"Delete this recipe?"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="delete-recipe-description">
                                This action cannot be undone!
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDeleteAlert}>Cancel</Button>
                            <Button onClick={handleDelete}>Agree</Button>
                        </DialogActions>
                    </Dialog>
                </React.Fragment>) : null}
            </Box>
        </Container>
    )
}

Recipe.getInitialProps = async ({ query: {id}}) => {
    //Gets the recipe id from the query passed from the recipes.js page
    const recipe_id = {id}.id;
    //Fetch recipe details from the mock API using the recipe ID
    const res = await fetch(`http://localhost:4000/dishes/${recipe_id}`);
    const dish_details = await res.json();
    console.log(recipe_id);
    if(!res){
        return{
            notFound: true
        }
    }

    return {
            props: {
                id: recipe_id,
                dish: dish_details,
            }
        } //Data is passed as props to the Recipe component
}
export default Recipe