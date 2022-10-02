import { NextPage } from 'next'

import { Typography } from '@mui/material'

import { ShopLayout } from '../../components/layouts'
import { useProducts } from '../../hooks'
import { ProductList } from '../../components/products'
import { FullScreenLoading } from '../../components/ui'
// import products from '../api/products'


const WomenPage: NextPage = () => {

    const { products, isLoading } = useProducts('/products?gender=women');

    return (

        <ShopLayout title={'Mundocamper - Mujer'} pageDescription={'Productos para ella'}>
            <Typography variant="h1" component='h1' >Niñ@s</Typography>
            <Typography variant="h2" sx={{ mb: 1 }} >Todo para ella</Typography>

            {
                isLoading ? <FullScreenLoading /> : <ProductList products={products} />
            }

        </ShopLayout>
    )
}

export default WomenPage