import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: [true, "Please provide your company Name"],
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    gstin: {
        type: String,
        required: [true, "Please provide your GSTIN"],
        unique: true,
    },
    contact: {
        type: Number,
        required: [true, "Please provide your contact number"],
    },
    address: {
        type: String,
        required: [true, "Please provide your address"],
    },
    city: {
        type: String,
        required: [true, "Please provide your city"],
    },
    state: {
        type: String,
        required: [true, "Please provide your state"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date, 
})

const User = mongoose.models.users || mongoose.model('users', userSchema);

export default User;