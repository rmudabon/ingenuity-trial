import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// Material UI packages
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

export default function Home() {
  //State regarding user information
  const [user, setUser] = useState({isLoggedin: "false", name: "", isAdmin: "false"})

  const router = useRouter();

  //Event handlers for entering the website as user or admin
  const handleUserLogin = () => {
    setUser({isLoggedin: 'true', name: 'User', isAdmin: 'false'});
    console.log('Signed in as user!');
    router.push("/dashboard");
  }

  const handleAdminLogin = () => {
    setUser({isLoggedin: 'true', name: 'Admin', isAdmin: 'true'});
    console.log('Signed in as admin!');
    router.push("/dashboard");
  }

   //Imports user data from sessionStorage, transfers it to userData state to be used in conditional rendering
  useEffect(() =>{
    const userObject = JSON.stringify(user);
    sessionStorage.setItem('user', userObject);
  }, [user])

  return (
      <Container maxWidth="lg">
        <Box sx={{margin: "auto", width: "100%", padding: 4}}>
          <Box sx={{ display: "flex", flexDirection: "column", margin: "auto", width: "100%", height: "100%"}} justifyContent="center" alignItems="center">
            <Typography variant="h3" paddingY={4} textAlign="center" component="div">Recipe DB Trial Project</Typography>
            <ButtonGroup orientation="vertical">
               {/*User and Admin Login Buttons*/}
              <Button variant="outlined" color="primary" onClick={handleUserLogin}>Sign in as user</Button>
              <Button variant="outlined" color="primary" onClick={handleAdminLogin}>Sign in as admin</Button>
            </ButtonGroup>
          </Box>
        </Box>
      </Container>
  )
}
