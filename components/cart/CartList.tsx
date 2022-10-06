import { Grid, Typography, Link, CardActionArea, CardMedia, Box, Button } from '@mui/material';
import { initialData } from '../../database/products';
import NextLink from 'next/link';
import { ItemCounter } from '../ui';
import { FC, useContext } from 'react';
import { CartContext } from '../../context/cart/CartContext';


// const productsInCart = [
//     initialData.products[0],
//     initialData.products[1],
//     initialData.products[2],
// ]

interface Props {
    editable?: boolean;
}



export const CartList: FC<Props> = ({ editable = false }) => {

    const { cart } = useContext(CartContext);

    return (
        <>
            {
                cart.map(product => (
                    // <Typography key={product.slug}>{product.title}</Typography>
                    <Grid
                        key={product.slug + product.size}
                        container
                        spacing={2}
                        sx={{ mb: 2 }}
                    >
                        <Grid item xs={3}>
                            {/* TODO: Llevar a la pagina del producto */}
                            <NextLink href= {`/product/${product.slug}`} passHref>
                                <Link>
                                    <CardActionArea>
                                        <CardMedia
                                            image={`/products/${product.image}`}
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
                                <Typography variant='body1'>Talla: <strong>{product.size}</strong></Typography>

                                {/* DEBE SER CONDICIONAL*/}

                                {
                                    editable
                                        ?
                                        (
                                            <ItemCounter
                                                currentValue={product.quantity}
                                                maxValue={10}
                                                updateQuantity={() => { }} />
                                        )
                                        :
                                        (

                                            <Typography variant='h5'>{product.quantity} {product.quantity === 1 ? 'producto' : 'productos'}</Typography>
                                        )

                                }
                            </Box>
                        </Grid>

                        <Grid
                            item xs={2}
                            display='flex'
                            flexDirection='column'
                            alignItems='center'
                        >
                            <Typography>{<strong>€{product.price}</strong>}</Typography>

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
