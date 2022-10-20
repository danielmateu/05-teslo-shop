import { NextPage } from 'next'

import { Typography } from '@mui/material'

import { ShopLayout } from '../../components/layouts'
import { useProducts } from '../../hooks'
import { ProductList } from '../../components/products'
import { FullScreenLoading } from '../../components/ui'
import products from '../api/products'


const KidPage: NextPage = () => {

  const { products, isLoading } = useProducts('/products?gender=kid');

  return (

    <ShopLayout title={'Solidcamper - Niños'} pageDescription={'Productos para nuestros peques'}>
      <Typography variant="h1" component='h1' >Niñ@s</Typography>
      <Typography variant="h2" sx={{ mb: 1 }} >Todo para l@s peques</Typography>

      {
        isLoading ? <FullScreenLoading /> : <ProductList products={products} />
      }

    </ShopLayout>
  )
}

export default KidPage