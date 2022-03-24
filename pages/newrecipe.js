import React from "react";
import Link from "next/link";

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Add from '@mui/icons-material/Add'
import Divider from "@mui/material/Divider";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

const NewRecipe = () => {

    //Constants handling ingredients and instructions list
    const [ingredientList, setIngredientList] = React.useState([""]);
    const [instructionsList, setInstructionsList] = React.useState([""]);


    //Handles adding of new ingredient input forms
    const handleAddIngredient = () => {
        setIngredientList([...ingredientList, ""]);
    }
    //Handles removing of ingredient input forms
    const handleRemoveIngredient = (index) => {
        const ingredList = [...ingredientList];
        ingredList.splice(index, 1);
        setIngredientList(ingredList);
    }

    //Handles adding of new ingredient input forms
    const handleAddInstructions = () => {
        setInstructionsList([...instructionsList, ""]);
    }
    //Handles removing of ingredient input forms
    const handleRemoveInstructions = (index) => {
        const instrucList = [...instructionsList];
        instrucList.splice(index, 1);
        setInstructionsList(instrucList);
    }
    
    return(
        <Container maxWidth="lg">
            <Box sx={{margin: 'auto', width: "100%", padding: 4}}>
                <Box sx={{
                    margin: 'auto',
                    width: '100%'
                }}>
                <Typography variant="h5" marginY={2}>New Recipe</Typography>
                <Divider sx={{marginBottom: 2}}/>
                <Box
                    component="form" 
                    noValidate
                    autoComplete="off"
                    sx={{
                    margin: 'auto',
                    width: '100%'
                }}>
                    <Typography variant="body" component="div">Please fill in the information down below.</Typography>
                    <Typography variant="h5" paddingY={2} component="div" sx={{fontWeight: 'bold'}}>Basic Information</Typography>
                    <Typography variant="subtitle" paddingY={2} component="div" sx={{fontWeight: 'bold'}} color="red">* - Required</Typography>
                    <TextField
                        required
                        id="recipe-title"
                        label="Recipe Title"
                        variant="filled"
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        required
                        id="recipe-description"
                        label="Recipe Description"
                        multiline
                        variant="filled"
                        fullWidth
                        margin="normal"
                        />
                    <TextField
                        required
                        id="recipe-servings"
                        label="Serving Size"
                        variant="filled"
                        fullWidth
                        type="number"
                        margin="normal"
                    />
                        <Typography variant="h5" paddingY={2} component="div" sx={{fontWeight: 'bold'}}>Ingredients</Typography>
                        <Typography variant="subtitle" paddingY={2} component="div" sx={{fontWeight: 'bold'}} color="red">* - Required</Typography>
                    {ingredientList.map((ingredientForm, index) =>(
                        <React.Fragment>
                            <Stack alignItems='center' direction={{xs: "column", md: "row"}} spacing={2} sx={{display: {md: 'flex'}}}>
                                <TextField
                                required
                                name={`ingredient${index}`}
                                id={`recipe-ingredient${index}`}
                                label={`Ingredient No.${index+1}`}
                                variant="filled"
                                margin="normal"
                                sx={{
                                    width: {xs: "100%", md: "80%"},
                                }}
                                />
                                <Box justifyContent="space-around" display="flex" width="35%">
                                    {/* Shows the add ingredient button when ingredient list is at least 1*/}
                                    { ingredientList.length - 1 === index &&
                                    <Button variant="outlined" onClick={handleAddIngredient}>
                                        Add
                                    </Button>}
                                        {/* Shows the remove ingredient button when ingredient list length is not equal to 1*/}
                                    { ingredientList.length !== 1 &&
                                    <Button variant="outlined" color="error" onClick={() => handleRemoveIngredient(index)}>
                                        Delete
                                    </Button>}
                                </Box>
                            </Stack>
                        </React.Fragment>
                    ))}
                    <Typography variant="h5" paddingY={2} component="div" sx={{fontWeight: 'bold'}}>Instructions</Typography>
                    <Typography variant="subtitle" paddingY={2} component="div" sx={{fontWeight: 'bold'}} color="red">* - Required</Typography>
                    {instructionsList.map((instructionForm, index) =>(
                        <React.Fragment>
                            <Stack alignItems='center' direction={{xs: "column", md: "row"}} spacing={2} sx={{display: {md: 'flex'}}}>
                                <TextField
                                required
                                name={`ingredient${index}`}
                                id={`recipe-instruction${index}`}
                                label={`Instruction No.${index+1}`}
                                variant="filled"
                                margin="normal"
                                sx={{
                                    width: {xs: "100%", md: "80%"},
                                }}
                                />
                                <Box justifyContent="space-around" display="flex" width="35%">
                                    {/* Shows the add ingredient button when ingredient list is at least 1*/}
                                    { instructionsList.length - 1 === index &&
                                    <Button variant="outlined" onClick={handleAddInstructions}>
                                        Add
                                    </Button>}
                                        {/* Shows the remove ingredient button when ingredient list length is not equal to 1*/}
                                    { instructionsList.length !== 1 &&
                                    <Button variant="outlined" color="error" onClick={() => handleRemoveInstructions(index)}>
                                        Delete
                                    </Button>}
                                </Box>
                            </Stack>
                        </React.Fragment>
                    ))}
                    {JSON.stringify(ingredientList)}
                    {JSON.stringify(instructionsList)}
                    <Box paddingY={2}>
                        <Button size="large" variant="contained">
                            Submit Recipe
                        </Button>
                    </Box>
                    </Box>
                </Box>
            </Box>
        </Container>
    )

}


export default NewRecipe