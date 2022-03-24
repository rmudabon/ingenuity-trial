import React from "react";
import Link from "next/link";

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const RecipeList = (props) => {
    return(
        <Container maxWidth="lg">
            <Box sx={{margin: 'auto', width: "100%", padding: 4}}>
                <Typography variant="h4" paddingY={4}>All Recipes</Typography>
                <Grid container spacing={2} justifyContent="center">
                    {/*Mapping of individual dish to cards*/}
                    {props.dishes.map((dish) => (
                        <Grid key={dish.id} item md={4}>
                            <Card elevation={3} sx={{ maxWidth: 300}}>
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
            </Box>
        </Container>
    )
}

export async function getStaticProps(){
    //Fetch dishes list from mock API/Server
    const res = await fetch('http://localhost:4000/dishes');
    const dishes = await res.json();

    return {
        props: {
            dishes,
        } //Dishes will be pased to the RecipeList component as props
    }
}

export default RecipeList