import { AuthLayout } from '../../components/layouts'

import { Button, Grid, Link, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import NextLink from 'next/link';


const LoginPage = () => {
  return (
    <AuthLayout title="Ingresar">
      <Box sx={{ width: 350, padding: '15em 1em' }} >

        <Grid container spacing={2}  >
          <Grid item>
            <Typography variant='h1' component='h1'>Iniciar Sesión</Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField label='Correo' variant='filled' fullWidth/>
          </Grid>

          <Grid item xs={12}>
            <TextField label='Contraseña' type='password' variant='filled' fullWidth/>
          </Grid>

          <Grid item xs={12}>
            <Button color='secondary' className='circular-btn' size='large' fullWidth>Ingresar
            </Button>
          </Grid>

          <Grid item xs={12} display = 'flex' justifyContent='end'>
            <NextLink href='/auth/register' passHref>
              <Link underline="always">
              ¿Aun no estás registrad@?
              </Link>
            </NextLink>
          </Grid>

          

        </Grid>
      </Box>


    </AuthLayout>
  )
}

export default LoginPage