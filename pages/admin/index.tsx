import { DashboardOutlined } from '@mui/icons-material'
import React from 'react'
import { AdminLayout } from '../../components/layouts'

export const DashboardPage = () => {
    return (
        <AdminLayout
            title='Dashboard'
            subtitle='Estadisticas generales'
            icon={<DashboardOutlined />}
        >

        </AdminLayout>
    )
}

export default DashboardPage;
