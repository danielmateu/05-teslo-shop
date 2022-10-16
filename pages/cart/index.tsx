import { useContext, useEffect } from "react";
import { useRouter } from "next/router";

import { Box, Button, Card, CardContent, Divider, Grid, Typography } from "@mui/material"
import { CartList, OrderSummary } from "../../components/cart"
import { ShopLayout } from "../../components/layouts"

import { CartContext } from "../../context";


const CartPage = () => {

    const { isLoaded, cart } = useContext(CartContext);
    const router = useRouter()

    /* Redirecting to the empty cart page if the cart is empty. */
    useEffect(() => {
        if (isLoaded && cart.length === 0) {
            router.replace('/cart/empty');
        }
    }, [isLoaded, cart, router]);

    /* Checking if the cart is empty or not. If it is empty, it will redirect to the empty cart page. */
    if (!isLoaded || cart.length === 0) {
        return (<></>)
    }


    return (
        <ShopLayout title={`Tu carrito`} pageDescription={"Aquí puedes revisar tu carrito"}>
            <Typography variant="h1" component='h1'>Carrito</Typography>

            <Grid container sx={{ justifyContent: 'center', }}>
                <Grid item xs={12} md={7} >
                    {/* CartList trabajado con la localstorage y/o cookies*/}
                    <CartList editable />

                </Grid>
                <Grid item xs={12} md={5} >
                    <Card className="summary-card">
                        <CardContent>
                            <Typography variant="h2">Pedido</Typography>
                            <Divider sx={{ my: 1, mb: 2 }} />

                            {/* ORDER SUMARY */}
                            <OrderSummary />
                            <Box sx={{ mt: 3 }}>
                                <Button
                                    color="secondary"
                                    fullWidth
                                    href="/checkout/address"
                                >
                                    Checkout
                                </Button>
                            </Box>

                        </CardContent>
                    </Card>
                </Grid>

            </Grid>

        </ShopLayout>
    )
}

export default CartPage