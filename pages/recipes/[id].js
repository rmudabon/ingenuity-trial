import React from "react";
import Link from 'next/link';

import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';

const Recipe = (props) => {
    const dish = props.props.dish;
    const date_updated = new Date(dish.date_updated);
    console.log(dish)
    return(
        <Container maxWidth="lg">
            <Box sx={{margin: 'auto', width: '100%', padding: 4}}>
                <Typography variant="h4" paddingY={4} component="div" textAlign='center'>{dish.title}</Typography>
                <Typography variant="body2" marginBottom={2}>By {dish.author}</Typography>
                <Typography variant="body2" marginBottom={2}>Last Updated on: {date_updated.toDateString()} </Typography>
                <Divider/>
                    <Typography variant="p" component="div" marginY={4}>{dish.description}</Typography>
                <Divider/>
                    <Typography variant="h5" component="div" marginY={4} textAlign='center'>Ingredients</Typography>
                    <ul>
                    {dish.ingredients.map((ingredient) =>(
                        <li>
                        <Typography variant="body2">{ingredient}</Typography>
                        </li>
                    ))}
                    </ul>
                    <Typography variant="body1" component="div" marginY={4}>Servings: {dish.servings}</Typography>
                <Divider/>
                    <Typography variant="h5" component="div" marginY={4} textAlign='center'>Instructions</Typography>
                    <ol>
                        {dish.instructions.map((instruction) =>(
                            <li>
                            <Typography variant="body2">{instruction}</Typography>
                            </li>
                        ))}
                    </ol>
                <Stack direction={{xs: 'column', md: 'row'}} spacing={2} justifyContent="center">
                    <Link href={{
                        pathname: '/recipes/[id]/edit',
                        query: {
                            id: dish.id
                            }
                    }} passHref>
                        <Button variant="outlined">Edit Recipe</Button>
                    </Link>
                    <Button variant="outlined" color="error">Delete Recipe</Button>
                </Stack>
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
    return {
        props: {
            id: recipe_id,
            dish: dish_details,
        }
    } //Data is passed as props to the Recipe component
}

export default Recipe