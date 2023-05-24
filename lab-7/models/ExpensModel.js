import mongoose from "mongoose";

const ExpensSchema = new mongoose.Schema( {
    category: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
})

export default mongoose.model('Expens', ExpensSchema)