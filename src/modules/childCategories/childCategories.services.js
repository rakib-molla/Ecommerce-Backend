import ChildCategory from "./childCategories.model.js";

const createChildCategories = async(data) => {
    const result = await ChildCategory.create(data); 
    return result;
}

const getAllChildCategories = async() => {
    const result = await ChildCategory.find({})
    .populate({
        path: 'categoryId',
        select: 'name'
    }).populate({
        path: 'subCategoryId',
        select: 'name'
    }).lean();
    return result;
}

export const childCategoriesServices = {
    createChildCategories,
    getAllChildCategories
};