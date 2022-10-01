import { Box, Button, Card, CardContent, Chip, Divider, Grid, Link, Typography } from "@mui/material"
import { CartList, OrderSummary } from "../../components/cart"
import { ShopLayout } from "../../components/layouts"
import NextLink from 'next/link';
import { CreditCardOffOutlined, CreditScoreOutlined } from "@mui/icons-material";


const OrderPage = () => {
    return (
        <ShopLayout title={"Resumen del pedido 123456"} pageDescription={"Resumen del pedido"}>
            <Typography variant="h1" component='h1'>Pedido: 123456</Typography>

            {/* <Chip
                sx={{my : 2}}
                label = 'Pendiente de pago'
                variant="outlined"
                color="error"
                icon={<CreditCardOffOutlined/>}
            /> */}

            <Chip
                sx={{ my: 2 }}
                label='Pago realizado'
                variant="outlined"
                color="success"
                icon={<CreditScoreOutlined />}
            />

            <Grid container sx={{ justifyContent: 'center', }}>
                <Grid item xs={12} md={7} >
                    {/* CartList trabajado con la localstorage y/o cookies*/}
                    <CartList />

                </Grid>
                <Grid item xs={12} md={5} >
                    <Card className="summary-card">
                        <CardContent>
                            <Typography variant="h2">Resumen (9 productos)</Typography>
                            <Divider sx={{ my: 1, mb: 2 }} />

                            <Box display='flex' justifyContent='end'>
                                <NextLink href="/checkout/address" >
                                    <Link underline="always">
                                        Editar
                                    </Link>
                                </NextLink>
                            </Box>

                            <Typography variant="subtitle1">Dirección de entrega</Typography>
                            <Typography>Daniel Mateu</Typography>
                            <Typography>C/Gomis 49</Typography>
                            <Typography>Barcelona 08023</Typography>
                            <Typography>Spain</Typography>
                            <Typography>+34 617039997</Typography>
                            <Divider sx={{ my: 1, mb: 2 }} />

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
                                {/* TODO */}
                                <h1>Pagar</h1>

                            <Chip
                                sx={{ my: 2 }}
                                label='Pago realizado'
                                variant="outlined"
                                color="success"
                                icon={<CreditScoreOutlined />}
                            />
                            </Box>


                        </CardContent>
                    </Card>
                </Grid>

            </Grid>

        </ShopLayout>
    )
}

export default OrderPage