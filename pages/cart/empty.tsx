import NextLink from 'next/link';


import { RemoveShoppingCartOutlined } from '@mui/icons-material';
import { Typography, Box, Link } from '@mui/material';

import { ShopLayout } from '../../components/layouts/ShopLayout';


const EmptyPage = () => {
    return (
        <ShopLayout title="Carrito vacío" pageDescription='No hay artículos en el carrito'>
            <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                height='calc(100vh - 200px)'
                sx={{ flexdirection: {xs: 'column', sm: 'row' }}}
            >
                <RemoveShoppingCartOutlined sx = {{fontSize: 100}}/>
                <Box display='flex' flexDirection='column' alignItems='center' >
                    <Typography marginLeft={2}>Su carrito está vacio</Typography>
                    <NextLink href="/" passHref>
                        <Link typography='h4' color='secondary'>
                            Volver al inicio
                        </Link>
                    </NextLink>
                </Box>

            </Box>
        </ShopLayout>
    )
}

export default EmptyPage