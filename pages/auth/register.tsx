import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import NextLink from 'next/link';

import { AuthLayout } from '../../components/layouts'
import { AuthContext } from '../../context';

import { Button, Chip, Grid, Link, TextField, Typography } from '@mui/material'
import { ErrorOutline } from '@mui/icons-material';
import { Box } from '@mui/system'

import { tesloApi } from '../../api';
import { validations } from '../../utils';

type FormData = {
    name: string;
    email: string;
    password: string;
}


const RegisterPage = () => {

    const router = useRouter();
    const {registerUser} = useContext(AuthContext)


    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onRegisterForm = async ({ name, email, password }: FormData) => {
        console.log(name, email, password)
        setShowError(false);
        const {hasError, message} = await registerUser(name, email, password);

        if(hasError){
            setShowError(true);
            setErrorMessage(message!);
            setTimeout(() => setShowError(false),3000);
            return;
        }

        try {

            const { data } = await tesloApi.post('user/register', { name, email, password });
            const { token, user } = data;
            console.log({ token, user })

        } catch (error) {
            console.log(error);
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, 3000)
        }

        //TODO: Navegar a la pagina que el usuario estaba
        const destination = router.query.p?.toString() || '/'
        router.replace(destination);
    }

    return (
        <AuthLayout title="Página de registro">

            <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
                <Box sx={{ width: 350, padding: '12em 1em' }} >

                    <Grid container spacing={2}  >
                        <Grid item>
                            <Typography variant='h1' component='h1'>Crea tu cuenta</Typography>
                            <Chip
                                label='Debes completar los campos correctamente'
                                color='error'
                                icon={<ErrorOutline />}
                                className='fadeIn'
                                sx={{ display: showError ? 'flex' : 'none' }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label='Nombre completo'
                                variant='filled'
                                fullWidth
                                {
                                ...register('name', {
                                    required: 'Este campo es obligatorio',
                                    minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                                })}
                                error={!!errors.name}
                                helperText={errors.name?.message}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                type='email'
                                label='Correo'
                                variant='filled'
                                fullWidth
                                {
                                ...register('email', {
                                    required: 'Este campo es obligatorio',
                                    validate: validations.isEmail
                                })}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label='Contraseña'
                                type='password'
                                variant='filled'
                                fullWidth
                                {...register('password', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                                })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                color='secondary'
                                className='circular-btn'
                                size='large'
                                fullWidth


                            >Ingresar
                            </Button>
                        </Grid>

                        <Grid item xs={12} display='flex' justifyContent='end'>
                            <NextLink 
                            href={router.query.p ? `/auth/login?p=${router.query.p}` : '/auth/login'}
                            passHref>
                                <Link underline="always">
                                    ¿Ya estás registrad@?
                                </Link>
                            </NextLink>
                        </Grid>



                    </Grid>
                </Box>
            </form>



        </AuthLayout>
    )
}

export default RegisterPage