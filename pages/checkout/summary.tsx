import { useContext, useMemo, useState } from "react";
import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from "@mui/material"
import { CartList, OrderSummary } from "../../components/cart"
import { ShopLayout } from "../../components/layouts"
import NextLink from 'next/link';
import { CartContext } from "../../context";
import { countries } from "../../utils";



const SummaryPage = () => {

    const {shippingAddress, numberOfItems} = useContext(CartContext);
    

    if(!shippingAddress){
        return <></>;
    }

    const {firstName, lastName, address, address2='', city, country, zip, phone} = shippingAddress;
    


    return (
        <ShopLayout title={"Resumen del pedido"} pageDescription={"Resumen del pedido"}>
            <Typography variant="h1" component='h1'>Resumen del pedido</Typography>

            <Grid container sx={{ justifyContent: 'center', }}>
                <Grid item xs={12} md={7} sx={{mt:2}} >
                    {/* CartList trabajado con la localstorage y/o cookies*/}
                    <CartList  />

                </Grid>
                <Grid item xs={12} md={5} >
                    <Card className="summary-card">
                        <CardContent>
                            <Typography variant="h2">Resumen ({numberOfItems} {numberOfItems ===1 ? 'producto' : 'productos'})</Typography>
                            <Divider sx={{ my: 1, mb: 2 }} />

                            <Box display='flex' justifyContent='end'>
                                <NextLink href="/checkout/address" >
                                    <Link underline="always">
                                        Editar
                                    </Link>
                                </NextLink>
                            </Box>

                            <Typography variant="subtitle1">Dirección de entrega</Typography>        
                            <Typography>{firstName} {lastName}</Typography>        
                            <Typography>{address}{address2 ? `, ${address2}` : ''}</Typography>        
                            <Typography>{city}, {zip}</Typography>        
                            <Typography>{countries.find(c => c.code === country)?.name}</Typography>        
                            <Typography>{phone}</Typography>    
                            <Divider sx={{ my: 1, mb:2 }} />    

                            <Box display='flex' justifyContent='end'>
                                <NextLink href="/cart" >
                                    <Link underline="always">
                                        Editar
                                    </Link>
                                </NextLink>
                            </Box>

                            {/* ORDER SUMARY */}
                            <OrderSummary />

                            <Box sx={{ mt: 3 }}>
                                <Button color="secondary" fullWidth>Checkout</Button>

                            </Box>

                        </CardContent>
                    </Card>
                </Grid>

            </Grid>

        </ShopLayout>
    )
}

export default SummaryPage