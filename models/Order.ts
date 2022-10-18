import mongoose, {Schema,model, Model} from "mongoose";
import { IOrder } from '../interfaces';





const orderSchema = new Schema({ 

    name        : {type:String, required:true},
    email       : {type:String, required:true, unique:true},
    password    : {type:String, required:true},
    role        : {
        type: String,
        enum: {
            values      : ['admin' , 'client'],
            message     : '{VALUE} no es un role válido',
            default     : 'client',
            required    : true,
        }
    }
}, {
    timestamps  : true,
})

const Order: Model<IOrder> = mongoose.models.Order || model('Order', orderSchema);

export default Order;