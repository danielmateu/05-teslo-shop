import type { NextPage } from 'next'
import { Card, CardActionArea, CardMedia, Grid, Typography } from '@mui/material'

import { ShopLayout } from '../../components/layouts'
// import { initialData } from '../../database/products';
import { ProductList } from '../../components/products';
import { useProducts } from '../../hooks';
import { FullScreenLoading } from '../../components/ui';


const SearchPage: NextPage = () => {

    const { products, isLoading } = useProducts('/search/');

    return (
        <ShopLayout title={'Mundocamper - Buscador'} pageDescription={'Encuentra los mejores productos de Teslo aquí'}>
            <Typography variant="h1" component='h1' >Buscar producto</Typography>
            <Typography variant="h2" sx={{ mb: 1 }} >ABC --- 123</Typography>

            {/* <FullScreenLoading/>  */}
            {
                isLoading ? <FullScreenLoading /> : <ProductList products={products} />
            }


        </ShopLayout>
    )
}

export default SearchPage
