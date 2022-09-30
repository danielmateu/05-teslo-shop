import { Grid, Typography, Link, CardActionArea, CardMedia, Box, Button } from '@mui/material';
import { initialData } from '../../database/products';
import NextLink from 'next/link';
import { ItemCounter } from '../ui';





const productsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
]

export const CartList = () => {


    return (
        <>
            {
                productsInCart.map(product => (
                    // <Typography key={product.slug}>{product.title}</Typography>
                    <Grid key={product.slug}
                        container
                        spacing={2}
                        sx={{ mb: 2 }}
                    >
                        <Grid item xs={3}>
                            {/* TODO: Llevar a la pagina del producto */}
                            <NextLink href='/product/slug' passHref>
                                <Link>
                                    <CardActionArea>
                                        <CardMedia
                                            image={`products/${product.images[0]}`}
                                            component='img'
                                            sx={{ borderRadius: '5px' }}
                                        />
                                    </CardActionArea>
                                </Link>
                            </NextLink>
                        </Grid>

                        <Grid item xs={7}>
                            <Box display='flex' flexDirection='column'>
                                <Typography variant='body1'>{product.title}</Typography>
                                <Typography variant='body1'>Talla: <strong>M</strong></Typography>

                                {/* DEBE SER CONDICIONAL*/}
                                <ItemCounter />
                            </Box>
                        </Grid>

                        <Grid
                            item xs={2}
                            display='flex'
                            flexDirection='column'
                            alignItems='center'
                        >
                            <Typography>{`$${product.price}`}</Typography>

                            {/* EDITABLE */}
                            <Button variant='text' color='secondary'>
                                Eliminar
                            </Button>

                        </Grid>
                    </Grid>
                ))
            }

        </>
    )
}
