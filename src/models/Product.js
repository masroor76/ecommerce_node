import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: [true, 'Price is required field'],
        min: [0, 'Price cannot be less than zero'],
        default: 0
    },
    inventoryCount: {
        type: Number,
        required: [true, 'Inventory count is required'],
        min: [0, 'Inventory cannot be less than zero'],
        default: 0
    },
    slug: {
        type: String,
        lowercase: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'A product must belong to a category']
    }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
