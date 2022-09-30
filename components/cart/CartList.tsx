import { Grid, Typography, Link, CardActionArea, CardMedia, Box, Button } from '@mui/material';
import { initialData } from '../../database/products';
import NextLink from 'next/link';
import { ItemCounter } from '../ui';
import { FC } from 'react';


const productsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
]

interface Props {
    editable?: boolean;
}

export const CartList: FC<Props> = ({editable = false}) => {

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
                                            image={`/products/${product.images[0]}`}
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

                                {
                                    editable 
                                    ? <ItemCounter/> 
                                    : <Typography variant='h5'>3 items</Typography>
                                }
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

                            {
                                editable && (
                                <Button variant='text' color='secondary'>
                                Eliminar
                                </Button>) 
                            
                            }

                        </Grid>
                    </Grid>
                ))
            }

        </>
    )
}
