import React from "react";
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
    const [adminUser, isAdminUser] = React.useState(null);

    return(
        <Container maxWidth="lg">
            <Box sx={{margin: 'auto', width: '100%', padding: 4}}>
                <Typography variant="h4">Welcome back, User!</Typography>
                <Typography variant="h5" sx={{mt: 5, mb: 5}}>What will you do today?</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
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
                                <Button size="small">Go Now</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card elevation={3} sx={{ maxWidth: 300}}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    My Recipes
                                </Typography>
                                <Typography variant="body" color="text.secondary">
                                    Check and manage your own recipes and improve further on your dishes!
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Go Now</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
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
                                <Button size="small">Go Now</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Box>

        </Container>
    )
}

export default Dashboard