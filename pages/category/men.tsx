import { NextPage } from 'next'

import { Typography } from '@mui/material'

import { ShopLayout } from '../../components/layouts'
import { useProducts } from '../../hooks'
import { ProductList } from '../../components/products'
import { FullScreenLoading } from '../../components/ui'
import products from '../api/products'


const MenPage: NextPage = () => {

    const { products, isLoading } = useProducts('/products?gender=men');

    return (

        <ShopLayout title={'Solidcamper - Hombre'} pageDescription={'Productos para el hombre'}>
            <Typography variant="h1" component='h1' >Hombre</Typography>
            <Typography variant="h2" sx={{ mb: 1 }} >Todo para él</Typography>

            {
                isLoading ? <FullScreenLoading /> : <ProductList products={products} />
            }

        </ShopLayout>
    )
}

export default MenPage