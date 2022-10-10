import { GetServerSideProps } from 'next'
import NextLink from 'next/link';

import { Box, Button, FormControl, Grid, InputLabel, Link, MenuItem, Select, TextField, Typography } from "@mui/material"

import { jwt } from "../../utils";
import { ShopLayout } from "../../components/layouts"


const AddressPage = () => {
  return (
    <ShopLayout title={"Formulario de dirección"} pageDescription={"Confirmar dirección de destino"}>
      <Typography variant="h1" component='h1' padding = {'1em 1em'}>Dirección</Typography>
      <Grid container spacing={2} >
        <Grid item xs={12} sm={6}>
          <TextField label='Nombre' variant='filled' fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='Apellido' variant='filled' fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='Dirección' variant='filled' fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='Dirección 2 (opcional)' variant='filled' fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='Código postal' variant='filled' fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='Ciudad' variant='filled' fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>País</InputLabel>
            <Select
              variant='filled'
              label='País' required
              value={1}
            >
              <MenuItem value={1}>España</MenuItem>
              <MenuItem value={2}>Francia</MenuItem>
              <MenuItem value={3}>Alemania</MenuItem>
              <MenuItem value={4}>Inglaterra</MenuItem>
              <MenuItem value={5}>Italia</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='Teléfono' variant='filled' fullWidth />
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }} display='flex' justifyContent='center'>
        <NextLink href="/checkout/summary">
          <Link>
            <Button color='secondary'>Revisar pedido</Button>
          </Link>
        </NextLink>
      </Box>
    </ShopLayout>

  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

// export const getServerSideProps: GetServerSideProps = async ({req}) => {

//     const {token = ''} = req.cookies;
//     // let userId = '';
//     let isValidToken = false;

//     try {
//       await jwt.isValidToken( token );
//       isValidToken = true;
//     } catch (error) {
//       isValidToken = false;
//     }

//     if(!isValidToken){
//       return{
//         redirect: {
//           destination: '/auth/login?p=/checkout/address',
//           permanent: false,
//         }
//       }
//     }

//   return {
//     props: {
      
//     }
//   }
// }

export default AddressPage