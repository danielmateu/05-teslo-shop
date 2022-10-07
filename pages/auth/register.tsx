
import NextLink from 'next/link';

import { AuthLayout } from '../../components/layouts'

import { Button, Grid, Link, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'

type FormData = {
    name:       string;
    email:      string;
    password:   string;
}


const RegisterPage = () => {
    return (
        <AuthLayout title="Página de registro">
            <Box sx={{ width: 350, padding: '12em 1em' }} >

                <Grid container spacing={2}  >
                    <Grid item>
                        <Typography variant='h1' component='h1'>Crea tu cuenta</Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField label='Nombre completo' variant='filled' fullWidth />
                    </Grid>
                    
                    <Grid item xs={12}>
                        <TextField label='Correo' variant='filled' fullWidth />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField label='Contraseña' type='password' variant='filled' fullWidth />
                    </Grid>

                    {/* <Grid item xs={12}>
                        <TextField label='Repita contraseña' type='password' variant='filled' fullWidth />
                    </Grid> */}

                    <Grid item xs={12}>
                        <Button color='secondary' className='circular-btn' size='large' fullWidth>Ingresar
                        </Button>
                    </Grid>

                    <Grid item xs={12} display='flex' justifyContent='end'>
                        <NextLink href='/auth/login' passHref>
                            <Link underline="always">
                                ¿Ya estás registrad@?
                            </Link>
                        </NextLink>
                    </Grid>



                </Grid>
            </Box>


        </AuthLayout>
    )
}

export default RegisterPage