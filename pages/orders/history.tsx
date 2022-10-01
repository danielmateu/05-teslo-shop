import { Button, Chip, Grid, Link, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

import { ShopLayout } from '../../components/layouts'
import NextLink from 'next/link';



const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'fullname', headerName: 'Nombre Completo', width: 200 },

    {
        field: 'paid',
        headerName: 'Pagada',
        description: 'Muestra información si está pagada o no',
        width: 200,
        renderCell: (params) => {
            return (
                params.row.paid
                    ? <Chip color="success" label="Pagada" variant='outlined' />
                    : <Chip color="error" label="Falta pagar" variant='outlined' />
            )
        }
    },
    {
        field: 'Pedido',
        headerName: 'Mostrar Pedido',
        width: 150,
        sortable: false,
        renderCell: (params) => {
            return (
                <NextLink href={`/orders/${params.row.id}`} passHref>
                    <Link >
                        <Button variant="outlined" color="primary">
                            Mostrar pedido
                        </Button>
                    </Link>
                </NextLink>
            )
        }
    },


];

const rows = [
    { id: 1, paid: true, fullname: 'Daniel Mateu' },
    { id: 2, paid: true, fullname: 'Silvia Cazorla' },
    { id: 3, paid: false, fullname: 'Nuk Mateu' },
    { id: 4, paid: true, fullname: 'Jose Cazorla' },
    { id: 5, paid: true, fullname: 'Gloria Pardo' },
    { id: 6, paid: false, fullname: 'Teresa Martinez' },
    { id: 7, paid: true, fullname: 'Francisca Fernandez' },

]

const HistoryPage = () => {
    return (
        <ShopLayout title="Historial de pedidos" pageDescription='Historial de pedidos del cliente'>
            <Typography variant="h1" component='h1'>Historial de compras</Typography>

            <Grid container>
                <Grid item xs={12} sx={{ height: '650', width: '100vw' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        autoHeight
                    />


                </Grid>
            </Grid>

        </ShopLayout>
    )
}

export default HistoryPage