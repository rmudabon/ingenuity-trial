import React, { useState, useEffect } from "react";
import Link from "next/link";

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from "@mui/material/Typography";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

const Dashboard = () => {
    const [userData, setUserData] = useState({isLoggedin: false, name: '', isAdmin: false});

    useEffect(() => {
        const userDat = JSON.parse(sessionStorage.getItem("user"));
        if(userDat){
            setUserData(userDat);
        }
    }, [])

    return(
        <Container maxWidth="lg">
            <Box sx={{margin: 'auto', width: '100%', padding: 4}}>
                <Typography variant="h4">Welcome back, {userData.name}!</Typography>
                <Typography variant="h5" sx={{mt: 5, mb: 5}}>What will you do today?</Typography>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item md={4}>
                        <Card elevation={3} sx={{ maxWidth: 300}}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Browse Recipes
                                </Typography>
                                <Typography variant="body" color="text.secondary">
                                    Check your favorite recipes and excite your senses with new dishes!
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Link href="/recipes" passHref>
                                  <Button size="small">Go Now</Button>
                                </Link>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item md={4}>
                        <Card elevation={3} sx={{ maxWidth: 300 }}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    My Recipes
                                </Typography>
                                <Typography variant="body" color="text.secondary">
                                    Check and manage your own recipes and improve further on your dishes!
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Link href="/myrecipes" passHref>
                                    <Button size="small">Go Now</Button>
                                </Link>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item md={4}>
                        <Card elevation={3} sx={{ maxWidth: 300}}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Add Recipe
                                </Typography>
                                <Typography variant="body" color="text.secondary">
                                    Share your creation with the community!
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Link href="/newrecipe" passHref>
                                    <Button size="small">Go Now</Button>
                                </Link>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Box>

        </Container>
    )
}

export default Dashboard