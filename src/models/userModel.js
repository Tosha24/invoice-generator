import mongoose from 'mongoose';

const items = {
    itemNo: {
        type: Number,
        required: [false],
    },
    itemName: {
        type: String,
        required: [false],
    },
    itemDescription: {
        type: String,
        required: [false],
    },
    itemQuantity: {
        type: Number,
        required: [false],
    },
    itemRate: {
        type: Number,
        required: [false],
    },
    itemTotal: {
        type: Number,
        required: [false],
    },
}

const invoiceSchema = {
    invoiceNumber: {
        type: Number,
        required: [false],
    },
    issueDate: {
        type: Date,
        required: [false],
        format: "DD-MM-YYYY",
    },
    dueDate: {
        type: Date,
        required: [false],
        format: "DD-MM-YYYY",
    },
    customerName: {
        type: String,
        required: [false],
    },
    customerEmail: {
        type: String,
        required: [false],
    },
    customerGstin: {
        type: String,
        required: [false],
        length: 15,
    },
    customerAddress: {
        type: String,
        required: [false],
    },
    customerCity: {
        type: String,
        required: [false],
    },
    customerState: {
        type: String,
        required: [false],
    },
    customerContact: {
        type: Number,
        required: [false],
    },
    items: [items],
    currency: {
        type: String,
        required: [false],
        default: "₹",
    },
    taxRate: {
        type: Number,
        required: [false],
    },
    totalAmount: {
        type: Number,
        required: [false],
    },
    discountRate: {
        type: Number,
        required: [false],
    },
    status: {
        type: String,
        required: [false],
        default: "Pending",
    },
}

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
    invoices: [invoiceSchema],
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date, 
})

const User = mongoose.models.users || mongoose.model('users', userSchema);

export default User;
