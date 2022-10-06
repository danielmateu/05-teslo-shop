import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from "@mui/material"
import { CartList, OrderSummary } from "../../components/cart"
import { ShopLayout } from "../../components/layouts"
import NextLink from 'next/link';


const CartPage = () => {



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
                            <Typography variant="h2">Order</Typography>
                            <Divider sx={{ my: 1, mb: 2 }} />

                            {/* ORDER SUMARY */}
                            <OrderSummary />
                            <Box sx={{ mt: 3 }}>
                                <NextLink href='/checkout/address'>
                                    <Link>

                                        <Button color="secondary"  fullWidth>Checkout</Button>
                                    </Link>
                                </NextLink>

                            </Box>

                        </CardContent>
                    </Card>
                </Grid>

            </Grid>

        </ShopLayout>
    )
}

export default CartPage