import type { NextPage } from 'next'
// import { useSession } from 'next-auth/react';

import { Typography } from '@mui/material'

import { ShopLayout } from '../components/layouts'
// import { initialData } from '../database/products';
import { ProductList } from '../components/products';
import { useProducts } from '../hooks';
import { FullScreenLoading } from '../components/ui';




const HomePage: NextPage = () => {

  
  
  const {products, isLoading} = useProducts('/products');

  return (
    <ShopLayout title={'SolidCamper - Home'} pageDescription={'Encuentra los mejores productos del mundo camper aquí'}>
      <Typography variant="h1" component='h1' >Tienda</Typography>
      <Typography variant="h2" sx={{ mb: 1 }} >Todos los productos</Typography>

       {/* <FullScreenLoading/>  */}
      {
        isLoading ? <FullScreenLoading/> : <ProductList products={products} />
      }

      
    </ShopLayout>
  )
}

export default HomePage
