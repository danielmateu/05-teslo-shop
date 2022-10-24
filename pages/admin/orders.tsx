import { ConfirmationNumberOutlined } from '@mui/icons-material'
import { AdminLayout } from '../../components/layouts'

const OrdersPage = () => {
  return (
    <AdminLayout 
        title={'Pedidos'} 
        subTitle={'Mantenimiento de los pedidos'}
        icon={<ConfirmationNumberOutlined />}
    >
    </AdminLayout>
  )
}

export default OrdersPage