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

const EditRecipe = (props) => {
    const router = useRouter();
    const dish = props.props.dish;

    //Constants handling ingredients and instructions list
    const [ingredientList, setIngredientList] = useState(dish.ingredients);
    const [instructionsList, setInstructionsList] = useState(dish.instructions);
    const [userData, setUserData] = useState({isLoggedin: false, name: '', isAdmin: false});

    //Imports user data from sessionStorage, transfers it to userData state to be used in determining admin/user access and editing of the recipe.
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

    //Handles adding of new instruction input forms
    const handleAddInstructions = () => {
        setInstructionsList([...instructionsList, ""]);
    };
    //Handles removing of instruction input forms
    const handleRemoveInstructions = (index) => {
        const instrucList = [...instructionsList];
        instrucList.splice(index, 1);
        setInstructionsList(instrucList);
    };
    //Handles changing of instruction input forms
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
        //From userData
        const recipeAuthor = dish.author;
        //TextField ID = recipeDescription
        const recipeDesc = e.target[1].value;
        //TextField ID = recipeServings
        const recipeServings = e.target[3].value;
        const dateCreated = dish.date_created;
        //Date generated from current date of recipe creation
        const dateUpdated = new Date().toISOString();
         //TextField ID = ingredients${id} (dynamic)
        const ingredList = [...ingredientList];
        //TextField ID = instructions${id} (dynamic)
        const instrucList = [...instructionsList];
        //Compiling of above constants as one recipe object
        const recipe = {
            title: recipeTitle,
            author: recipeAuthor,
            description: recipeDesc,
            servings: recipeServings,
            date_created: dateCreated,
            date_updated: dateUpdated,
            ingredients: ingredList,
            instructions: instrucList
        }
        //Updating recipe through axios PUT to json-server mock API (address at localhost:4000/id)
        axios.put(`http://localhost:4000/dishes/${dish.id}`, recipe)
            .then((response) =>{
                console.log(response);
                 //Goes back to recipe list, with success notification message
                router.push({
                    pathname: '/recipes',
                    query: {openNotif: true, message: 'Recipe updated.'}
                }, "/recipes")
            })
            .catch((error) =>{
                console.log(error);
                 //Goes back to recipe list, with error notification message
                router.push({
                    pathname: '/recipes',
                    query: {openNotif: true, message: 'Recipe update failed.'}
                }, "/recipes")
            })
    }

    return(
        <Container maxWidth="lg">
            <Box sx={{margin: 'auto', width: "100%", padding: 4}}>
                {/* Checks for admin access before loading form, returns Permission Denied if false */}
                {(userData.isAdmin === "true" || userData.name === dish.author) ? (
                <Box sx={{
                    margin: 'auto',
                    width: '100%'
                }}>
                <Typography variant="h5" marginY={2}>Edit/Update Recipe</Typography>
                <Divider sx={{marginBottom: 2}}/>
                {/*Edit Recipe Form*/}
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
                        defaultValue={dish.title}
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
                        defaultValue={dish.description}
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
                        defaultValue={dish.servings}
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
                                defaultValue={ingredientForm}
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
                                defaultValue={instructionForm}
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
                            Update Recipe
                        </Button>
                    </Box>
                    </Box>
                </Box> ) : (
                    <Typography>Sorry! You don't have the proper permissions to access this page.</Typography>
                ) }
            </Box>
        </Container>
    )

}

EditRecipe.getInitialProps = async ({ query: {id}}) => {
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

export default EditRecipe