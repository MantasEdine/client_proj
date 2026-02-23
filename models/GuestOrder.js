import mongoose from "mongoose";

const guestOrderSchema = new mongoose.Schema({
    items : [{
        product : {type : String , required : true , ref : 'product'},
        quantity : {type : Number , required : true}
    }],
    amount : {type : Number , required : true},
    address : {
        fullName : {type : String , required : true},
        phoneNumber : {type : String , required : true},
        pincode : {type : String},
        area : {type : String , required : true},
        city : {type : String , required : true},
        state : {type : String , required : true}
    },
    status : {type : String , required : true , default : 'Ordre placé'},
    date : {type : Number , required : true}
})

const GuestOrder = mongoose.models.guestorder || mongoose.model('guestorder',guestOrderSchema)
export default GuestOrder