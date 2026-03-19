import Category from '../models/Category.js';

// Category
export const getAllCategory = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({
            success: true,
            results: categories.length,
            data: { categories }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An internal error occurred. Please try again later."
        });
    }
};

export const getCategoryWithId = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findById(id);
        console.log(`${id}: ${category}`)
        if (!category) {
            return res.status(404).json({
                success: false,
                message: `Category with id: ${id} not found. Please try again with valid id.`
            });
        }
        res.status(200).json({
            success: true,
            data: { category }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An internal error occurred. Please try again later."
        });
    }
};

export const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name) {
            return res.status(400).json({ message: "Please provide name fields!" });
        }
        const slug = name.toLowerCase().replace(/\s+/g, '-');

        const newCategory = await Category.create({ name, description, slug });

        res.status(201).json({
            success: true,
            data: { category: newCategory }
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "A category with this name already exists."
            });
        }

        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name, description, slug } = req.body;

    try {
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: `Category with id: ${id} not found.`
            });
        }

        const updatedName = name || category.name;
        const updatedDescription = description || category.description;

        const rawSlug = slug || name || category.slug;
        const finalSlug = rawSlug.toLowerCase().replace(/\s+/g, '-');

        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            {
                $set: {
                    name: updatedName,
                    description: updatedDescription,
                    slug: finalSlug
                }
            },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            data: { category: updatedCategory }
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


export const deleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCategory = await Category.findByIdAndDelete(id);

        if (!deletedCategory) {
            return res.status(404).json({
                success: false,
                message: `Category with id: ${id} not found.`
            });
        }

        res.status(200).json({
            success: true,
            message: `Category "${deletedCategory.name}" has been deleted successfully.`,
            data: { id: deletedCategory._id }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
