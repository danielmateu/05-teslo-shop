import { CreditCardOffOutlined, DashboardOutlined } from '@mui/icons-material'
import { Card, CardContent, Grid, Typography } from '@mui/material'
import React from 'react'
import { AdminLayout } from '../../components/layouts'

export const DashboardPage = () => {
    return (
        <AdminLayout
            title='Dashboard'
            subTitle='Estadisticas generales'
            icon={<DashboardOutlined />}
        >
            <Grid container spacing={2}>
                
                <Grid item xs={12} sm={4} md={3}>
                    <Card sx={{display: 'flex'}}>
                    <CardContent sx={{ width: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CreditCardOffOutlined color='secondary' sx={{ fontSize: 40 }} />
                    </CardContent>
                    <CardContent sx={{ display: 'flex', flex: '1 0 auto', flexDirection:'column'}}>
                        <Typography variant='h3'>50</Typography>
                        <Typography variant='caption'>Ordenes totales</Typography>
                    </CardContent>
                    </Card>
                </Grid>

            </Grid>
        </AdminLayout>
    )
}

export default DashboardPage;
