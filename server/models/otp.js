import mongoose from "mongoose";

const otpSchema=mongoose.Schema({
    userId:{
        type:String
    },
    otp:{
        type:String
    },
    attempts:{
        type:Number,
        default:3
    }
})

const OTP=mongoose.model("OTP",otpSchema);
export default OTP