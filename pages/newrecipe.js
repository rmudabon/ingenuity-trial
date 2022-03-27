import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

//Material UI components
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from "@mui/material/Divider";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import axios from 'axios';

const NewRecipe = () => {
    const router = useRouter();
    
    //Constants handling ingredients and instructions list
    const [ingredientList, setIngredientList] = useState([""]);
    const [instructionsList, setInstructionsList] = useState([""]);
    const [userData, setUserData] = useState({isLoggedin: false, name: '', isAdmin: false});

    
    //Imports user data from sessionStorage, transfers it to userData state to be used in writing the author of the recipe
    useEffect(() => {
    const userDat = JSON.parse(sessionStorage.getItem("user"));
        if(userDat){
            setUserData(userDat);
        }
    }, [])

     //Handles change of input form values
    const handleIngredientChange = (e, index) =>{
        const { value }  = e.target;
        const ingredList = [...ingredientList];
        ingredList[index] = value;
        setIngredientList(ingredList);
    };

    //Handles adding of new ingredient input forms
    const handleAddIngredient = () => {
        setIngredientList([...ingredientList, ""]);
    };
    //Handles removing of ingredient input forms
    const handleRemoveIngredient = (index) => {
        const ingredList = [...ingredientList];
        ingredList.splice(index, 1);
        setIngredientList(ingredList);
    };

    //Handles adding of new ingredient input forms
    const handleAddInstructions = () => {
        setInstructionsList([...instructionsList, ""]);
    };
    //Handles removing of ingredient input forms
    const handleRemoveInstructions = (index) => {
        const instrucList = [...instructionsList];
        instrucList.splice(index, 1);
        setInstructionsList(instrucList);
    };

     //Handles changing of instruction form values
    const handleInstructionsChange = (e, index) =>{
        const { value }  = e.target;
        const instrucList = [...instructionsList];
        instrucList[index] = value;
        setInstructionsList(instrucList);
    };

    //Handles compiling of information from input forms and submits the whole form as an object through axios POST
    const handleSumbitRecipe = (e) => {
        //Prevents refreshing of page when form is submitted
        e.preventDefault();
        //TextField ID = recipeTitle
        const recipeTitle = e.target[0].value;
        //TextField ID = recipeDescription
        const recipeDesc = e.target[1].value;
        //TextField ID = recipeServings
        const recipeServings = e.target[3].value;
        //Dates generated from current date of recipe creation
        const dateCreated = new Date().toISOString();
        const dateUpdated = new Date().toISOString();
        //TextField ID = ingredients${id} (dynamic)
        const ingredList = [...ingredientList];
        //TextField ID = instructions${id} (dynamic)
        const instrucList = [...instructionsList];
        //Compiling of above constants as one recipe object
        const recipe = {
            title: recipeTitle,
            author: userData.name,
            description: recipeDesc,
            servings: recipeServings,
            date_created: dateCreated,
            date_updated: dateUpdated,
            ingredients: ingredList,
            instructions: instrucList
        }
        //Adding recipe through axios POST to json-server mock API (address at localhost:4000)
        axios.post('http://localhost:4000/dishes', recipe)
            .then((response) =>{
                console.log(response);
                //Goes back to recipe list, with success notification message
                router.push({
                    pathname: '/recipes',
                    query: {openNotif: true, message: 'Recipe added.'}
                }, "/recipes")
            })
            .catch((error) =>{
                console.log(error);
                 //Goes back to recipe list, with error notification message
                router.push({
                    pathname: '/recipes',
                    query: {openNotif: true, message: 'Recipe added failed.'}
                }, "/recipes")
            })
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
                {/*New Recipe Form*/}
                <Box
                    component="form" 
                    onSubmit={handleSumbitRecipe}
                    autoComplete="off"
                    sx={{
                    margin: 'auto',
                    width: '100%'
                }}>
                    <Typography variant="body" component="div">Please fill in the information down below.</Typography>
                    <Typography variant="h5" paddingY={2} component="div" sx={{fontWeight: 'bold'}}>Basic Information</Typography>
                    <Typography variant="subtitle" paddingY={2} component="div" sx={{fontWeight: 'bold'}} color="red">* - Required</Typography>
                    {/*Recipe Title*/}
                    <TextField
                        required
                        id="recipeTitle"
                        label="Recipe Title"
                        name="recipeTitle"
                        variant="filled"
                        fullWidth
                        margin="normal"
                    />
                    {/*Recipe Description*/}
                    <TextField
                        required
                        id="recipeDescription"
                        label="Recipe Description"
                        name="recipeDescription"
                        multiline
                        variant="filled"
                        fullWidth
                        margin="normal"
                        />
                    {/*Recipe Serving Size*/}
                    <TextField
                        required
                        id="recipeServings"
                        label="Serving Size"
                        name="recipeServings"
                        variant="filled"
                        fullWidth
                        type="number"
                        margin="normal"
                    />
                        <Typography variant="h5" paddingY={2} component="div" sx={{fontWeight: 'bold'}}>Ingredients</Typography>
                        <Typography variant="subtitle" paddingY={2} component="div" sx={{fontWeight: 'bold'}} color="red">* - Required</Typography>
                    {/*Ingredients List, can add more along the way*/}
                    {ingredientList.map((ingredientForm, index) =>(
                        <React.Fragment>
                            <Stack alignItems='center' key={`ingred${index}`} direction={{xs: "column", md: "row"}} spacing={2} sx={{display: {md: 'flex'}}}>
                                <TextField
                                required
                                name={`ingredient${index}`}
                                id={`recipeIngredient${index}`}
                                label={`Ingredient No.${index+1}`}
                                onChange={(e) => handleIngredientChange(e, index)}
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
                    {/*Instructions List, can add more along the way*/}
                    {instructionsList.map((instructionForm, index) =>(
                        <React.Fragment>
                            <Stack alignItems='center' key={`instruct${index}`} direction={{xs: "column", md: "row"}} spacing={2} sx={{display: {md: 'flex'}}}>
                                <TextField
                                required
                                name={`instruction${index}`}
                                id={`recipeInstruction${index}`}
                                label={`Instruction No.${index+1}`}
                                onChange={(e) => handleInstructionsChange(e, index)}
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
                    <Box paddingY={2}>
                         {/*Submits the form to be handled by handleSubmitRecipe*/}
                        <Button size="large" variant="contained" type="submit">
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