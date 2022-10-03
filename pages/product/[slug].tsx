

import { GetServerSideProps, NextPage } from 'next';

import { Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
// import { useRouter } from 'next/router';
import { ShopLayout } from '../../components/layouts'
import { ProductSlideshow, SizeSelector } from '../../components/products';
import { ItemCounter } from '../../components/ui/ItemCounter';
import { IProduct } from '../../interfaces';
import { dbProducts } from '../../database';
// import { initialData } from '../../database/products'
// import { useProducts } from '../../hooks';
// import { IProduct } from '../../interfaces/products';
// import { NextServer } from 'next/dist/server/next';

// const product = initialData.products[0];

interface Props {
  product: IProduct;
  slug: string;
}

const ProductPage:NextPage<Props> = ({product}) => {

  // const router = useRouter();
  // const {products: product, isLoading} = useProducts(`/products/${router.query.slug}`);



  return (
    <ShopLayout title={`${product.title}`} pageDescription={`${product.description}`}>
      <Grid container spacing={3}>

        <Grid item xs={12} sm={7}>
          {/* SlideShow */}
          <ProductSlideshow images={product.images} />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Box display='flex' flexDirection='column'>

            {/* Titulos */}
            <Typography variant='h1' component='h1'>{product.title}</Typography>
            <Typography variant='subtitle1' component='h2'>{`€${product.price}`}</Typography>

            {/* Cantidad */}
            <Box sx={{ my: 2 }}>
              <Typography variant='subtitle2' component='h3'>Cantidad</Typography>
              {/* ITEM COUNTER */}
              <ItemCounter />

              {/* SELECTOR DE TALLAS */}
              <SizeSelector
                // selectedSize={product.sizes[1]} 
                sizes={product.sizes} />
            </Box>

            {/* Agregar al carrito */}

            <Button color='secondary'>Agregar al carrito</Button>

            {/* <Chip label='Sin disponibilidad' color='error' variant='outlined'/> */}


            {/* Description */}
            <Box sx={{ mt: 2 }}>
              <Typography variant='subtitle2'>Descripción</Typography>
              <Typography variant='body2'>{product.description}</Typography>
            </Box>
          </Box>
        </Grid>

      </Grid>
    </ShopLayout>
  )
}



// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({params}) => {
  
  const {slug = ''} = params as {slug: string}
  const product = await dbProducts.getProductBySlug(slug);
  
  if(!product){
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }


  return {
    props: {
      product
    }
  }
}

export default ProductPage