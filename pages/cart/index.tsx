import { Box, Button, Card, CardContent, Divider, Grid, Typography } from "@mui/material"
import { CartList } from "../../components/cart"
import { ShopLayout } from "../../components/layouts"


const CartPage = () => {
    return (
        <ShopLayout title={"Tu carrito 3"} pageDescription={"Aquí puedes revisar tu carrito"}>
            <Typography variant="h1" component='h1'>Carrito</Typography>

            <Grid container>
                <Grid item xs={12} sm = {7}>
                    {/* CartList trabajado con la localstorage y/o cookies*/}
                    <CartList/>

                </Grid>
                <Grid item xs={12} sm = {5}>
                    <Card className="summary-card">
                        <CardContent>
                            <Typography variant="h2">Order</Typography>
                            <Divider sx = {{my: 1}}/>

                            {/* ORDER SUMARY */}
                            
                            <Box sx = {{mt:3}}>
                                <Button color="secondary" className="circular-btn" fullWidth>Checkout</Button>

                            </Box>

                        </CardContent>
                    </Card>
                </Grid>

            </Grid>

        </ShopLayout>
    )
}

export default CartPage