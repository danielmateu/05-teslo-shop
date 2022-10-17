import { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { GetServerSideProps } from 'next'
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { getSession, signIn, getProviders } from 'next-auth/react';



import { Button, Chip, Divider, Grid, Link, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { AuthLayout } from '../../components/layouts'
import { validations } from '../../utils';
// import { tesloApi } from '../../api';
import { ErrorOutline } from '@mui/icons-material';
// import { AuthContext } from '../../context';


type FormData = {
  email: string,
  password: string,
};


const LoginPage = () => {

  const router = useRouter()

  // const { loginUser } = useContext(AuthContext);

  const [providers, setProviders] = useState<any>({});

  useEffect(() => {
    getProviders().then(providers =>{
      console.log({providers})
      setProviders(providers);
    })
  }, [])
  

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [showError, setShowError] = useState(false)


  const onLoginUser = async ({ email, password }: FormData) => {

    setShowError(false);

    // const isValidLogin = await loginUser(email, password);

    // if (!isValidLogin) {
    //   setShowError(true);

    //   setTimeout(() => {
    //     setShowError(false);

    //   }, 3000)
    //   return;
    // }

    // //TODO: Navegar a la pantalla en la que el usuario estaba
    // const destination = router.query.p?.toString() || '/'
    // router.replace(destination);

    await signIn('credentials',{email, password});

  }

  return (
    <AuthLayout title={"Ingresar"}>
      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
        <Box sx={{ width: 350, padding: '8em 1em' }} >

          <Grid container spacing={2}  >
            <Grid item>
              <Typography variant='h1' component='h1'>Iniciar Sesión</Typography>
              <Chip
                label='No se reconoce el correo / contraseña'
                color='error'
                icon={<ErrorOutline />}
                className='fadeIn'
                sx={{ display: showError ? 'flex' : 'none' }}
              />
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
              <NextLink
                href={router.query.p ? `/auth/register?p=${router.query.p}` : '/auth/register'} passHref>
                <Link underline="always">
                  ¿Aun no estás registrad@?
                </Link>
              </NextLink>
            </Grid>

            <Grid item xs={12} display='flex' flexDirection="column" justifyContent='end'>
              <Divider sx = {{width: '100%', mb: 2}}/>
              {
                Object.values(providers).map((provider: any)=> {

                  if(provider.id === 'credentials') return (<div key='credentialss'></div>)

                  return(
                    <Button key={provider.name}
                    
                    color='secondary'
                    className='circular-btn'
                    size='large'
                    fullWidth
                    sx = {{mb: 1}}
                    onClick={() => signIn(provider.id)}
                    >
                      {provider.name}
                    </Button>
                  )
                })
              }
            </Grid>



          </Grid>
        </Box>
      </form>


    </AuthLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({req, query}) => {
  
  /* Checking if the user is logged in. */
  const session = await getSession({req})

  /* Destructuring the query object and setting a default value of `/` to the `p` property. */
  const {p = '/'} = query

  /* Checking if the user is logged in. If the user is logged in, it will redirect the user to the page
  they were on before they were redirected to the login page. */
  if(session){
    return {
      redirect: {
        destination: p.toString(),
        permanent: false,
      }
    }
  }
  return {
    props: { }
  }
}

export default LoginPage