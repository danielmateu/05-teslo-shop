import { GetServerSideProps, NextPage } from 'next'
import NextLink from 'next/link';

import { Box, Card, CardContent, Chip, Divider, Grid, Link, Typography } from "@mui/material";
import { CreditScoreOutlined } from "@mui/icons-material";

import { CartList, OrderSummary } from "../../components/cart"
import { ShopLayout } from "../../components/layouts"
import { getSession } from 'next-auth/react';
import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces';

interface Props { 
    order: IOrder;
}

const OrderPage: NextPage<Props> = ({order}) => {

    console.log({order});

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

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({req,query}) => {
    
    const { id = ''} = query;

    const session: any = await getSession({req});

    if(!session){
        return {
            redirect: {
                destination: `/auth/login?p=/orders/${id}`,
                permanent: false,
            }
        };
    }

    const order = await dbOrders.getOrderById(id.toString());

    if(!order){
        return {
            redirect: {
                destination: `/orders/history`,
                permanent: false,
            }
        }
    }

    if(order.user!== session.user._id){
        return {
            redirect: {
                destination: `/orders/history`,
                permanent: false,
            }
        }
    }

    return {
        props: {
            order
        }
    }
}

export default OrderPage