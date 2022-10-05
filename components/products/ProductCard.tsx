import { FC, useMemo, useState } from "react"
import NextLink from 'next/link';

import { Grid, Card, CardActionArea, CardMedia, Typography, Link, Chip } from "@mui/material"
import { Box } from "@mui/system";

import { IProduct } from "../../interfaces"




interface Props {
    product: IProduct;
    
}

export const ProductCard: FC<Props> = ({ product }) => {

    /* A React Hook that is used to manage state in functional components. */
    const [isHovered, setIsHovered] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false);


    /* A React Hook that is used to memoize the value of the productImage variable. */
    const productImage = useMemo(() => {
        return isHovered
            ? `/products/${product.images[1]}`
            : `/products/${product.images[0]}`
    }, [isHovered, product.images])



    return (
        <Grid item
            xs={6}
            sm={4}
            lg={3}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Card>

                <NextLink href={`/product/${product.slug}`} passHref prefetch={false}>
                    <Link>
                        <CardActionArea>
                            {
                                (product.inStock) === 0 && (
                                    <Chip
                                        color="primary"
                                        label="Sin stock"
                                        sx={{ position: 'absolute', zIndex: 99, top: '10px', left: '10px' }}
                                    />
                                )

                            }

                            <CardMedia
                                component='img'
                                className="fadeIn"
                                image={productImage}
                                alt={product.title}
                                onLoad={() => setIsImageLoaded(true)}
                            />
                        </CardActionArea>
                    </Link>
                </NextLink>

                <Box sx={{ p: 2, display: isImageLoaded ? 'block' : 'none' }} className='fadeIn'>
                    <Typography fontWeight={700}>{product.description}</Typography>
                    <Typography fontWeight={600}>{`€${product.price}`}</Typography>
                    {/* <Typography fontWeight={600}>Cantidad: {product.inStock}</Typography> */}
                </Box>
            </Card>


        </Grid>
    )
}
