import mongoose from 'mongoose';

const items = {
    id: {
        type: Number,
        required: [false],
    },
    name: {
        type: String,
        required: [false],
    },
    description: {
        type: String,
        required: [false],
    },
    quantity: {
        type: Number,
        required: [false],
    },
    price: {
        type: Number,
        required: [false],
    }
}

const invoiceSchema = {
    invoiceNumber: {
        type: Number,
        required: [false],
    },
    issueDate: {
        type: String,
        required: [false],
    },
    dueDate: {
        type: String,
        required: [false],
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
    subTotal: {
        type: Number,
        required: [false],
    },
    taxRate: {
        type: Number,
        required: [false],
    },
    taxAmount: {
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
    discountAmount: {
        type: Number,
        required: [false],
    },
    status: {
        type: String,
        required: [false],
        default: "Unpaid",
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
