import Product from '../models/Product.js';

// Product
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            success: true,
            results: products.length,
            data: { products }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An internal error occurred. Please try again later."
        });
    }
};

export const getProductWithId = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: `Product with id: ${id} not found. Please try again with valid id.`
            });
        }
        res.status(200).json({
            success: true,
            data: { product }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An internal error occurred. Please try again later."
        });
    }
};

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, inventoryCount, categoryId } = req.body;

        if (!name || !description || !price || !inventoryCount || !categoryId) {
            return res.status(400).json({ message: "Please provide all required fields!" });
        }

        const category = await Category.findById(categoryId);

        if (!category) {
            return res.status(400).json({ message: "Please provide valid category for the product" });
        }
        const slug = name.toLowerCase().replace(/\s+/g, '-');


        const newProduct = await Product.create({ name, description, price, inventoryCount, slug, categoryId });

        res.status(201).json({
            success: true,
            data: { product: newProduct }
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "A Product with this name already exists."
            });
        }

        res.status(500).json({ success: false, message: "Internal server error" });
    }
}


export const updateProduct = async (req, res) => {
    const { id } = req.params;

    const { name, description, price, inventoryCount, categoryId, slug } = req.body;


    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: `Product with id: ${id} not found.`
            });
        }

        const updatedName = name || product.name;
        const updatedDescription = description || product.description;
        const updatedPrice = price || product.price;
        const updatedInventoryCount = inventoryCount || product.inventoryCount;
        const UpdatedCategoryId = categoryId || product.categoryId;

        const rawSlug = slug || name || product.slug;
        const finalSlug = rawSlug.toLowerCase().replace(/\s+/g, '-');

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            {
                $set: {
                    name: updatedName,
                    description: updatedDescription,
                    price: updatedPrice,
                    inventoryCount: updatedInventoryCount,
                    categoryId: UpdatedCategoryId,
                    slug: finalSlug
                }
            },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            data: { product: updatedProduct }
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "A category with this name or slug already exists."
            });
        }
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                message: `Product with id: ${id} not found.`
            });
        }

        res.status(200).json({
            success: true,
            message: `Product "${deletedProduct.name}" has been deleted successfully.`,
            data: { id: deletedProduct._id }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
