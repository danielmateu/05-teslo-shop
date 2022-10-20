import NextLink from 'next/link';
import { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react';

import { Box, Card, CardContent, Chip, Divider, Grid, Link, Typography } from "@mui/material";
import { CreditCardOffOutlined, CreditScoreOutlined } from "@mui/icons-material";

import { CartList, OrderSummary } from "../../components/cart"
import { ShopLayout } from "../../components/layouts"
import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces';

interface Props {
    order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {

    // console.log({ order });

    const { shippingAddress } = order;

    return (
        <ShopLayout title={"Resumen del pedido"} pageDescription={"Resumen del pedido"}>
            <Typography variant="h1" component='h1'>Pedido: {order._id}</Typography>

            {
                order.isPaid
                    ? (

                        <Chip
                            sx={{ my: 2 }}
                            label='Pago realizado'
                            variant="outlined"
                            color="success"
                            icon={<CreditScoreOutlined />}
                        />
                    )
                    :
                    (
                        <Chip
                            sx={{ my: 2 }}
                            label='Pendiente de pago'
                            variant="outlined"
                            color="error"
                            icon={<CreditCardOffOutlined />}
                        />
                    )
            }


            <Grid container className="fadeIn" sx={{ justifyContent: 'center', }}>
                <Grid item xs={12} md={7} >
                    {/* CartList trabajado con la localstorage y/o cookies*/}
                    <CartList products={order.orderItems} />

                </Grid>
                <Grid item xs={12} md={5} >
                    <Card className="summary-card">
                        <CardContent>
                            <Typography variant="h2">Resumen ({order.numberOfItems} {order.numberOfItems === 1 ? 'producto' : 'productos'})</Typography>
                            <Divider sx={{ my: 1, mb: 2 }} />

                            {/* <Box display='flex' justifyContent='end'>
                                <NextLink href="/checkout/address" >
                                    <Link underline="always">
                                        Editar
                                    </Link>
                                </NextLink>
                            </Box> */}

                            <Typography variant="subtitle1">Dirección de entrega</Typography>
                            <Typography>{shippingAddress.firstName} {shippingAddress.lastName}</Typography>
                            <Typography>{shippingAddress.address} {shippingAddress.address2 ? `, ${shippingAddress.address2}` : ''}</Typography>
                            <Typography>{shippingAddress.city} {shippingAddress.zip}</Typography>
                            <Typography>{shippingAddress.country}</Typography>
                            <Typography>{shippingAddress.phone}</Typography>

                            <Divider sx={{ my: 1, mb: 2 }} />

                            {/* ORDER SUMARY */}
                            <OrderSummary
                                orderValues={
                                    {
                                        numberOfItems: order.numberOfItems,
                                        subTotal     : order.subTotal,
                                        tax          : order.tax,
                                        total        : order.total
                                    }
                                }
                            />

                            <Box sx={{ mt: 3 }} display="flex" flex-direction="column">
                                {/* TODO */}
                                {/*  */}

                                {
                                    order.isPaid
                                        ? (

                                            <Chip
                                                sx={{ my: 2 }}
                                                label='Pago realizado'
                                                variant="outlined"
                                                color="success"
                                                icon={<CreditScoreOutlined />}
                                            />
                                        )
                                        :
                                        (
                                            <h1>Realizar Pago</h1>
                                        )
                                }
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


export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

    const { id = '' } = query;

    const session: any = await getSession({ req });

    if (!session) {
        return {
            redirect: {
                destination: `/auth/login?p=/orders/${id}`,
                permanent: false,
            }
        };
    }

    const order = await dbOrders.getOrderById(id.toString());

    if (!order) {
        return {
            redirect: {
                destination: `/orders/history`,
                permanent: false,
            }
        }
    }

    if (order.user !== session.user._id) {
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