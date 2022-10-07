import NextLink from 'next/link';
import { useForm } from 'react-hook-form';

import { Button, Grid, Link, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { AuthLayout } from '../../components/layouts'
import { validations } from '../../utils';

type FormData = {
  email: string,
  password: string,
};


const LoginPage = () => {

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  console.log({ errors });


  const onLoginUser = (data: FormData) => {
    console.log(data);
  }

  return (
    <AuthLayout title={"Ingresar"}>
      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
        <Box sx={{ width: 350, padding: '12em 1em' }} >

          <Grid container spacing={2}  >
            <Grid item>
              <Typography variant='h1' component='h1'>Iniciar Sesión</Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                type={'email'}
                label='Correo'
                variant='filled'
                fullWidth
                {
                ...register('email', {
                  required: 'Este campo es obligatorio',
                  validate: (val) => validations.isEmail(val)
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
                {...register('password',{
                  required: 'Este campo es requerido',
                  minLength: {value: 6, message: 'Mínimo 6 caracteres'}
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type='submit'
                color='secondary'
                className='circular-btn'
                size='large'
                fullWidth
              >
                Ingresar
              </Button>
            </Grid>

            <Grid item xs={12} display='flex' justifyContent='end'>
              <NextLink href='/auth/register' passHref>
                <Link underline="always">
                  ¿Aun no estás registrad@?
                </Link>
              </NextLink>
            </Grid>



          </Grid>
        </Box>
      </form>


    </AuthLayout>
  )
}

export default LoginPage